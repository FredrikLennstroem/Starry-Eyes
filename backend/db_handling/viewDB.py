import sqlite3

db = 'backend/abo.db'

conn = sqlite3.connect(db)
cursor = conn.cursor()

cursor.execute("SELECT * FROM abo")
rows = cursor.fetchall()

for row in rows:
    print(row)