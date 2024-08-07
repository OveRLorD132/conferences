import type {global} from "../../global";
type Profile = global.Profile;
type Tokens = global.Tokens;

export default class User {
  public info: Profile;
  public tokens: Tokens;

  constructor(profile: Profile, tokens: Tokens) {
    this.info = profile
    this.tokens = tokens;
  }
}