import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStdEditComponent } from './info-std-edit.component';

describe('InfoStdEditComponent', () => {
  let component: InfoStdEditComponent;
  let fixture: ComponentFixture<InfoStdEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStdEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
