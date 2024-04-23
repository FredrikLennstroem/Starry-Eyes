from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import yaml
import os
import starryeyes as se
from IPython.display import HTML

from fastapi import Request
import json


PROJ_ROOT = 'C:/_Schule/FHNW/6/GIS/Projekt/Test_api'

#Config-File
config_file = f'{PROJ_ROOT}/backend/config.yaml'

#Email Variabeln---------------------------------------------------------------------------------------
emailSubject = "Bin öppis am Probiere. -Fredi"
logo_path = f'{PROJ_ROOT}/backend/img/email-banner.png'
abdeckung_path = f'{PROJ_ROOT}/backend/img/abdeckung.jpg'
#------------------------------------------------------------------------------------------------------

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

    cloud = se.openweather_hour(lat, long, 1) # Meteo-API abfragen
    cloud_html = cloud.head(11).to_html() # wandelt Pandas-Tabelle in html-tabelle um

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

    #EMAIL schicken
    se.send_email(sender=config['GMAIL_USERNAME'],
                        pw=config['GMAIL_PASSWORD'],
                        server=config['SMTP_SERVER'],
                        port=config['SMTP_PORT'],
                        recipient=email_recipient, 
                        subject=emailSubject, 
                        content=html_text)

    return {"message": "Input received and printed in terminal"}

@app.post("/sun")
async def sun(data: InputData):
    print("Input erhalten:")
    pass

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


