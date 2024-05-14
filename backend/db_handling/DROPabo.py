import sqlite3

db = 'backend/abo.db'

conn = sqlite3.connect(db)
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS abo")

conn.commit()