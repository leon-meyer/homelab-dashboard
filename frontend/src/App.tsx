import { useEffect, useState } from "react";
import axios from "axios";
import type { JellyfinStatus, NowPlaying } from "./types/jellyfin";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function App() {
  const [status, setStatus] = useState<JellyfinStatus | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying[]>([]);

  useEffect(() => {
    api
      .get<JellyfinStatus>("/jellyfin/status")
      .then((res) => setStatus(res.data))
      .catch(() => setStatus({ status: "down" }));

    api
      .get<NowPlaying[]>("/jellyfin/now-playing")
      .then((res) => setNowPlaying(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Home Control Plane</h1>

      <h2>Jellyfin</h2>
      <p>Status: {status?.status === "ok" ? "🟢 Online" : "🔴 Offline"}</p>

      {nowPlaying.length > 0 && (
        <>
          <h3>Now Playing</h3>
          <ul>
            {nowPlaying.map((s, i) => (
              <li key={i}>
                {s.user} → {s.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
