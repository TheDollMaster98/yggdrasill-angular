import { TestBed } from '@angular/core/testing';

import { AuthReworkService } from './auth-rework.service';

describe('AuthReworkService', () => {
  let service: AuthReworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthReworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
