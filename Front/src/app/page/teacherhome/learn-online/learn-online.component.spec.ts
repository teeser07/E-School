import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnOnlineComponent } from './learn-online.component';

describe('LearnOnlineComponent', () => {
  let component: LearnOnlineComponent;
  let fixture: ComponentFixture<LearnOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
