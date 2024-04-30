"""
Funktionen Starry-Eyes Backend.
"""
from datetime import datetime, timedelta
import subprocess
import ephem

# import für Email
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64
from email import encoders

# import für Meteo-API
import openmeteo_requests
import requests_cache
import pandas as pd
import numpy as np
from retry_requests import retry
from weather_codes import weather_codes_de, weather_codes_en

# img2base64---------------------------------------------------------------------------

def img2base64(img:str):
    """
    Konvertiert ein Bild in ein base64-string um das Bild per html im Mail zu verschicken.

    img = string, Pfad vom Bild.
    """
    with open(img, 'rb') as image_file:
        image_data = image_file.read()
    return base64.b64encode(image_data).decode('utf-8')

# HTML-Struktur-------------------------------------------------------------------------

def html_struct(logo_64, logo_cid, E, N, lat, long, abdeckung_64, abdeckung_cid, cloud_html):
    """
    Erstellt HTML-Struktur mit Inputs.
    """
    html_text = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Email</title>
    </head>
    <body>
        <div>
            <img src='data:image/jpeg;base64,{logo_64}' alt='{logo_cid}'>
            <h2>Bestätigung Abo</h2>
        </div>
        <div>
            <table>
                <th>Position:</th>
                <tr>
                    <td><b>LV95:</b></td><td><b>WGS84:</b></td>
                </tr>
                <tr>
                    <td>E: {E}<br>N: {N}</td><td>lat: {lat}<br>long: {long}</td>
                </tr>
            </table>
        </div>
        <div>
            <hr>
            <h3>Abdeckung am Horizont</h3>
            <img src='data:image/jpeg;base64,{abdeckung_64}' alt='{abdeckung_cid}'>
        </div>
        <div>
            <h3>Aktuelle Wolkenprognose:</h3>
                {cloud_html}
        </div>

    </body>
    </html>
    """
    return html_text

# Emailer-------------------------------------------------------------------------------

# Verwendet HTML-Struktur
def send_email(sender, pw, server, port, recipient, subject, content):
    """
    Sendet Email mit HTML-Struktur.

    recipient = Emailadresse als string

    subject = Betreff als string

    content = HTML-Struktur
    """
    try:
        msg = MIMEMultipart()
        msg['From'] = sender
        msg['To'] = recipient
        msg['Subject'] = subject

        # HTML-Struktur hinzufügen
        msg.attach(MIMEText(content, 'html'))

        # Verbindung SMTP-Server
        with smtplib.SMTP(server, port) as session:
            session.starttls()
            session.login(sender, pw)
            session.sendmail(sender, recipient, msg.as_string())
        print("Email gesendet")
    except Exception as e:
        print("Email konnte nicht gesendet werden: ", e)

# Wetter stündlich--------------------------------------------------------------------------------------------

def openweather_hour(lat: float, long: float, days:int):
    """
    Stündliche Vorhersage von Wetterdaten für die nächsten 72h.

    Inhalt: 'date', 'weather_code', 'weather', 'cloud_cover', 'cloud_cover_low', 'cloud_cover_mid', 'cloud_cover_high', 'visibility'
    Ruft openweather-api ab.

    Args:
    lat: latitude (Breite), float [WGS84]\n
    long: longitude (Länge), float [WGS84]\n
    days = Anzahl Tage der Prognose, max 3

    Output:
    Pandas Dataframe mit dem Inhalt für 72h.
    """
    # Setup the Open-Meteo API client with cache and retry on error
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)

    # Make sure all required weather variables are listed here
    # The order of variables in hourly or daily is important to assign them correctly below
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
    	"latitude": lat,
    	"longitude": long,
    	#"current": ["cloud_cover"],
    	"hourly": ["weather_code", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high"],
    	# "daily": ["weather_code", "sunrise", "sunset"],
    	"timezone": "Europe/Berlin",
    	"forecast_days": days,
    	"models": "best_match"
    }
    responses = openmeteo.weather_api(url, params=params)

    # Process first location. Add a for-loop for multiple locations or weather models
    response = responses[0]

    # Process hourly data. The order of variables needs to be the same as requested.
    hourly = response.Hourly()
    hourly_weather_code = hourly.Variables(0).ValuesAsNumpy()
    hourly_cloud_cover = hourly.Variables(1).ValuesAsNumpy()
    hourly_cloud_cover_low = hourly.Variables(2).ValuesAsNumpy()
    hourly_cloud_cover_mid = hourly.Variables(3).ValuesAsNumpy()
    hourly_cloud_cover_high = hourly.Variables(4).ValuesAsNumpy()
    #hourly_visibility = hourly.Variables(5).ValuesAsNumpy()
    
    hourly_weather = np.vectorize(weather_codes_de.get)(hourly_weather_code)# Array erstellen das Wetter-codes mit den Codes der aktuellen Stunde matcht

    # hourly_data = {"date": pd.date_range(
    # 	start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
    # 	end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
    # 	freq = pd.Timedelta(seconds = hourly.Interval()),
    # 	inclusive = "left"
    # )}

    hourly_data = {"date": pd.date_range(
    	start = pd.to_datetime(hourly.Time(), unit = "s", utc = False),
    	end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = False),
    	freq = pd.Timedelta(seconds = hourly.Interval()),
    	inclusive = "left"
    )}

    # hourly_data["weather_code"] = hourly_weather_code
    hourly_data["weather"] = hourly_weather
    hourly_data["cloud_cover"] = hourly_cloud_cover
    hourly_data["cloud_cover_low"] = hourly_cloud_cover_low
    hourly_data["cloud_cover_mid"] = hourly_cloud_cover_mid
    hourly_data["cloud_cover_high"] = hourly_cloud_cover_high
    # hourly_data["visibility"] = hourly_visibility

    df = pd.DataFrame(data= hourly_data)
    df['date'] = pd.to_datetime(df['date'])
    current_time = datetime.now()
    df_current = df[df['date'] >= current_time] #DF Filtern nach aktueller Zeit
    nach_5 = datetime.combine(current_time.date() + timedelta(days=1), datetime.strptime('06:00', '%H:%M').time())
    filtered_df = df_current[df_current['date'] < nach_5] #Filter für nach 5 Uhr am Morgen
    
    new_column_names = {
        #'date': 'Datum / Zeit',
        'weather': 'Wetter',
        'cloud_cover': 'Wolkenbedeckung',
        'cloud_cover_low': 'Wolkenbedeckung tief',
        'cloud_cover_mid': 'Wolkenbedeckung mittel',
        'cloud_cover_high': 'Wolkenbedeckung hoch'
    }
    filtered_df = filtered_df.rename(columns=new_column_names)
    return pd.DataFrame(filtered_df)

# Sonnen-Berechnungen-----------------------------------------------------------------------------------------

class SunSetRise:
    """
    Berechnet Sonnenaufgang/untergang theoretisch und auf Gelände.

    Für Gelände:
    Verwendet 'tppss'-Library von gvellut.
    URL: https://github.com/gvellut/tppss

    Für Theoretisch:
    Verwendet 'Pyephem'-library von Brandon Rhodes:
    URL: https://github.com/brandon-rhodes/pyephem

    Args:

    position= WGS84-Koordinaten vom Standort, als String, Kommagetrennt. 'lat, long'

    dem= Pfad zum Geländemodell, als String. Modell als Geotiff WGS84 mit ellipsoidische Höhen.
    
    """
    def __init__(self, position:str, dem:str):
        self.position = position
        self.dem = dem
        self.today = datetime.now().date()
        self.observer = ephem.Observer()
        self.observer.lat = position.split(',')[0]
        self.observer.long = position.split(',')[1]

    def sunset_dem(self):
        date = str(self.today)
        command = ["tppss", "day", "-m", self.dem, "-j", date, "-p", self.position]
        res = subprocess.check_output(command, universal_newlines=True)
        return res.split('\n')[3].split(' ')[-1][:-9] # -9 für Wert ohne Sekunden, sonst -6
    
    def sunrise_dem(self):
        date = str(self.today + timedelta(days=1))
        command = ["tppss", "day", "-m", self.dem, "-j", date, "-p", self.position]
        res = subprocess.check_output(command, universal_newlines=True)
        return res.split('\n')[3].split(' ')[2][:-9] # -9 für Wert ohne Sekunden, sonst -6
    
    def sunset_globe(self):
        sunset = self.observer.next_setting(ephem.Sun(), start=self.today)
        sunset_str = str(ephem.localtime(sunset))
        return sunset_str.split(' ')[1][:-10] # -10 für Wert ohne Sekunden, sonst -7

    def sunrise_globe(self):
        sunrise = self.observer.next_rising(ephem.Sun(), start=self.today)
        sunrise_str = str(ephem.localtime(sunrise))
        return sunrise_str.split(' ')[1][:-10] # -10 für Wert ohne Sekunden, sonst -7