import {Component} from '@angular/core';
import {Visibility} from "../types/enum";
import {global} from "../../../global";
import Login = global.Login;
import API from "../../module/API";
import Tokens = global.Tokens;
import User = global.User;
import Register = global.Register;

@Component({
  'selector': 'main',
  'templateUrl': 'main.component.html',
  'styleUrls': ['main.component.scss'],
})
export class MainComponent {
  public user?: User;
  public loginVisibility: Visibility = Visibility.Hidden;

  public showLogin(): void {
    this.loginVisibility = Visibility.Visible;
  }
  public closeLogin(): void {
    this.loginVisibility = Visibility.Hidden;
  }

  private ngOnInit(): void {
    const stored = localStorage.getItem('conf_tokens');
    if(!stored) return;
    try {
      const tokens: Tokens = JSON.parse(stored);

      API.getUser(tokens.access_token).then((user) => {
        this.user = user;
      }).catch(() => {
        localStorage.removeItem('conf_tokens');
      })
    } catch (err) {
      localStorage.removeItem('conf_tokens');
    }
  }

  public logout(): void {
    delete this.user;
    localStorage.removeItem('conf_tokens');
  }

  public async userLogin(user?: Login): Promise<void> {
    if(!user) return;

    const tokens: Tokens = await API.login(user);
    await this._authenticate(tokens);
  }

  public async createProfile(user?: Register): Promise<void> {
    if(!user) return;

    const tokens: Tokens = await API.register(user);
    await this._authenticate(tokens);
  }

  private async _authenticate(tokens: Tokens): Promise<void> {
    localStorage.setItem("conf_tokens", JSON.stringify(tokens));

    this.user = await API.getUser(tokens.access_token);
    this.loginVisibility = Visibility.Hidden;
  }

  protected readonly Visibility = Visibility;
}