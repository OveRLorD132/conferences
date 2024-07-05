import {IHttpServer, ServerConfig} from "../types/server";
import Database from "./Database/Postgres/Database";
import Server from "./Server";
import dotenv from "dotenv";
import {DatabaseConfig, ICalls, IDatabase} from "../types/db";
import {createDatabaseConfig} from "../config/databaseConfig";
import {createServerConfig} from "../config/serverConfig";
import {SocketServer} from "./WS/SocketServer";
import Calls from "./Database/Postgres/Calls";

dotenv.config();

export default async function createServer(): Promise<IHttpServer> {
  const SERVER_CONFIG: ServerConfig = createServerConfig();
  const DATABASE_CONFIG: DatabaseConfig = createDatabaseConfig();

  const db: IDatabase = await Database.create(DATABASE_CONFIG);

  const server: IHttpServer = new Server(db, SERVER_CONFIG)
  server.run();

  const calls: ICalls = new Calls(db.client);

  const ws = new SocketServer(server, calls);
  ws.run();

  return server;
}