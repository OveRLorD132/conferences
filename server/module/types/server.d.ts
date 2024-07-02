import {Router} from "express";
import * as http from "node:http";

export type ServerConfig = {
  port: number,
  saltRounds: number,
  secret: string,
  refresh_ttl: number,
  token_ttl?: number
}

export interface IServer {
  run(): http.Server
  close(): Promise<void>
}

export interface IRouter {
  getRouter(): Router
}