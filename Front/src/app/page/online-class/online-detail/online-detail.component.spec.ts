import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDetailComponent } from './online-detail.component';

describe('OnlineDetailComponent', () => {
  let component: OnlineDetailComponent;
  let fixture: ComponentFixture<OnlineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
