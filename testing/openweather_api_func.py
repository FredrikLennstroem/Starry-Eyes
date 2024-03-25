import openmeteo_requests
import requests_cache
import pandas as pd
import numpy as np
from retry_requests import retry
from weather_codes import weather_codes_de, weather_codes_en

# Current------------------------------------------------------------------------------------

def openweather_current(lat: float, long: float):
    """
    Für aktuelle Wollkendecke von bestimmten Standort.
    Ruft openweather-api ab.

    Args:
    lat: latitude (Breite), float [WGS84]
    long: longitude (Länge), float [WGS84]

    Output:
    Float [%] der aktuellen Wolkendecke.
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
    	"current": ["cloud_cover"],
    	# "hourly": ["weather_code", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "visibility"],
    	# "daily": ["weather_code", "sunrise", "sunset"],
    	"timezone": "Europe/Berlin",
    	# "forecast_days": 3,
    	"models": "best_match"
    }
    responses = openmeteo.weather_api(url, params=params)

    # Process first location. Add a for-loop for multiple locations or weather models
    response = responses[0]
    # Current values. The order of variables needs to be the same as requested.
    current = response.Current()

    return current.Variables(0).Value()

# Hourly------------------------------------------------------------------------------------

def openweather_hour(lat: float, long: float):
    """
    Stündliche Vorhersage von Wetterdaten für die nächsten 72h.

    Inhalt: 'date', 'weather_code', 'weather', 'cloud_cover', 'cloud_cover_low', 'cloud_cover_mid', 'cloud_cover_high', 'visibility'
    Ruft openweather-api ab.

    Args:
    lat: latitude (Breite), float [WGS84]
    long: longitude (Länge), float [WGS84]

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
    	# "timezone": "Europe/Berlin",
    	"forecast_days": 3,
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
    hourly_weather = np.vectorize(weather_codes_en.get)(hourly_weather_code)

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
