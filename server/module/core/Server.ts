import express, {Express} from "express";
import {IRouter, IServer, ServerConfig} from "../types/server";
import * as http from "node:http";
import {IDatabase} from "../types/db";
import path from "path";
import AdminAPI from "./API/AdminAPI";
import PagesAPI from "./API/PagesAPI";


export default class Server implements IServer {
  /** @private */
  private _http?: http.Server;

  /** @readonly */
  private readonly _server: Express
  private readonly _db: IDatabase
  private readonly _config: ServerConfig;

  constructor(db: IDatabase, config: ServerConfig) {
    this._db = db;
    this._config = config;
    this._server = express();
    this._server.use(express.static(path.resolve('public')));

    this._setupRouters();
  }

  public run(): http.Server {
    this._http = this._server.listen(this._config.port);
    return this._http;
  }

  public async close(): Promise<void> {
    if(!this._http) throw new Error("Server is not running");

    await this._db.end();
    this._http.close();
  }

  private _setupRouters() {
    const admin: IRouter = new AdminAPI();
    const pages: IRouter = new PagesAPI();

    this._server.use(admin.getRouter());
    this._server.use(pages.getRouter());
  }
}