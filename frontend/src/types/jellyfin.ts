export type JellyfinStatus = {
  status: "ok" | "down";
  serverName?: string;
  version?: string;
};

export type NowPlaying = {
  user: string;
  title: string;
  type: string;
};
