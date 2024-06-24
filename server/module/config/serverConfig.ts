import {ServerConfig} from "../types/server";

export function createServerConfig(): ServerConfig {
  if (!process.env.PORT) throw new Error("Environment Error. No port specified.");

  return {
    port: Number(process.env.PORT),
  }
}