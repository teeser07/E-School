import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetimetableComponent } from './createtimetable.component';

describe('CreatetimetableComponent', () => {
  let component: CreatetimetableComponent;
  let fixture: ComponentFixture<CreatetimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatetimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
