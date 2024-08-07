import type {global} from "../../global";
type Login = global.Login;
import axios, {AxiosHeaders} from "axios";
type Tokens = global.Tokens;
type User = global.User;
type Register = global.Register;
type CallCreated = global.CallCreated;
import type {CallRaw} from "../../server/module/types";
type Profile = global.Profile;

export default class API {
  public static async login(user: Login) {
    const data = await axios.post("http://localhost:3000/api/login", user);

    return data.data.tokens as Tokens;
  }
  public static async register(user: Register) {
    const data = await axios.post("http://localhost:3000/api/registration", user);

    return data.data.tokens as Tokens;
  }
  public static async getUser(token: string): Promise<Profile> {
    const data = await axios.get("http://localhost:3000/api/user", {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${token}`
      })
    });

    return data.data as User;
  }

  public static async addCall(call: CallCreated, token: string) {
    const data = await axios.post('http://localhost:3000/api/calls', call, {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${token}`
      })
    })

    return data.data as CallRaw
  }
  public static async getCalls(token: string) {
    const data = await axios.get("http://localhost:3000/api/calls/list", {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${token}`
      })
    })

    return data.data as CallRaw[]
  }
}