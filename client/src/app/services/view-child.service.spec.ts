import { TestBed } from '@angular/core/testing';

import { ViewChildService } from './view-child.service';

describe('ViewChildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewChildService = TestBed.get(ViewChildService);
    expect(service).toBeTruthy();
  });
});
