import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IncludingBoxService } from './including-box.service';

describe('IncludingBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Renderer2,
    ],
  }));

  it('should be created', () => {
    const service: IncludingBoxService = TestBed.get(IncludingBoxService);
    expect(service).toBeTruthy();
  });
});