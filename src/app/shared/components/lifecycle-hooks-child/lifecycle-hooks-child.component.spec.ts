import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleHooksChildComponent } from './lifecycle-hooks-child.component';

describe('LifecycleHooksChildComponent', () => {
  let component: LifecycleHooksChildComponent;
  let fixture: ComponentFixture<LifecycleHooksChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifecycleHooksChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleHooksChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
