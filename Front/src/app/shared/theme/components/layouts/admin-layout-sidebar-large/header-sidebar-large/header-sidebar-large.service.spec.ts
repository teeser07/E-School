import { TestBed } from '@angular/core/testing';

import { HeaderSidebarLargeService } from './header-sidebar-large.service';

describe('HeaderSidebarLargeService', () => {
  let service: HeaderSidebarLargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderSidebarLargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
