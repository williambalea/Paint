import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CommunicationsService } from './communications.service';

describe('CommunicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: CommunicationsService = TestBed.get(CommunicationsService);
    expect(service).toBeTruthy();
  });
});
