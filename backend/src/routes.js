const express = require("express");
const router = express.Router();
const { getJellyfinStatus, getNowPlaying } = require("./services/jellyfin"); // adjust path

router.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

router.get("/jellyfin/status", async (_, res) => {
  try {
    const status = await getJellyfinStatus();
    res.json(status);
  } catch (err) {
    res.status(503).json({ status: "down", error: err });
  }
});

router.get("/jellyfin/now-playing", async (_, res) => {
  try {
    const sessions = await getNowPlaying();
    res.json(sessions);
  } catch {
    res.status(500).json([]);
  }
});

module.exports = router;
