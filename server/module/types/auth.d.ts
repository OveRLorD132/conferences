import {Request} from "express";

export type TokenHeader = {
  alg: string,
  typ: string
}

export type TokenPayload = {
  iat: number,
  exp: number,
  sub: string,
}

export type Tokens = {
  access_token: string,
  refresh_token: string
}

export interface SrvRequest extends Request {
  user?: {
    id: string
  }
}

export interface IAuth {
  authenticate(email: string, password: string): Promise<Tokens>;
  register(username: string, email:string, password: string): Promise<Tokens>;
}