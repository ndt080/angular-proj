import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {NavBarModule} from "../../../shared/components/nav-bar/nav-bar.module";
import {LifecycleHooksComponent} from "../../../shared/components/lifecycle-hooks/lifecycle-hooks.component";
import {LifecycleHooksChildComponent} from "../../../shared/components/lifecycle-hooks-child/lifecycle-hooks-child.component";


@NgModule({
  declarations: [
    HomeComponent,
    LifecycleHooksComponent,
    LifecycleHooksChildComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavBarModule
  ]
})
export class HomeModule {
}
