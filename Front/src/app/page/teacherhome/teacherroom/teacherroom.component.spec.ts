import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherroomComponent } from './teacherroom.component';

describe('TeacherroomComponent', () => {
  let component: TeacherroomComponent;
  let fixture: ComponentFixture<TeacherroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
