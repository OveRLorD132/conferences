import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  bootstrap: [LoginComponent]
})
export class LoginModule {}