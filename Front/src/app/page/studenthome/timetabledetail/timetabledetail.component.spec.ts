import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetabledetailComponent } from './timetabledetail.component';

describe('TimetabledetailComponent', () => {
  let component: TimetabledetailComponent;
  let fixture: ComponentFixture<TimetabledetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetabledetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetabledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
