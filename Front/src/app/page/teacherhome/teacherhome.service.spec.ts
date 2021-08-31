import { TestBed } from '@angular/core/testing';

import { TeacherhomeService } from './teacherhome.service';

describe('TeacherhomeService', () => {
  let service: TeacherhomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherhomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
