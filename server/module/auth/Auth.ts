import bcrypt from 'bcrypt';
import {IUsers} from "../types/db";
import {ServerConfig} from "../types/server";
import {IAuth, Tokens} from "../types/auth";
import JWT from "./JWT";

export default class Auth implements IAuth {
  private readonly _users: IUsers;
  private readonly _config: ServerConfig;

  constructor(users: IUsers, config: ServerConfig) {
    this._users = users;
    this._config = config;
  }

  public async authenticate(email: string, password: string): Promise<Tokens> {
    const user = await this._users.getByEmail(email);
    if(!user) throw new Error("User not found");

    const match: boolean = await bcrypt.compare(password, user.password);
    if(!match) throw new Error("Invalid password");

    return {
      access_token:JWT.generateToken(user.id.toString(), this._config.secret, this._config.token_ttl),
      refresh_token: JWT.generateToken(user.id.toString(), this._config.secret, this._config.refresh_ttl),
    };
  }

  public async register(username: string, email: string, password: string): Promise<Tokens> {
    const hash = await bcrypt.hash(password, this._config.saltRounds);
    const user = await this._users.addUser({username, email, password: hash});

    return {
      access_token:JWT.generateToken(user.id.toString(), this._config.secret, this._config.token_ttl),
      refresh_token: JWT.generateToken(user.id.toString(), this._config.secret, this._config.refresh_ttl),
    }
  }
}