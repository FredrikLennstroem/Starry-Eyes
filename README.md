# FS24_GIS
Server Client Projekt für eine Geodateninfrastruktur Webportal im Rahmen des Moduls 4230

- **Frontend:** React.js, Leaflet und MUI
- **Backend:** FastAPI, GeoServer

GitHub Pages: https://fredriklennstroem.github.io/Starry-Eyes/

Getestet mit Node version 18.18.0, leaflet 1.9.4, python 3.9

## Requirements

- [Git](https://git-scm.com/)
- IDE wie [Visual Studio Code](https://code.visualstudio.com/) 
- [Anaconda Distribution](https://www.anaconda.com/products/distribution)
- Node.js und npm ([https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)) 

## Repository lokal klonen
Mit Git in einem Terminal das GitHub Repository *Starry-Eyes* in ein lokales Verzeichnis klonen.

``` shell
cd /path/to/workspace
# Clone Repository 
git clone https://github.com/FredrikLennstroem/Starry-Eyes.git
```

### Git Projekt mit Visual Studio Code lokal klonen
Öffne ein neues Visual Studio Code Fenster und wähle unter Start *Clone Git Repository*. Alternativ öffne die Command Palette in VS Code `CTRL+Shift+P` (*View / Command Palette*) und wähle `Git: clone`. 
Füge die Git web URL `https://github.com/FredrikLennstroem/Starry-Eyes.git` ein und bestätige die Eingabe mit Enter. Wähle einen Ordner in welchen das Repository *geklont* werden soll.

## Frontend installieren
Öffne ein Terminal (Command Prompt in VS Code) und wechsle in den *client* Ordner in diesem Projekt

``` shell
cd client
# aktiviere node.js (falls nvm genutzt wird) 
# nvm use 18.18.0
# install all the node.js dependencies
npm install
# node Projekt ausführen
# npm start ist in package.json definiert
npm start
```

## Backend installieren
### API und Email-service
1. Im Terminal zum *backend* Ordner wechseln und dort mit der `requirements.txt` Datei eine virtuelle Python-Umgebung aufsetzen:

```shell
# Requirements
cd backend
# Füge conda-forge den als Channel in conda hinzu, da sonst nicht alle Pakete installiert werden können.
conda config --add channels conda-forge
# Erstelle ein neues Conda Environment und füge die Python Packges requirements.txt hinzu, requirements.txt befindet sich im Ordner server/app
conda create --name starryeyes python=3.9 --file requirements.txt
```
2. Die App benötigt eine Email-Adresse um Bestätigungsemails versenden zu können.
Die Credentials (Adresse & Passwort) zu der E-MAil sind in einer lokalen config-Datei gespeichert. Aus Sicherheitsgründen ist nur eine Vorlage zu dieser Datei abgelegt. Die  Vorlage ist hier abgelegt: `backend/config_template`. 

- Für die Credentials der Starry-Eyes Email bitte [FredrikLennstroem](https://github.com/FredrikLennstroem) kontaktieren.

- Falls ein eigene Email verwendet werden soll, geht dies am einfachsten mit GMAIL. Die nachfolgenden Links helfen da weiter:
    Generelle Vorgehensweise: [Sending An Email USing Python](https://bc-robotics.com/tutorials/sending-email-using-python-raspberry-pi/)
    Detailliertere Vorgehensweise für IMAP-Konfiguration: [Configure for Google Workplace with Two Factor Authentication (2FA)](https://help.warmupinbox.com/en/articles/4934806-configure-for-google-workplace-with-two-factor-authentication-2fa)

    Anschliessend die Yaml-Datei mit dem eigenen GMAIL_USERNAME und GMAIL_PASSWORD ergänzen. Das GMAIL_PASSWORD ist das generierte "APP-Password" von GMAIL und *nicht* das Passwort für den Google-Account.

```yaml
SMTP_SERVER: smtp.gmail.com
SMTP_PORT: 587 # richtigen Port angeben
GMAIL_USERNAME: example@gmail.com
GMAIL_PASSWORD: exam plee xamp leex
```

3. Backend starten mit *uvicorn*

```shell
cd backend
# virtuelle Umgebung starten:
conda activate starryeyes
# Server starten für API mit uvicorn
uvicorn main:app --reload

### Geoserver