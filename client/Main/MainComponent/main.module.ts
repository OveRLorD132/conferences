import { NgModule } from '@angular/core';
import {MainComponent} from "./main.component";
import {BrowserModule} from "@angular/platform-browser";
import {MainRoutingModule} from "./main-routing-module";
import {LoginModule} from "../Login/login.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MainRoutingModule,
    LoginModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }