import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { Renderer2 } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RectangleService } from './rectangle.service';

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
