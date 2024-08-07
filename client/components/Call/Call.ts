import {ICall} from "../../types/interfaces";
import {CallRaw} from "../../../server/module/types";

export default class Call implements ICall {
  private readonly _info: CallRaw;

  public get info(): CallRaw {
    return this._info;
  }

  constructor(infoObj: CallRaw) {
    this._info = infoObj;
  }
}