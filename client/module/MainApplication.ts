import {IApiInterface, IMainApplication, IUser} from "../types/interfaces";
import type {global} from "../../global";
type Profile = global.Profile;
import {ApiInterface} from "./ApiInterface";
import {LoginType} from "../types/enum";
import type {AxiosError} from "axios";

export default class MainApplication implements IMainApplication{
  private _user?: IUser;

  public get user(): IUser | undefined {
    return this._user;
  }

  private readonly _client: IApiInterface;

  public get api(): IApiInterface {
    return this._client;
  }

  constructor() {
    this._client = new ApiInterface();
  }
  public async login(): Promise<void> {
    if(this._client.loginState === 'login-fail') {
      localStorage.removeItem('conf_tokens');
      return;
    }

    try {
      this._user = await this._client.getUser();
    } catch(err) {
      if (((err as AxiosError).response!.data! as { error: string, message: string }).message === 'Token Expired') {
        try {
          const tokens = await this._client.refresh();
          this._user = await this._client.getUser();
          localStorage.setItem('conf_tokens', JSON.stringify(tokens));
        } catch {
          console.log('remove');
          localStorage.removeItem('conf_tokens');
        }
      } else localStorage.removeItem('conf_tokens');
    }
  }
}