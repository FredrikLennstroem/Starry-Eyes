from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import yaml
import os
import email_functions as ef
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
    print("Received input:", data.data)

    cloud = ef.openweather_hour(lat, long, 1) # Meteo-API abfragen
    cloud_html = cloud.head(11).to_html() # wandelt Pandas-Tabelle in html-tabelle um

    logo_64 = ef.img2base64(logo_path)
    logo_cid = os.path.basename(logo_path)
    abdeckung_64 = ef.img2base64(abdeckung_path)
    abdeckung_cid = os.path.basename(abdeckung_path)

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

    ef.Emailer().send_email(sender=config['GMAIL_USERNAME'],
                        pw=config['GMAIL_PASSWORD'],
                        server=config['SMTP_SERVER'],
                        port=config['SMTP_PORT'],
                        recipient=data.data, 
                        subject=emailSubject, 
                        content=html_text)

    return {"message": "Input received and printed in terminal"}
