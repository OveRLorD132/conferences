import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  @Output() public close = new EventEmitter();

  public closeDialog() {
    this.close.emit();
  }
}