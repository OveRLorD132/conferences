import {NgModule} from "@angular/core";
import {CallComponent} from "./call.component";
import {CommonModule, NgFor} from "@angular/common";

@NgModule({
  declarations: [CallComponent],
  imports: [
    CommonModule,
    NgFor,
  ],
  exports: [CallComponent],
  bootstrap: [CallComponent]
})
export class CallModule {}