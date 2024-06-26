# StarryEyes
Server Client Projekt für eine Geodateninfrastruktur Webportal im Rahmen des Moduls 4230.

- **Frontend:** React.js, Leaflet und MUI
- **Backend:** FastAPI, GeoServer

GitHub Pages: https://fredriklennstroem.github.io/Starry-Eyes/

Getestet mit Node Version 18.18.0 und Python 3.9

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
Öffne ein Terminal (Command Prompt in VS Code) und wechsle in den *frontend* Ordner in diesem Projekt:

``` shell
cd frontend
# install all the node.js dependencies
npm install
# node Projekt ausführen
npm start
```

## Backend installieren
### API und E-Mail-service
**1. Erstellen vom Environment** 

Im Terminal zum *backend* Ordner wechseln und dort mit der `requirements.txt` Datei eine virtuelle Python-Umgebung aufsetzen:

```shell
cd backend
# Erstelle ein neues Conda Environment:
conda create --name starryeyes python=3.9 -y
# Environment aktivieren:
conda activate starryeyes 
# Packages mit pip installieren:
pip install -r requirements.txt
```
**2. Einrichten vom E-Mail-Dienst** 

Die App benötigt eine E-Mail-Adresse um Bestätigungsemails versenden zu können.
Die Credentials (Adresse & Passwort) zu der E-Mail sind in einer lokalen config-Datei gespeichert. Aus Sicherheitsgründen ist nur eine Vorlage zu dieser Datei abgelegt. Die Vorlage ist hier abgelegt: `backend/config_template.yaml`. 

