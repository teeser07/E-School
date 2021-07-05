import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomScoreComponent } from './classroom-score.component';

describe('ClassroomScoreComponent', () => {
  let component: ClassroomScoreComponent;
  let fixture: ComponentFixture<ClassroomScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
