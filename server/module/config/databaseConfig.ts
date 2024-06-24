import {DatabaseConfig} from "../types/db";

export function createDatabaseConfig(): DatabaseConfig {
  if (!process.env.DB_USER) throw new Error("Environment Error. No database username specified.");
  if (!process.env.PASSWORD) throw new Error("Environment Error. No database password specified.");
  if (!process.env.DATABASE) throw new Error("Environment Error. No database specified.");
  if (!process.env.DB_HOST) throw new Error("Environment Error. No database host specified.");
  if (!process.env.DB_PORT) throw new Error("Environment Error. No database port specified.");

  return {
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DATABASE
  }
}