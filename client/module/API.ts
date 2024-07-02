import {global} from "../../global";
import Login = global.Login;
import axios, {AxiosHeaders} from "axios";
import Tokens = global.Tokens;
import User = global.User;
import Register = global.Register;

export default class API {
  public static async login(user: Login) {
    const data = await axios.post("http://localhost:3000/api/login", user);

    return data.data.tokens as Tokens;
  }
  public static async register(user: Register) {
    const data = await axios.post("http://localhost:3000/api/registration", user);

    return data.data.tokens as Tokens;
  }
  public static async getUser(token: string): Promise<User> {
    const data = await axios.get("http://localhost:3000/api/user", {
      headers: new AxiosHeaders({
        'Authorization': `Bearer ${token}`
      })
    });

    return data.data as User;
  }
}