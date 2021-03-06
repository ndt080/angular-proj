import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {GlobalGuard} from "../../../core/guards/global.guard";

const routes: Routes = [{
  path: '',
  component: AboutComponent,
  canActivate: [GlobalGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
