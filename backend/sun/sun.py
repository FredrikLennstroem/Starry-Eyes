from datetime import datetime, timedelta
import subprocess

ROOT_PROJ = 'C:/_Schule/FHNW/6/GIS/Projekt/FS24_GIS'
DEM = f'{ROOT_PROJ}/backend/sun/59_DEM.tiff'
location = '46.76876, 9.05518'

class SunSetRise:
    """
    Berechnet Sonnenaufgang Hinter Gelände.
    Verwendet 'tppss'-Library von gvellut:
    URL: https://github.com/gvellut/tppss

    Args:

    position: WGS84-Koordinaten vom Standort, als String, Kommagetrennt. 'lat, long'

    dem: Pfad zum Geländemodell, als String. Modell als Geotiff WGS84 mit ellipsoidische Höhen.
    

    """
    def __init__(self, position:str, dem:str):
        self.position = position
        self.dem = dem
        self.today = datetime.now().date()

    def sunset(self):
        date = str(self.today)
        command = ["tppss", "day", "-m", self.dem, "-j", date, "-p", self.position]
        res = subprocess.check_output(command, universal_newlines=True)
        return res.split('\n')[3].split(' ')[-1][:-6]
    
    def sunrise(self):
        date = str(self.today + timedelta(days=1))
        command = ["tppss", "day", "-m", self.dem, "-j", date, "-p", self.position]
        res = subprocess.check_output(command, universal_newlines=True)
        return res.split('\n')[3].split(' ')[2][:-6]
    
