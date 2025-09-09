// server.js
require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./config/db"); 

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
const authRoutes = require("./routes/auth");
const hillstationRoutes = require("./routes/hillstation");
const roadtripRoutes = require("./routes/roadtrip");
const adventureRoutes = require("./routes/adventure");
const nightlifeRoutes = require("./routes/nightlife");
const beachesRoutes = require("./routes/beaches");
const hotelRoutes = require("./routes/hotels");

// ✅ Route Mounts
app.use("/api/auth", authRoutes);
app.use("/api/hillstation", hillstationRoutes);
app.use("/api/roadtrip", roadtripRoutes);
app.use("/api/adventure", adventureRoutes);
app.use("/api/nightlife", nightlifeRoutes);
app.use("/api/beaches", beachesRoutes);
app.use("/api/hotels", hotelRoutes);
// app.use("/hotels", require("./routes/hotels"));



// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🏨 Hotel API Server is running...");
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