- Für die Credentials der Starry-Eyes E-Mail bitte [FredrikLennstroem](https://github.com/FredrikLennstroem) kontaktieren.
- Falls ein eigene E-Mail-Adresse verwendet werden soll, geht dies am einfachsten mit Gmail. Die nachfolgenden Links helfen da weiter:

    **Generelle Vorgehensweise:** [Sending An Email Using Python](https://bc-robotics.com/tutorials/sending-email-using-python-raspberry-pi/)

    **Detailliertere Vorgehensweise für die IMAP-Konfiguration:** [Configure for Google Workplace with Two Factor Authentication (2FA)](https://help.warmupinbox.com/en/articles/4934806-configure-for-google-workplace-with-two-factor-authentication-2fa)
- Anschliessend die Yaml-Datei mit dem eigenen GMAIL_USERNAME und GMAIL_PASSWORD ergänzen. Das GMAIL_PASSWORD ist das generierte "APP-Password" von Gmail und *nicht* das Passwort für den Google-Account.

    **Aufbau von der Yaml-Datei:**
    ```yaml
    SMTP_SERVER: smtp.gmail.com
    SMTP_PORT: 587 # richtigen Port angeben
    GMAIL_USERNAME: example@gmail.com
    GMAIL_PASSWORD: exam plee xamp leex
    ```
    In der Datei `backend/main.py` die Variabel *config_file* anpassen mit Pfad zur korrekten Datei.

**3. Backend starten mit *uvicorn***

```shell
cd backend
# virtuelle Umgebung starten:
conda activate starryeyes
# Server starten für API mit uvicorn
uvicorn main:app --reload
```
### Geoserver einrichten

Voraussetzung ist die [Installation](https://docs.geoserver.org/main/en/user/installation/index.html) des GeoServers.

**1. Daten im Verzeichnis ablegen** 

Die Daten für die beiden Layer (Schatten, Lichtverschmutzung) sind [herunterzuladen](https://fhnw365-my.sharepoint.com/:f:/g/personal/silas_haab_students_fhnw_ch/EibUxdGifKhJtWSAZaRFsWIB5uk-V8vwm6cRjY4dMMnRCQ?e=VIci45) und der ganze Ordner im Verzeichnis `C:/GeoServer/data_dir/data` abzulegen. (Downloadlink nur via FHNW-Konto verfügbar)

**2. Erweiterung Importer installieren**

Die Erweiterung Importer wird benötigt, um die alle Schattenlayer miteinander hinzuzufügen. Sie kann gemäss der [Anleitung](https://docs.geoserver.org/main/en/user/extensions/importer/installing.html) installiert werden.

Die heruntergeladenen Files müssen dann in folgendes Verzeichnis `C:/GeoServer/webapps/geoserver/WEB-INF/lib` kopiert werden. Anschliessend muss der Geoserver neu gestartet werden.

**3. Arbeitsbereich erstellen**

Unter *Daten>Arbeitsbereiche* einen neuen Arbeitsbereich hinzufügen:<br/>
Name: StarryEyes<br/>
Namensraum URI: StarryEyes

**4. Stile hinzufügen**

Unter *Daten>Stile* die folgenden zwei Stile hinzufügen:

- Lichtverschmutzung:<br/>
 Name: Lichtverschmutzung<br/>
 Arbeitsbereich: StarryEyes<br/>
 Format: SLD<br/>
 Stildatei hochladen: `C:/GeoServer/data_dir/data/starryeyes/Lichtverschmutzung.sld`

- Schatten:<br/>
 Name: Schatten<br/>
 Arbeitsbereich: StarryEyes<br/>
 Format: SLD<br/>
 Stildatei hochladen: `C:/GeoServer/data_dir/data/starryeyes/Schatten.sld`

**5. Lichtverschmutzungskarte hinzufügen**

Unter *Daten>Datenspeicher* neuen Datenspeicher hinzufügen:

- Rasterdatenquelle: GeoTIFF
 - Arbeitsbereich: StarryEyes
 - Name der Datenquelle: Lichtverschmutzung_CH
 - URL: `C:/GeoServer/data_dir/data/starryeyes/Lichtverschmutzung_CH_2024.tif`

Unter *Daten>Layer* neuen Layer hinzufügen und dort *StarryEyes:Lichtverschmutzung_CH* wählen und publizieren.<br/>
Unter dem Reiter *Publizierung* den Layerstil *StarryEyes:Lichtverschmutzung* wählen und speichern.

**6. Schattenkarte hinzufügen**

Unter *Daten>Daten importieren*:
- Datenquelle: Räumliche Datendateien
- Datenquelle konfigurieren: *GeoServer/data_dir//data/starryeyes/Schatten*
- Arbeitsbereich: StarryEyes
- Datenspeicher: Neuen Datenspeicher anlegen -> Next

Es werden alle Inhalte des Ordners in mehreren Seiten aufgelistet: über *Select: Alle* können alle Dateien pro Seite angewählt und importiert werden. Es sollen alle hillshade_hh_mm Dateien importiert werden. -> Next

Unter *Daten>Stile* den Stil Schatten auswählen und unter Publishing bei allen importierten Layern auf diesen Stil als Default definieren.

### Vorprozessierung
**Schattenberechnung**

Schatten werden lokal berechnet. Die Datei „schatten_loop.py“ prüft die Zeit alle 55 Sekunden und wenn die eingestellte Zeit erreicht ist, wird die Funktion ausgeführt und alle neuen TIFF-Dateien werden berechnet und gespeichert. Die Dateinamen bleiben immer gleich, sie werden also immer überschrieben. Dies ermöglicht es dem Geoserver, die Dateien zu finden und zu laden, auch wenn sie geändert und aktualisiert werden. Mit Hilfe des Geoservers kann eine personalisierte Darstellung eingestellt werden. In diesem Fall wird das Pixel, wenn es sich im Sonnenlicht befindet, transparent dargestellt. Liegt er dagegen im Schatten, wird er schwarz dargestellt (immer mit einer gewissen Transparenz, damit die darunter liegende Karte sichtbar ist).

## Ordnerstruktur

### Frontend

./frontend
  - /node_modules
      - Alle installierten Module
  - /public
  - /src
      - /`Index.js`
      - /`Index.css`
      - /`App.js`
      - /`App.css` Definition von mehrfach verwendeten Stilen
      - /`InfoBox.js` Infotext beim ersten Öffnen
      - /`map.js` Karteninhalt
      - /`SuccessSnackbar.js` Feedbackfeld Übermittlung E-Mail-Adresse
      - /`Symbolerklaerung.js` Einblendbare Symbolerklärung
      - /Drawer
          - /`MenuDrawer.js` Einblendbares Layermenu links
          - /`MoonDrawer.js` Einblendbare Mondphasen rechts
      - /PopUp
          - /`PopupContent.js` Inhalt des Marker PopUps
          - /`FormDialog.js` Inhalt des Standortüberwachenfenster
          - /`MarkerIcon.js` Markerstil
          - /`TransformToLV95.js` Umrechung der Koordinaten in LV95
      - /Images
          - Alle im Frontend verwendeten Bilder
  - /`package-lock.json`
  - /`package.json`

### Backend
./backend
  - /db_handling
      - Pythonscripts zum Handling von Datenbanken
      - Zukünftig: Handler-script für "Ort Überwachen"
  - /img
      - Resourcen für das Backend (Bilder im E-Mail)
  - /`starryeyes.py` (Funktionen für das Backend und API)
  - /`main.py` (API-Script)

## Quellenverzeichnis

- Wetter-API: Open-meteo (2022-2024): Weather Forecast API. https://open-meteo.com/
- Bibliotheken zur Berechnung der Sonnenstand:
    - Brandon Rhodes (2023): PyEphem. https://github.com/brandon-rhodes/pyephem
    - Guilhem Vellut (2022): TPPSS (TopopoSunsun). https://github.com/gvellut/tppss
- Sonnenposition: Kyle Barron (2023): suncalc-py. https://pypi.org/project/suncalc/
- Digitale Höhenmodell: Swisstopo (2024): DHM25. https://www.swisstopo.admin.ch/de/hoehenmodell-dhm25
- Horizon Angle: Whitebox Geospatial (2024): horizonangle. https://www.whiteboxgeo.com/
- Mondphasen: Jason Sturges (2024): Lunar phase, lunarphase-js. https://www.npmjs.com/package/lunarphase-js
- Lichtsverschmutzungskarte: Jurij Stare (2024): Light Pollution Map. https://www.lightpollutionmap.info/
- Symbole: MUI: MUI-Bibliothek. https://mui.com/