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
        self.observer = ephem.Observer()
        self.observer.lat = position.split(',')[0]
        self.observer.long = position.split(',')[1]

    def sunset_dem(self):
        date = str(self.today)
        command = ["tppss", "day", "-m", self.dem, "-j", date, "-p", self.position]
        res = subprocess.check_output(command, universal_newlines=True)
        return res.split('\n')[3].split(' ')[-1][:-6]
    
    def sunrise_dem(self):
        date = str(self.today + timedelta(days=1))
        command = ["tppss", "day", "-m", self.dem, "-j", date, "-p", self.position]
        res = subprocess.check_output(command, universal_newlines=True)
        return res.split('\n')[3].split(' ')[2][:-6]
    
    def sunset_globe(self):
        sunset = self.observer.next_setting(ephem.Sun(), start=self.today)
        sunset_str = str(ephem.localtime(sunset))
        return sunset_str.split(' ')[1][:-7]

    def sunrise_globe(self):
        sunrise = self.observer.next_rising(ephem.Sun(), start=self.today)
        sunrise_str = str(ephem.localtime(sunrise))
        return sunrise_str.split(' ')[1][:-7]
