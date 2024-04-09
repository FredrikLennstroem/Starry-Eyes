import requests
import json

def convert(easting, northing):
    url = f"http://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting={easting}&northing={northing}&format=json"
    r = requests.get(url)
    j = json.loads(r.text)
    east = float(j['easting'])
    north = float(j['northing'])
    return (east, north)
