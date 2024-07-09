import {NgModule} from "@angular/core";
import {ConferencesComponent} from "./conferences.component";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ConferencesComponent],
  exports: [ConferencesComponent],
  imports: [
    NgIf,
    NgClass,
    FormsModule
  ],
  bootstrap: [ConferencesComponent]
})
export class ConferencesModule {}