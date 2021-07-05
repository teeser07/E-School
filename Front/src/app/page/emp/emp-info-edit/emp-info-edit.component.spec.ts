import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInfoEditComponent } from './emp-info-edit.component';

describe('EmpInfoEditComponent', () => {
  let component: EmpInfoEditComponent;
  let fixture: ComponentFixture<EmpInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
