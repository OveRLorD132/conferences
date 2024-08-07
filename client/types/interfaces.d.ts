import {global} from "../../global";
import Profile = global.Profile;
import Login = global.Login;
import Tokens = global.Tokens;
import Register = global.Register;
import CallCreated = global.CallCreated;
import {CallRaw} from "../../server/module/types";
import {LoginState} from "./enum";

export interface IMainApplication {
  user?: IUser
  api: IApiInterface

  login(): Promise<void>
}

export interface IApiInterface {
  loginState: LoginState

  login(profile: Login): Promise<Tokens>
  register(user: Register): Promise<Tokens>
  getUser(): Promise<IUser | undefined>
  logout(): void
  refresh(): Promise<Tokens>
}

export interface ICall {
  info: CallRaw
}

export interface ICallApplication {
  call: ICall
}

export interface IConferencesApi {
  tokens?: Tokens

  getCalls(): Promise<CallRaw[]>
  addCall(call: CallCreated): Promise<CallRaw>
}

export interface IConferences {
  api: IConferencesApi
  list?: CallRaw[]

  setUser(user: IUser): void
  addCall(call: CallCreated): Promise<CallRaw>
}

export interface IUser {
  info: Profile,
  tokens: Tokens
}