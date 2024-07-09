import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {CallComponent} from "../Call/call.component";
import {ConferencesComponent} from "../Conferences/conferences.component";

const routes: Routes = [
  { path: 'calls/:id', component: CallComponent},
  { path: 'calls', component: ConferencesComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}