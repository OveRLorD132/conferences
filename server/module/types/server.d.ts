import {Router} from "express";
import * as http from "node:http";
import {Server} from 'socket.io';

export type ServerConfig = {
  port: number,
  saltRounds: number,
  secret: string,
  refresh_ttl: number,
  token_ttl?: number
}

export type WebsocketConfig = {
  port: number
}

export interface IServer {
  run(): void
  close(): Promise<void>
}

export interface IHttpServer extends IServer {
  http?: http.Server
}

export interface ISignalServer extends IServer {
  server: Server
}

export interface IRouter {
  getRouter(): Router
}