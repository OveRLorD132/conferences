import { NgModule } from '@angular/core';
import {MainComponent} from "./main.component";
import {BrowserModule} from "@angular/platform-browser";
import {MainRoutingModule} from "./main-routing-module";
import {LoginModule} from "../Login/login.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    LoginModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }