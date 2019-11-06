import { TestBed } from '@angular/core/testing';

import { CursorService } from './cursor.service';

describe('CursorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursorService = TestBed.get(CursorService);
    expect(service).toBeTruthy();
  });
});
