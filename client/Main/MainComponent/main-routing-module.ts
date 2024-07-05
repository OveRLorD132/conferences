import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {CallComponent} from "../Call/call.component";

const routes: Routes = [
  { path: 'calls/:id', component: CallComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}