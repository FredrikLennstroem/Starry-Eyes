import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# Define the function to send the database file via email
# def send_email(subject, body, attachment):

SMTP_SERVER = 'smtp.gmail.com' #Email Server (don't change!)
SMTP_PORT = 587 #Server Port (don't change!)
GMAIL_USERNAME = 'noreply.starryeyes@gmail.com' #change this to match your gmail account
GMAIL_PASSWORD = 'dgur tkpe lolq kdlq' #change this to match your gmail app-password

class Emailer:
    def sendmail(self, recipient, subject, content): #, attachment_path="testdb.db"
        try:
            msg = MIMEMultipart()
            msg['From'] = GMAIL_USERNAME
            msg['To'] = recipient
            msg['Subject'] = subject

            # Attach the content as text
            msg.attach(MIMEText(content, 'plain'))

            # if attachment_path:
            #     # Attach the file as an attachment
            #     attachment = open(attachment_path, 'rb')
            #     part = MIMEBase('application', 'octet-stream')
            #     part.set_payload((attachment).read())
            #     encoders.encode_base64(part)
            #     part.add_header('Content-Disposition', "attachment; filename= %s" % os.path.basename(attachment_path))
            #     msg.attach(part)

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

