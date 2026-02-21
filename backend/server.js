const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YourPassword", // <--- UPDATE THIS WITH YOUR ACTUAL MYSQL PASSWORD
  database: "ghoomo_db"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed: " + err.message);
    return;
  }
  console.log("✅ Connected to MySQL Database (ghoomo_db)");
});

// 1. GET ALL TRIPS (For the Home Page)
app.get('/api/trips', (req, res) => {
  const sql = "SELECT * FROM trips";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
});

// 2. GET SINGLE TRIP BY ID (For the Itinerary Page)
// This matches the /trip/:id route in your React app
app.get('/api/trips/:id', (req, res) => {
  const tripId = req.params.id;
  const sql = "SELECT * FROM trips WHERE id = ?";
  
  db.query(sql, [tripId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.status(200).json(data[0]); // Return only the first matching trip
  });
});

// 3. POST BOOKING (Optional: To save customer inquiries)
app.post('/api/bookings', (req, res) => {
  const { name, phone, trip_id } = req.body;
  const sql = "INSERT INTO bookings (name, phone, trip_id) VALUES (?, ?, ?)";
  
  db.query(sql, [name, phone, trip_id], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Booking saved successfully!" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});