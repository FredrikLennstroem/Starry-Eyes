const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Verbindung zur DB (evtl. Anpassen)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'geoserver',
  password: 'kruemel11',
  port: 5432,
});

// Route zum Speichern der Abonnementdaten
app.post('/api/subscription', async (req, res) => {
  const { email, latitude, longitude, easting, northing } = req.body;
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO Subscriptions (email, latitude, longitude, easting, northing) VALUES ($1, $2, $3, $4, $5)', [email, latitude, longitude, easting, northing]);
    client.release();
    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Starten Sie den Server "node SQL.js" im cd "src"n
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

