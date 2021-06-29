import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStdComponent } from './list-std.component';

describe('ListStdComponent', () => {
  let component: ListStdComponent;
  let fixture: ComponentFixture<ListStdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
