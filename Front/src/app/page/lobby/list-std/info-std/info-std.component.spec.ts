import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStdComponent } from './info-std.component';

describe('InfoStdComponent', () => {
  let component: InfoStdComponent;
  let fixture: ComponentFixture<InfoStdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
