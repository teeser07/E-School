import { TestBed } from '@angular/core/testing';

import { OnlineClassService } from './online-class.service';

describe('OnlineClassService', () => {
  let service: OnlineClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
