import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSuccessComponent } from './check-success.component';

describe('CheckSuccessComponent', () => {
  let component: CheckSuccessComponent;
  let fixture: ComponentFixture<CheckSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
