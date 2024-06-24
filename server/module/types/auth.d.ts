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

export interface SrvRequest extends Request {
  user?: object
}