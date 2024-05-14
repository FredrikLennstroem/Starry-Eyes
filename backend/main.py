from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import yaml
import os
import starryeyes as se
from IPython.display import HTML
from datetime import datetime

from fastapi import Request
import json

#Config-File
config_file = 'config_backend.yaml'

#Email Variabeln---------------------------------------------------------------------------------------
emailSubject = "Standortüberwachung Starry-Eyes"
logo_path = 'img/email-banner.png'
abdeckung_path = 'img/abdeckung.jpg'
#------------------------------------------------------------------------------------------------------

#Variabel Geländemodell
DEM = 'img/59_DEM.tiff'

# Config-File laden
with open(config_file, 'r') as f:
    config = yaml.safe_load(f)

# API VAriabeln und Funktion----------------------------------------------------------------------------
app = FastAPI()

# Enable CORS -> ermöglicht es React und API auf verschiedenen server (ports) laufen zu lassen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", 'http://192.168.1.128:3000'],  # Update with the origin of your React app
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    data: str

# API für Bestätigungsemail---------------------------------------------------------------------
@app.post("/email")
async def email(request: Request):
    data = await request.body()
    print("Input erhalten:", data) # Debug-message

    data_str = data.decode("utf-8")
    data_json = json.loads(data_str)

    lat = float(data_json["latitude"])
    long = float(data_json["longitude"])
    e = float(data_json["easting"])
    n = float(data_json["northing"])
    email_recipient = data_json["email"]

    cloud = se.openweather_hour(lat, long, 2) # Meteo-API abfragen

    cloud_html = cloud.to_html() # wandelt Pandas-Tabelle in html-tabelle um

    # Umwandeln der Bilder in base64-string
    logo_64 = se.img2base64(logo_path)
    logo_cid = os.path.basename(logo_path)
    abdeckung_64 = se.img2base64(abdeckung_path)
    abdeckung_cid = os.path.basename(abdeckung_path)

    # HTML-Struktur erstellen
    html_text = se.html_struct(
        logo_64=logo_64,
        logo_cid=logo_cid,
        E=e,
        N=n,
        lat=lat,
        long=long,
        abdeckung_64=abdeckung_64,
        abdeckung_cid=abdeckung_cid,
        cloud_html=cloud_html
        )

    ort = str((lat,long))
    se.aboDB(email=email_recipient, ort=ort) #DB einfüllen mit ABO-Daten

    #EMAIL schicken
    se.send_email(sender=config['GMAIL_USERNAME'],
                        pw=config['GMAIL_PASSWORD'],
                        server=config['SMTP_SERVER'],
                        port=config['SMTP_PORT'],
                        recipient=email_recipient, 
                        subject=emailSubject, 
                        content=html_text)

    return {"message": "Input received and printed in terminal"}

# API für Sonnenunter/aufgang---------------------------------------------------------------------
@app.post("/sun")
async def sun(request: Request):
    try:
        # Daten von Request verarbeiten
        data = await request.body()
        data_str = data.decode("utf-8")
        data_json = json.loads(data_str)
        lat = data_json['latitude']
        long = data_json['longitude']
        position = f"{lat},{long}"
        print("Input erhalten: ", data_json)

        #Wetter-API abfragen
        df = se.openweather_hour(lat=lat,long=long,days=2)

        #Berechnung Sternenabdeckung durch Wolken
        star_cloud = str(round(100 - df['Wolkenbedeckung'].mean(), None))

        # Sonnenstand berechnen
        sunsetrise = se.SunSetRise(position=position, dem=DEM)
        sunset_globe = sunsetrise.sunset_globe()

        #Berechnung Sonnenuntergang Wolkenbedeckung
        zeit_dt = datetime.strptime(sunset_globe, '%H:%M').time() #Wandelt Strinng in Datetime um
        timestamp = datetime.combine(datetime.now().date(), zeit_dt) #Timestamp für Filter in dataframe
        rounded_timestamp = timestamp.replace(minute=0, second=0) #Rundet Timestamp zur letzten vollen Stunde
        filtered_df = df[df['date'] == rounded_timestamp] #Wetter-dataframe filtern

        if filtered_df.empty:
            sunset_cloud = "Berechnung nicht möglich."
        else:
            sunset_cloud = str(100 - round(filtered_df.iloc[0,2], None)) # von 100 subtrahieren für Kehrwert, sonst ist es Wolkenabdeckung

        sun_data = {
            "sunset_dem": sunsetrise.sunset_dem(),
            "sunrise_dem": sunsetrise.sunrise_dem(),
            "sunset_globe": sunset_globe,
            "sunrise_globe": sunsetrise.sunrise_globe(),
            "sunset_cloud": sunset_cloud,
            "star_cloud": star_cloud
        }
        return JSONResponse(content=sun_data)

    except Exception as e:
        print("Error im Daten prozessieren:", e)
        return JSONResponse(content={"message": "Error im Daten prozessieren"}, status_code=500)
    

@app.post("/email2") # API zum Debuggen
async def email2(request: Request):
    try:
        data = await request.body()

        data_str = data.decode("utf-8")
        print(data_str)

        payload = json.loads(data)
        email_address = payload.get("email")
    except Exception as e:
        print("Error processing email:", e)
        return {"message": "Error processing email"}, 500


