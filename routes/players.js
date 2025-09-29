const express = require("express");
const mongoose = require("mongoose");
const Player = require("../models/playerModel");

const router = express.Router();

// CREATE: POST /api/players
router.post("/", async (req, res) => {
  const {
    name,
    jersey_no,
    role,
    matches,
    runs,
    batting_avg,
    strike_rate,
    wickets,
  } = req.body;

  try {
    const player = await Player.create({
      name,
      jersey_no,
      role,
      matches,
      runs,
      batting_avg,
      strike_rate,
      wickets,
    });
    return res.status(200).json(player);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// READ ALL: GET /api/players
router.get("/", async (_req, res) => {
  const players = await Player.find().sort({ name: 1 });
  return res.status(200).json(players);
});

// READ ONE: GET /api/players/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid player id." });
  }
  const player = await Player.findById(id);
  if (!player) {
    return res.status(404).json({ error: "Player not found." });
  }
  return res.status(200).json(player);
});

// UPDATE (partial): PATCH /api/players/:id
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid player id." });
  }
  const player = await Player.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // return updated doc
  );
  if (!player) {
    return res.status(404).json({ error: "Player not found." });
  }
  return res.status(200).json(player);
});

// DELETE: DELETE /api/players/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid player id." });
  }
  const player = await Player.findOneAndDelete({ _id: id });
  if (!player) {
    return res.status(404).json({ error: "Player not found." });
  }
  return res.status(200).json(player);
});

module.exports = router;
