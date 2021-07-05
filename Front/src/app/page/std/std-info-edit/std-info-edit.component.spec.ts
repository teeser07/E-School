import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdInfoEditComponent } from './std-info-edit.component';

describe('StdInfoEditComponent', () => {
  let component: StdInfoEditComponent;
  let fixture: ComponentFixture<StdInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
