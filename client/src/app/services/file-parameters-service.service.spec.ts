import { TestBed } from '@angular/core/testing';

import { FileParametersServiceService } from './file-parameters-service.service';

describe('FileParametersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileParametersServiceService = TestBed.get(FileParametersServiceService);
    expect(service).toBeTruthy();
  });
});
