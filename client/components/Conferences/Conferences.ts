import {IConferences, IConferencesApi, IUser} from "../../types/interfaces";
import {CallRaw} from "../../../server/module/types";
import type {global} from "../../../global";
import ConferencesApi from "./ConferencesApi";
type CallCreated = global.CallCreated;

export default class Conferences implements IConferences {
  private _list?: CallRaw[];

  public get list(): CallRaw[] | undefined {
    return this._list;
  }

  private readonly _api: IConferencesApi;

  public get api(): IConferencesApi {
    return this._api;
  }

  constructor() {
    this._api = new ConferencesApi();
  }

  public setUser(user: IUser): void {
    this._api.tokens = user.tokens;

    this._api.getCalls().then((calls: CallRaw[]) => {
      this._list = calls;
    })
  }

  public async addCall(call: CallCreated): Promise<CallRaw> {
    const callRaw: CallRaw = await this._api.addCall(call);
    if(!this._list) this._list = [];
    this._list.push(callRaw);

    return callRaw;
  }
}