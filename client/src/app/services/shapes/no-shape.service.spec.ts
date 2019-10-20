import { TestBed } from '@angular/core/testing';

import { NoShapeService } from './no-shape.service';

describe('NoShapeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoShapeService = TestBed.get(NoShapeService);
    expect(service).toBeTruthy();
  });
});
