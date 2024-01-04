import { TestBed } from '@angular/core/testing';

import { FirestoreAPIService } from './firestore-api.service';

describe('FirestoreAPIService', () => {
  let service: FirestoreAPIService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
