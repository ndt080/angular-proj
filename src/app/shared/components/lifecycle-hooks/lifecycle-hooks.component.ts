import {Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-lifecycle-hooks',
  template: `
    <div>
      <div class="btn__group">
        <input type="button" class="btn" (click)="this.updateCounter()" value="Update Counter"/>
        <input type="button" class="btn" (click)="showChild = !showChild" value="Show/hide child component"/>
      </div>
      <app-lifecycle-hooks-child [counter]="this.counter" *ngIf="showChild"></app-lifecycle-hooks-child>
    </div>
  `,
  styleUrls: ['./lifecycle-hooks.component.css']
})
export class LifecycleHooksComponent {
  counter = 0;
  showChild: boolean = true

  updateCounter() {
    this.counter += 1;
  }

}
