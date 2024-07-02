import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgIf
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule {}