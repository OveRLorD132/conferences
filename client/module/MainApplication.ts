import {IApiInterface, IMainApplication} from "../types/interfaces";
import {global} from "../../global";
import Profile = global.Profile;
import {ApiInterface} from "./ApiInterface";

export default class MainApplication implements IMainApplication{
  private _user?: Profile;

  public get user(): Profile | undefined {
    return this._user;
  }

  private readonly _client: IApiInterface;

  public get api(): IApiInterface {
    return this._client;
  }

  constructor() {
    this._client = new ApiInterface();
  }
}