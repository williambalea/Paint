import { TestBed, async } from '@angular/core/testing';

import { RectangleService } from './rectangle.service';
import { Renderer2 } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('RectangleService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [Renderer2],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();

  }));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RectangleService = TestBed.get(RectangleService);
    expect(service).toBeTruthy();
  });
});
