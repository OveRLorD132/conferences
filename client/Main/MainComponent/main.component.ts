import {Component} from '@angular/core';
import {User} from "../types/main";
import {Visibility} from "../types/enum";

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

  protected readonly Visibility = Visibility;
}