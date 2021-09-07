import {Component} from '@angular/core';
import {INavigation} from "../../../core/models/navigation";
import {AuthService} from "../../../features/auth/services/auth.service";

@Component({
  selector: 'app-nav-bar',
  template: `
    <div class="nav">
      <ul class="nav__list">
        <li class="nav__item" *ngFor="let item of navItems"><a routerLink="{{item.link}}">{{item.header}}</a></li>
        <li class="nav__item"><a href="#" (click)="logout()">Exit app</a></li>
      </ul>
    </div>
  `,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  readonly navItems: Array<INavigation> = [
    {header: 'Home', link: '/'},
    {header: 'About', link: '/about'}
  ];

  constructor(private auth: AuthService) {
  }

  logout(){
    this.auth.logout()
  }
}
