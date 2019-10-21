import { TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { InputService } from '../input.service';
import { RectangleService } from '../shapes/rectangle.service';
import { SelectorService } from './selector.service';

class RendererMock {
  // createElement(): void {return; }
  // setStyle(): void {return; }
  // setAttribute(): void {return; }
}
// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  // getMouse(): Point {return {x: 1, y: 2}; }
}
// tslint:disable-next-line:max-classes-per-file
class RectangleServiceMock {
  //fonctions ici
}

describe('SelectorService', () => {
  let service: SelectorService;
  // let rectangleService: RectangleService;
  // let inputService: InputService;
  // let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectorService,
        RectangleService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: RectangleService, useClass: RectangleServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(SelectorService);
    // rectangleService = TestBed.get(RectangleService);
    // inputService = TestBed.get(InputService);
    // renderer = TestBed.get(Renderer2);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
