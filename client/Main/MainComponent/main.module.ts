import { NgModule } from '@angular/core';
import {MainComponent} from "./main.component";
import {BrowserModule} from "@angular/platform-browser";
import {MainRoutingModule} from "./main-routing-module";
import {LoginModule} from "../Login/login.module";
import {CommonModule} from "@angular/common";
import {CallModule} from "../Call/call.module";
import {ConferencesModule} from "../Conferences/conferences.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MainRoutingModule,
    LoginModule,
    CallModule,
    ConferencesModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }