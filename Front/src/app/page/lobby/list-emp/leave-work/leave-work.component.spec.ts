import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveWorkComponent } from './leave-work.component';

describe('LeaveWorkComponent', () => {
  let component: LeaveWorkComponent;
  let fixture: ComponentFixture<LeaveWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
