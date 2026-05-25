import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios"; // 1. Added axios for the Google API call
import leadRoute from "./routes/leadRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Ghoomo Saste Me API Running");
});

// 2. NEW: Google Reviews Proxy Route
app.get("/api/google-reviews", async (req, res) => {
  try {
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;

    // Fetch details from Google Places API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
    );

    if (response.data.result) {
      res.json(response.data.result);
    } else {
      res.status(404).json({ error: "No reviews found for this Place ID." });
    }
  } catch (error) {
    console.error("Error fetching Google Reviews:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lead route (Webhook) - Logic preserved
app.use("/api", leadRoute);

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});