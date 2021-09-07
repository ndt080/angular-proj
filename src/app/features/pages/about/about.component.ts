import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

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

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.userInfo().subscribe(res => this.user = res)
  }
}
