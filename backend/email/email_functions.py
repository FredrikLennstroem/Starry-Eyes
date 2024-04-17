"""
Funktionen Starry-Eyes-Backend.
Hauptsächlich Email & Meteo
"""
# import für Email
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
import base64
from email import encoders

# import füe Meteo-API
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

# Emailer-------------------------------------------------------------------------------

# Verwendet HTML-Struktur
class Emailer:
    def send_email(self, sender, pw, server, port, recipient, subject, content):
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

            # Create HTML content with images embedded
            html_content = content

            msg.attach(MIMEText(html_content, 'html'))

            # Connect to Gmail Server
            session = smtplib.SMTP(server, port)
            session.ehlo()
            session.starttls()
            session.ehlo()

            # Login to Gmail
            session.login(sender, pw)

            # Send Email & Exit
            session.sendmail(sender, recipient, msg.as_string())
            session.quit()
            print("Email sent")
        except Exception as e:
            print("Email could not be sent: ", e)

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
    	"hourly": ["weather_code", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "visibility"],
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
    hourly_visibility = hourly.Variables(5).ValuesAsNumpy()
    # Array erstellen das Wetter-codes mit den Codes der aktuellen Stunde matcht
    hourly_weather = np.vectorize(weather_codes_de.get)(hourly_weather_code)

    hourly_data = {"date": pd.date_range(
    	start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
    	end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
    	freq = pd.Timedelta(seconds = hourly.Interval()),
    	inclusive = "left"
    )}

    hourly_data["weather_code"] = hourly_weather_code
    hourly_data["weather"] = hourly_weather
    hourly_data["cloud_cover"] = hourly_cloud_cover
    hourly_data["cloud_cover_low"] = hourly_cloud_cover_low
    hourly_data["cloud_cover_mid"] = hourly_cloud_cover_mid
    hourly_data["cloud_cover_high"] = hourly_cloud_cover_high
    hourly_data["visibility"] = hourly_visibility

    return pd.DataFrame(data = hourly_data)