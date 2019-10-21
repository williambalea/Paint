import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { RectangleService } from './rectangle.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  // setAttribute(): void {return; }
}
// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  // getFillColor(): void {return; }
  // addColorsToLastUsed(): void {return; }
  getFillColor(): void {return; }
  getStrokeColor(): void {return; }
  createElement(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('RectangleService', () => {
  let service: RectangleService;
  let colorService: ColorService;
  // let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RectangleService,
        ColorService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(RectangleService);
    colorService = TestBed.get(ColorService);
    // inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset attributs', () => {
    service.x = 1;
    service.y = 2;
    service.width = 3;
    service.height = 4;
    service.active = true;
    service.reset();
    expect(service.x).toEqual(0);
    expect(service.y).toEqual(0);
    expect(service.width).toEqual(0);
    expect(service.height).toEqual(0);
    expect(service.active).toBeFalsy();
  });

  it ('should excute on mouse down', () => {
    service.active = false;
    const spyOnGetFillCollor = spyOn(colorService, 'getFillColor');
    const spyOnGetStrokeColor = spyOn(colorService, 'getStrokeColor');
    const spyOnSetOrigin = spyOn(service, 'setOrigin');
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    const spyOnSetRectangleType = spyOn(service, 'setRectangleType');
    service.onMouseDown();
    expect(spyOnGetFillCollor).toHaveBeenCalled();
    expect(spyOnGetStrokeColor).toHaveBeenCalled();
    expect(spyOnSetOrigin).toHaveBeenCalled();
    expect(spyOnCreateElement).toHaveBeenCalled();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnSetRectangleType).toHaveBeenCalled();
  });

});
