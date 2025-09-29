const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    jersey_no: { type: Number, required: true, min: 0 },
    role: {
      type: String,
      required: true,
      trim: true,
      // Optional: keep flexible, or constrain if you prefer
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
    },
    matches: { type: Number, required: true, min: 0 },
    runs: { type: Number, required: true, min: 0 },
    batting_avg: { type: Number, required: true, min: 0 },
    strike_rate: { type: Number, required: true, min: 0 },
    wickets: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Explicitly map to "players" collection (your existing collection name)
module.exports = mongoose.model("Player", playerSchema, "players");
