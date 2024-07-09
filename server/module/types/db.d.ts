import {PoolClient} from "pg";
import {global} from "../../../global";
import Register = global.Register;
import User = global.User;
import {CallCreated, CallRaw} from "./index";

export type DatabaseConfig = {
  user: string,
  password: string,
  host: string,
  port: number,
  database: string
}

export interface IDatabase {
  readonly client: PoolClient,

  end(): Promise<void>,
}

export interface IUsers {
  addUser(user: Register): Promise<User>;
  getUser(id: number): Promise<User>;
  getProfileById(id: number): Promise<Profile>;
  getByEmail(email: string): Promise<User>;
  getByUsername(username: string): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

export interface ICalls {
  addCall(call: CallCreated): Promise<CallRaw>;
  getCall(id: string): Promise<CallRaw>;
  deleteCall(id: string): Promise<void>;
}