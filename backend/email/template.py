#Import required modules
import serial
import sqlite3
import smtplib
import time
import os
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from sense_hat import SenseHat

last_execution_time = time.time()

#led
sense = SenseHat()
sense.clear((122,255,122))

# Set up the serial port for communication with MS60
ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)

"""print(ser)
ser.write(b'%R1Q,5004:\r\n')
ser.write(b'%R1Q,5003:\r\n')
print(ser.readlines()) """


# Define the SQLite database path and connect to it
dbname = "testdb.db"
conn = sqlite3.connect(dbname)
cursor = conn.cursor()

# Create a table for the monitoring data
cursor.execute('''CREATE TABLE IF NOT EXISTS measurements (
                id INTEGER PRIMARY KEY,
                point_nr TEXT,
                E REAL,
                N REAL,
                H REAL,
                Date TEXT,
                Time TEXT
                )''')

# Define the function to log data to the SQLite database
# def log_data(data):

def log_data(data):
    try:
        data_str = data.decode('utf-8')  # Decode bytes to a string
        global Time
        Nr, E, N, H, Date, Time = data_str.split(",")
        cursor.execute("INSERT INTO measurements (point_nr, E, N, H, Date, Time) VALUES (?, ?, ?, ?, ?, ?)",(Nr, E, N, H, Date, Time))
        conn.commit()
    except:
        pass

    
# Define the function to send the database file via email
# def send_email(subject, body, attachment):

SMTP_SERVER = 'smtp.gmail.com' #Email Server (don't change!)
SMTP_PORT = 587 #Server Port (don't change!)
GMAIL_USERNAME = 'fredimatteotimon@gmail.com' #change this to match your gmail account
GMAIL_PASSWORD = 'wcsw mmgs vpjo fgdn' #change this to match your gmail app-password
# Fredimatteotimon_1

class Emailer:
    def sendmail(self, recipient, subject, content, attachment_path="testdb.db"):
        try:
            msg = MIMEMultipart()
            msg['From'] = GMAIL_USERNAME
            msg['To'] = recipient
            msg['Subject'] = subject

            # Attach the content as text
            msg.attach(MIMEText(content, 'plain'))

            if attachment_path:
                # Attach the file as an attachment
                attachment = open(attachment_path, 'rb')
                part = MIMEBase('application', 'octet-stream')
                part.set_payload((attachment).read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', "attachment; filename= %s" % os.path.basename(attachment_path))
                msg.attach(part)

            # Connect to Gmail Server
            session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            session.ehlo()
            session.starttls()
            session.ehlo()

            # Login to Gmail
            session.login(GMAIL_USERNAME, GMAIL_PASSWORD)

            # Send Email & Exit
            session.sendmail(GMAIL_USERNAME, recipient, msg.as_string())
            session.quit
            print("Email gesendet")
        except Exception as e:
            print("Email konnte nicht gesendet werden: ", e)

sender = Emailer()



# Define the main loop to continuously read data from MS60
def read_data():
    a = ser.readline()
    return a

     
#while True:
    # Read data from MS60
while True:
    try:
        data = read_data()
        print(1)
        if not data:
            continue
    except:
        pass
    
    # If data is received, log it to the database
    log_data(data)
    
    # Check if there is a time lapse of 15 minutes, start preparing email 	#subject, body and send the email with the database file as an 	#attachment.
    current_time = time.time()
    
    
    if current_time - last_execution_time >= 15:
           sendTo = GMAIL_USERNAME
           emailSubject = f"Database at {Time}"
           emailContent = "Ich bin kein Roboter"
           sender.sendmail(sendTo, emailSubject, emailContent)
           last_execution_time = current_time
           print("email gesendet")
           message = "Die E-Mail konnte erfolgreich an die E-mail Adresse fredimatteotimon@gmail.com gesendet werden"
           sense.show_message(message, 0.075, (255,0,0), (0,0,255))
    
        
    time.sleep(1)

#-------------------------------------------------------------------------------------------------------------------
# This Section is for using GeoCOM Interface ONLY
#import geocom_new

# Request for Connection
# totalstation = geocom_new.geocom_connect()

# Start writing your code here
# ==================================
# For instance, Seriennummer abfragen
#res = totalstation.request(5003)
#print("Seriennummer: ",res[1])


conn.close()



