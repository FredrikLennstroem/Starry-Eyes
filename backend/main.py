from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import yaml
import os
import backend.starryeyes as se
from IPython.display import HTML


PROJ_ROOT = 'C:/_Schule/FHNW/6/GIS/Projekt/Test_api'

#Config-File
config_file = f'{PROJ_ROOT}/backend/config.yaml'

#Email Variabeln---------------------------------------------------------------------------------------
emailSubject = "Bin öppis am Probiere. -Fredi"
logo_path = f'{PROJ_ROOT}/backend/img/email-banner.png'
abdeckung_path = f'{PROJ_ROOT}/backend/img/abdeckung.jpg'
lat = 47.13881
long = 7.91573
E = 2636192
N = 1220979
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
async def email(data: InputData):
    print("Input erhalten:", data.data) # Debug-message

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
        E=E,
        N=N,
        lat=lat,
        long=long,
        abdeckung_64=abdeckung_64,
        abdeckung_cid=abdeckung_cid,
        cloud_html=cloud_html
        )

    # EMAIL schicken
    se.send_email(sender=config['GMAIL_USERNAME'],
                        pw=config['GMAIL_PASSWORD'],
                        server=config['SMTP_SERVER'],
                        port=config['SMTP_PORT'],
                        recipient=data.data, 
                        subject=emailSubject, 
                        content=html_text)

    return {"message": "Input received and printed in terminal"}

@app.post("/sun")
async def sun(data: InputData):
    print("Input erhalten:")
    pass
