import {CallRaw, CallUser, ICall} from "../types";

export default class Call implements ICall {
  public info: CallRaw;
  public users: CallUser[] = [];

  private _current_id = 1;

  constructor(call: CallRaw) {
    this.info = call;
  }

  public addUser(socket_id: string): CallUser {
    const newUser = {
      id: this._current_id.toString(),
      socket_id
    }

    this.users.push(newUser);
    this._current_id++;

    return newUser;
  }

  public getUser(id: string): CallUser | undefined {
    for(let user of this.users) {
      if(user.id === id) return user;
    }
  }
}