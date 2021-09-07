import {Component} from '@angular/core';

@Component({
  selector: 'lifecycle-hooks',
  template: `
    <div>
      <div class="btn__group">
        <input type="button" class="btn" (click)="this.incrementCounter()" value="Update Counter"/>
        <input type="button" class="btn" (click)="showChild = !showChild" value="Show/hide child component"/>
      </div>
      <lifecycle-hooks-child [counter]="this.counter" *ngIf="showChild"></lifecycle-hooks-child>
    </div>
  `,
  styleUrls: ['./lifecycle-hooks.component.css']
})
export class LifecycleHooksComponent {
  counter = 0;
  showChild: boolean = true

  incrementCounter() {
    this.counter += 1;
  }

}
