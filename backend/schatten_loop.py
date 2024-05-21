import datetime
import suncalc
import math
import whitebox
from osgeo import gdal
import numpy as np
import os
import schedule
import time

# diese Funktion gibt eine Liste von Dictionaries zurück. Jedes Dictionary enthält vier Informationen: Stunde, Minute, Azimuth und Höhe.
# Nachdem die Stunde und die Minute eingestellt sind, wird die Position der Sonne (Azimut und Höhe) mit dem Modul suncalc berechnet.
# Nach der Berechnung werden 15 Minuten zur Zeit hinzugezählt und der Vorgang wird wiederholt.
def times():
    lat, lon = 46.798409439, 8.231877094 # Position (Zentrum von der Schweiz)
    # Stellt das aktuelle Datum ein
    print(datetime.datetime.now())
    date = datetime.date.today()
    year = date.year
    month = date.month
    day = date.day
    current_hour = 0
    current_minute = 0
    data_sole = [] # Liste, die mit Dictionaries gefüllt wird (hour, minute, azimuth, and altitude)

    # while loop um Zeit alle 15 Minuten zu haben
    while True:
        date_time = datetime.datetime(year, month, day, current_hour, current_minute) # Erste Zeitpunkt (Mittelnacht)
        
        # Berechnet Position der Sonne mit suncalc
        sun_position = suncalc.get_position(date_time, lat, lon)
        azimuth = round(sun_position['azimuth'], 6) # round azimuth and altitude, 6 Nachkommastellen
        altitude = round(sun_position['altitude'], 6)

        hour = date_time.hour + 2

        if hour == 24:
            hour = 0
        elif hour == 25:
            hour = 1

        # dictionary wird erzeugt
        a = {
            'h': hour,
            'min': date_time.minute,
            'azimuth': azimuth,
            'altitude': altitude
        }
        data_sole.append(a) # und die Liste hinzugefügt

        # print(f"Um {date_time.hour}:{date_time.minute} Uhr, Azimuth = {azimuth} und Hoehe = {altitude}")

        # 15 Minuten werden addiert
        delta = datetime.timedelta(minutes=15)
        date_time += delta

        # Stunden und Minuten werden aktualisiert
        current_minute += 15
        if current_minute >= 60:
            current_minute -= 60
            current_hour += 1

        # Wenn nötig, wird ein Tag addiert
        if current_hour == 24:
            day += 1
            current_hour = 0

        # Loop wird abgeschlossen, sobald das Tag nicht mehr Heute ist 
        if day != date.day:
            break

    return data_sole

# diese Funktion ruft die Funktion Times auf, um die Informationen zu erhalten.
# Danach wird für jedes Dictionary ein Tiff-Datei "Horizonangle" berechnet und automatisch gespeichert.
# Dann wird das Tiff geöffnet und ein neues Tiff mit Werte 0 oder 1 erzeugt und gespeichert. Das provisorische Tiff wird gelöscht.
def horizon():
    data_sole = times()
    print(data_sole)

    for diz in data_sole:
        ora = diz['h']
        min = diz['min']
        azimuth = diz['azimuth']
        altitudine = diz['altitude']
        if altitudine > 0:
            rho = 180/math.pi
            az = (azimuth * rho)+180
            alt = altitudine * rho
            print(ora, min, az, alt)

            wbt = whitebox.WhiteboxTools()

            dem = "C:/Users/alexb/OneDrive - FHNW/Documents/1-FHNW/G6/4230 Geoinformatik & Raumanalyse/Projekt/schatten/DHM25_koo.tif"
            output_ordner = "C:/Users/alexb/OneDrive - FHNW/Documents/1-FHNW/G6/4230 Geoinformatik & Raumanalyse/Projekt/schatten"
            output = f"{output_ordner}/hillshade_{diz['h']}_{diz['min']}_prov.tif"

            wbt.horizon_angle(
                dem, 
                output, 
                azimuth=az, 
                max_dist=10000.0, 
                callback=None
            )
            print("immagine salvata")

            input_ds = gdal.Open(output, gdal.GA_ReadOnly)
            if input_ds is None:
                print("Errore: Impossibile aprire il file TIFF di input.")

            raster_array = input_ds.ReadAsArray()

            processed_array = np.where(raster_array != input_ds.GetRasterBand(1).GetNoDataValue(), 
                                        np.where(raster_array > alt, 0, 1), 
                                        input_ds.GetRasterBand(1).GetNoDataValue())

            geo_transform = input_ds.GetGeoTransform()
            projection = input_ds.GetProjection()

            output_tiff_path = f"{output_ordner}/hillshade_{diz['h']}_{diz['min']}.tif"

            driver = gdal.GetDriverByName("GTiff")
            output_ds = driver.Create(output_tiff_path, input_ds.RasterXSize, input_ds.RasterYSize, 1, gdal.GDT_Float32)
            output_ds.SetGeoTransform(geo_transform)
            output_ds.SetProjection(projection)
            output_ds.GetRasterBand(1).WriteArray(processed_array)
            output_ds.GetRasterBand(1).SetNoDataValue(input_ds.GetRasterBand(1).GetNoDataValue())
            print(f"immagine definitiva delle {ora}:{min} salvata")

            input_ds = None
            output_ds = None

            os.remove(output)
            print("file provvisorio cancellato")
        else:
            dem = "C:/Users/alexb/OneDrive - FHNW/Documents/1-FHNW/G6/4230 Geoinformatik & Raumanalyse/Projekt/schatten/DHM25_koo.tif"
            output_ordner = "C:/Users/alexb/OneDrive - FHNW/Documents/1-FHNW/G6/4230 Geoinformatik & Raumanalyse/Projekt/schatten"
            nome_file_dest = f"{output_ordner}/hillshade_{diz['h']}_{diz['min']}.tif"

            if os.path.exists(nome_file_dest):
                print("Sovrascrivo file notturno")

                dataset = gdal.Open(dem, gdal.GA_ReadOnly)

                band = dataset.GetRasterBand(1)

                data = band.ReadAsArray()

                empty_value = None  
                data[data != empty_value] = 0

                geotransform = dataset.GetGeoTransform()
                projection = dataset.GetProjection()

                # neues file TIFF
                driver = gdal.GetDriverByName('GTiff')
                out_dataset = driver.Create(nome_file_dest, dataset.RasterXSize, dataset.RasterYSize, 1, band.DataType)

                out_dataset.SetGeoTransform(geotransform)
                out_dataset.SetProjection(projection)

                out_band = out_dataset.GetRasterBand(1)
                out_band.WriteArray(data)

                out_band.FlushCache()
                out_dataset.FlushCache()
                dataset = None
                out_dataset = None

                print(f"Nuovo file TIFF creato e salvato con successo come '{nome_file_dest}'")

# Die Funktion horizon wird jedes Tag um 00:01 ausgeführt
schedule.every().day.at("00:01").do(horizon)

while True:
    # Hier wird die Zeit überprüft
    schedule.run_pending()
    time.sleep(55)  # Es wartet 55 Sekunden und dann prüft nochmals die Uhrzeit