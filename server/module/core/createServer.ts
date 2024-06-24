import {ServerConfig} from "../types/server";
import Database from "./Database/Postgres/Database";
import Server from "./Server";
import dotenv from "dotenv";
import {DatabaseConfig, IDatabase} from "../types/db";
import {createDatabaseConfig} from "../config/databaseConfig";
import {createServerConfig} from "../config/serverConfig";

dotenv.config();

export default async function createServer(): Promise<Server> {
  const SERVER_CONFIG: ServerConfig = createServerConfig();
  const DATABASE_CONFIG: DatabaseConfig = createDatabaseConfig();

  const db: IDatabase = await Database.create(DATABASE_CONFIG);

  const server = new Server(db, SERVER_CONFIG)
  server.run();

  return server;
}