import {ICall, ICallApplication} from "../../types/interfaces";
import axios from "axios";
import Call from "./Call";
import host from "../../host";

export default class CallApplication implements ICallApplication {
  private readonly _call: ICall;

  public get call(): ICall {
    return this._call;
  }

  private constructor(call: ICall) {
    this._call = call;
  }

  public static async create(id: string): Promise<ICallApplication> {
    const callRaw = await axios.get(`${host}api/calls/info`,
      {
        params: {id}
      });
    const call = new Call(callRaw.data);

    return new CallApplication(call);
  }
}