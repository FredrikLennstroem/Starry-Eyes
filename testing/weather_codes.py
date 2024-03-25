"""
Dictionarys von Wetter Codes auf Englisch und Deutsch gemäss:
https://open-meteo.com/

Übersetzung mit ChatGPT 3.5.
""" 

weather_codes_en = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense intensity",
    56: "Freezing Drizzle: Light",
    57: "Freezing Drizzle: Dense intensity",
    61: "Rain: Slight intensity",
    63: "Rain: Moderate intensity",
    65: "Rain: Heavy intensity",
    66: "Freezing Rain: Light intensity",
    67: "Freezing Rain: Heavy intensity",
    71: "Snow fall: Slight intensity",
    73: "Snow fall: Moderate intensity",
    75: "Snow fall: Heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight intensity",
    81: "Rain showers: Moderate intensity",
    82: "Rain showers: Violent intensity",
    85: "Snow showers: Slight intensity",
    86: "Snow showers: Heavy intensity",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
}

weather_codes_de = {
    0: "Klarer Himmel",
    1: "Teilweise klar",
    2: "Teilweise bewölkt",
    3: "Bedeckt",
    45: "Nebel",
    48: "Bildung von Reifnebel",
    51: "Nieselregen: Leicht",
    53: "Nieselregen: Mäßig",
    55: "Nieselregen: Stark",
    56: "Gefrierender Nieselregen: Leicht",
    57: "Gefrierender Nieselregen: Stark",
    61: "Regen: Leichte Intensität",
    63: "Regen: Mäßige Intensität",
    65: "Regen: Starke Intensität",
    66: "Gefrierender Regen: Leichte Intensität",
    67: "Gefrierender Regen: Starke Intensität",
    71: "Schneefall: Leichte Intensität",
    73: "Schneefall: Mäßige Intensität",
    75: "Schneefall: Starke Intensität",
    77: "Schneekörner",
    80: "Regenschauer: Leichte Intensität",
    81: "Regenschauer: Mäßige Intensität",
    82: "Regenschauer: Starke Intensität",
    85: "Schneeschauer: Leichte Intensität",
    86: "Schneeschauer: Starke Intensität",
    95: "Gewitter: Leicht oder mäßig",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit schwerem Hagel"
}