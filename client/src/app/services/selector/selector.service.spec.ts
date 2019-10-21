import { TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { SelectorService } from './selector.service';

describe('SelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Renderer2,
    ],
  }));

  it('should be created', () => {
    const service: SelectorService = TestBed.get(SelectorService);
    expect(service).toBeTruthy();
  });
});
