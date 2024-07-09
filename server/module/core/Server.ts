import express, {Express, IRoute} from "express";
import {IHttpServer, IRouter, IServer, ServerConfig} from "../types/server";
import * as http from "node:http";
import {ICalls, IDatabase, IUsers} from "../types/db";
import path from "path";
import AdminAPI from "./API/AdminAPI";
import PagesAPI from "./API/PagesAPI";
import AuthAPI from "./API/AuthAPI";
import Users from "./Database/Postgres/Users";
import bodyParser from "body-parser";
import cors from 'cors';
import CallsAPI from "./API/CallsAPI";
import Calls from "./Database/Postgres/Calls";


export default class Server implements IHttpServer {
  /** @private */
  private _http?: http.Server;

  public get http() {
    return this._http;
  }

  /** @readonly */
  private readonly _server: Express
  private readonly _db: IDatabase
  private readonly _config: ServerConfig;

  constructor(db: IDatabase, config: ServerConfig) {
    this._db = db;
    this._config = config;
    this._server = express();
    this._server.use(bodyParser.urlencoded({ extended: false }));
    this._server.use(bodyParser.json());
    this._server.use(cors());
    this._server.use(express.static(path.resolve('public')));

    this._setupRouters();
  }

  public run(): void {
    this._http = this._server.listen(this._config.port);
  }

  public async close(): Promise<void> {
    if(!this._http) throw new Error("Server is not running");

    await this._db.end();
    this._http.close();
  }

  private _setupRouters() {
    const users: IUsers = new Users(this._db.client);
    const calls: ICalls = new Calls(this._db.client);

    const admin: IRouter = new AdminAPI();
    const pages: IRouter = new PagesAPI();
    const auth: IRouter = new AuthAPI(users, this._config);
    const callsRoute: IRouter = new CallsAPI(calls);

    this._server.use(admin.getRouter());
    this._server.use(pages.getRouter());
    this._server.use(auth.getRouter());
    this._server.use(callsRoute.getRouter());
  }
}