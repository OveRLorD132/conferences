import {IApiInterface, IUser} from "../types/interfaces";
import type {global} from "../../global";
import axios, {AxiosHeaders} from "axios";
import {LoginState} from "../types/enum";
import host from "../host";
import User from "./User";
type Tokens = global.Tokens;
type Register = global.Register;

export class ApiInterface implements IApiInterface {
  public loginState: LoginState;
  private _tokens?: Tokens;

  constructor() {
    const stored = localStorage.getItem('conf_tokens');
    if(!stored) this.loginState = LoginState.Fail;
    else {
      try {
        this._tokens = JSON.parse(stored);
        this.loginState = LoginState.Success
      } catch (err) {
        this.loginState = LoginState.Fail;
      }
    }
  }

  public async login(profile: global.Login): Promise<Tokens> {
    const data = await axios.post(`${host}api/login`, profile);
    this._tokens = data.data.tokens;

    return data.data.tokens as Tokens;
  }

  public async register(user: Register): Promise<Tokens> {
    const data = await axios.post(`${host}api/registration`, user);
    this._tokens = data.data.tokens as Tokens;

    return data.data.tokens as Tokens;
  }

  public async getUser(): Promise<IUser | undefined> {
    if(!this._tokens) return;

    const data = await axios.get(`${host}api/user`, {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${this._tokens?.access_token}`
      })
    })

    return new User(data.data, this._tokens);
  }

  public logout(): void {
    this._tokens = undefined;
  }

  public async refresh(): Promise<Tokens> {
    const data = await axios.post(`${host}api/refresh`, {
      token: this._tokens?.refresh_token
    })

    this._tokens!.access_token = data.data.token;
    return data.data.tokens as Tokens;
  }
}