import {IApiInterface} from "../types/interfaces";
import {global} from "../../global";
import Tokens = global.Tokens;
import axios from "axios";

export class ApiInterface implements IApiInterface {
  private _tokens?: Tokens;

  public async login(profile: global.Login): Promise<Tokens> {
    const data = await axios.post("http://localhost:3000/api/login", profile);
    this._tokens = data.data.tokens;

    return data.data.tokens as Tokens;
  }
}