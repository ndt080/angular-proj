import {
  Component,Input,
  ChangeDetectionStrategy, SimpleChanges,
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  DoCheck, OnChanges, OnDestroy, OnInit,
} from '@angular/core';
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'lifecycle-hooks-child',
  template: `
    <div>
      <h3>{{this.executeFunction()}}</h3>
      <h1>Counter Value: {{this.counter}}</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./lifecycle-hooks-child.component.css']
})
export class LifecycleHooksChildComponent implements OnChanges, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnInit, DoCheck, OnDestroy {

  @Input() counter: number = 0

  constructor(private notify: NotificationService) {
  }

  executeFunction() {
    console.log("App Rendered. ", "DetectionStrategy: Default")
    return "This is Child Component"
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked')
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
    this.notify.showInfo('ngAfterViewInit', '')
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit')
    this.notify.showInfo('ngAfterContentInit', '')
  }

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges')
    this.notify.showInfo('ngOnChanges', '')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
    this.notify.showInfo('ngOnDestroy', '')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.notify.showInfo('ngOnInit', '')
  }
}
