import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import leadRoute from "./routes/leadRoute.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (FIXES your error)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Lead route (VERY IMPORTANT)
app.use("/api", leadRoute);

// ❗ OPTIONAL DB (you can remove if not needed)
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ghoomo_db"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Error:", err.message);
  } else {
    console.log("✅ DB Connected");
  }
});

// ✅ Trips API
app.get("/api/trips", (req, res) => {
  db.query("SELECT * FROM trips", (err, data) => {
    if (err) return res.status(500).json({ error: "Server Error" });
    res.json(data);
  });
});

// ✅ Single Trip
app.get("/api/trips/:id", (req, res) => {
  db.query("SELECT * FROM trips WHERE id = ?", [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    if (data.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(data[0]);
  });
});

// ✅ PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});