import {WebsocketConfig} from "../types/server";

export default function createWebsocketConfig(): WebsocketConfig {
  if(!process.env.WS_PORT) throw new Error("WS_PORT environment variable required");

  return {
    port: Number(process.env.WS_PORT)
  }
}