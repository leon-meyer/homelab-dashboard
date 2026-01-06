const express = require("express");
const router = express.Router();

router.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

module.exports = router;
