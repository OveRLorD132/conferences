import {global} from "../../global";
import Profile = global.Profile;
import Login = global.Login;
import Tokens = global.Tokens;

export interface IMainApplication {
  user?: Profile

  api: IApiInterface
}

export interface IApiInterface {
  login(profile: Login): Promise<Tokens>
}