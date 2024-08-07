import {IConferencesApi} from "../../types/interfaces";
import {CallRaw} from "../../../server/module/types";
import axios, {AxiosHeaders} from "axios";
import host from "../../host";
import type {global} from "../../../global";
type Tokens = global.Tokens;
type CallCreated = global.CallCreated;

export default class ConferencesApi implements IConferencesApi {
  public tokens?: Tokens;

  public async addCall(call: CallCreated): Promise<CallRaw> {
    const data = await axios.post(`${host}api/calls`, call, {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${this.tokens?.access_token}`
      })
    })

    return data.data as CallRaw;
  }

  public async getCalls(): Promise<CallRaw[]> {
    const data = await axios.get(`${host}api/calls/list`, {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${this.tokens?.access_token}`
      }),
    })

    return data.data as CallRaw[];
  }
}