const axios = require("axios");

const jellyfin = axios.create({
  baseURL: process.env.JELLYFIN_URL,
  headers: { "X-Emby-Token": process.env.JELLYFIN_API_KEY },
  timeout: 3000,
});

async function getJellyfinStatus() {
  const res = await jellyfin.get("/System/Info");
  return {
    status: "ok",
    serverName: res.data.ServerName,
    version: res.data.Version,
  };
}

async function getNowPlaying() {
  const res = await jellyfin.get("/Sessions");

  return res.data
    .filter((s) => s.NowPlayingItem)
    .map((s) => ({
      user: s.UserName,
      title: s.NowPlayingItem.Name,
      type: s.NowPlayingItem.Type,
    }));
}

module.exports = { getJellyfinStatus, getNowPlaying };
