import { TestBed } from '@angular/core/testing';

import { UnsubscribeService } from './unsubscribe.service';

describe('UnsubscribeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnsubscribeService = TestBed.get(UnsubscribeService);
    expect(service).toBeTruthy();
  });
});
