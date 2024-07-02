import {ServerConfig} from "../types/server";

export function createServerConfig(): ServerConfig {
  if (!process.env.PORT) throw new Error("Environment Error. No port specified.");
  if (!process.env.SALT) throw new Error("Environment Error. No salt rounds specified.");
  if (!process.env.JWT_SECRET) throw new Error("Environment Error. No secret specified.");
  if (!process.env.REFRESH_TTL) throw new Error("Environment Error. No refresh_ttl specified.");

  return {
    port: Number(process.env.PORT),
    saltRounds: Number(process.env.SALT),
    secret: process.env.JWT_SECRET,
    refresh_ttl: Number(process.env.REFRESH_TTL),
    token_ttl: Number(process.env.TOKEN_TTL)
  }
}