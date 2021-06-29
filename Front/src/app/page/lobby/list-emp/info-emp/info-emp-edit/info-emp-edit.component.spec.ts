import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEmpEditComponent } from './info-emp-edit.component';

describe('InfoEmpEditComponent', () => {
  let component: InfoEmpEditComponent;
  let fixture: ComponentFixture<InfoEmpEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEmpEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEmpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
