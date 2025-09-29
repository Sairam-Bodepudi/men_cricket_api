const express = require("express");
const mongoose = require("mongoose");
const playerRoutes = require("./routes/players");

const app = express();
const port = process.env.PORT || 3000;
// IMPORTANT: use your 'cricket' DB
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cricket";

app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/players", playerRoutes);

// Connect DB and start server
mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("Connected to MongoDB (cricket)");
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect MongoDB:", err.message);
    process.exit(1);
  });
