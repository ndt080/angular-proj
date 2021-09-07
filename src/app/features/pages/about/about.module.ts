import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {NavBarModule} from "../../../shared/components/nav-bar/nav-bar.module";

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    NavBarModule,
  ],
})
export class AboutModule {
}
