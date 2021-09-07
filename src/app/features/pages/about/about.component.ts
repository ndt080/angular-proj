import { Component, OnInit } from '@angular/core';

import {NotificationService} from "../../../core/services/notification.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-about',
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="layout">
      {{user | json}}
    </div>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  user = {}
  constructor(private auth: AuthService, private notify: NotificationService) { }

  ngOnInit(): void {
    this.auth.userInfo().subscribe(res => this.user = res)
  }



}
