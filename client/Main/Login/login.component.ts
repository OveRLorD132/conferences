import {Component, EventEmitter, Input, Output} from "@angular/core";
import {global} from "../../../global";
import Login = global.Login;
import {OverlayType} from "../types/enum";
import Register = global.Register;

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  @Output() public register = new EventEmitter<Register>();
  @Output() public login = new EventEmitter<Login>();
  @Output() public close = new EventEmitter<void>();

  public overlayType: OverlayType = OverlayType.Login;

  public username: string = '';
  public email: string = '';
  public password: string = '';

  public closeDialog() {
    this.close.emit();
  }
  public endInput(): void {
    if(this.overlayType === OverlayType.Login) {this._userLogin(); return;}
    if(this.overlayType === OverlayType.Registration) {this._createProfile(); return;}
  }
  private _userLogin(): void {
    this.login.emit({
      email: this.email,
      password: this.password
    })
  }
  private _createProfile(): void {
    this.register.emit({
      username: this.username,
      email: this.email,
      password: this.password
    })
  }

  public swapOverlay(): void {
    if(this.overlayType === OverlayType.Login) {this.overlayType = OverlayType.Registration;return;}
    if(this.overlayType === OverlayType.Registration) {this.overlayType = OverlayType.Login;return;}
  }

  protected readonly OverlayType = OverlayType;
}