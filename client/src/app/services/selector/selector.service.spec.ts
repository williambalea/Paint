import { TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { InputService } from '../input.service';
import { RectangleService } from '../shapes/rectangle.service';
import { SelectorService } from './selector.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  // setAttribute(): void {return; }
}
// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  mouseButton: number;
  // backSpacePressed = false;
  // getMouse(): Point {return {x: 1, y: 2}; }
}
// tslint:disable-next-line:max-classes-per-file
class RectangleServiceMock {
  onMouseDown(): void {return; }
  onMouseMove(): void {return; }
}

describe('SelectorService', () => {
  let service: SelectorService;
  let rectangleService: RectangleService;
  let inputService: InputService;
  let renderer: Renderer2;

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
    rectangleService = TestBed.get(RectangleService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should react on mouse down', () => {
    const spyOnValidateSelectorIsSingle = spyOn(service, 'validateSelectorIsSingle');
    const spyOnValidateMouseButton = spyOn(service, 'validateMouseButton');
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.onMouseDown();
    expect(spyOnValidateSelectorIsSingle).toHaveBeenCalled();
    expect(spyOnSetStyle).toHaveBeenCalledTimes(5);
    expect(spyOnValidateMouseButton).toHaveBeenCalled();
  });

  it('should validate if selector is single', () => {
    service.selectorIsSingle = true;
    const spyOnOnMouseDown = spyOn(rectangleService, 'onMouseDown');
    service.validateSelectorIsSingle();
    expect(spyOnOnMouseDown).toHaveBeenCalled();
    expect(service.selectorIsSingle).toBeFalsy();
  });

  it('should validate mouse button', () => {
    inputService.mouseButton = 2;
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateMouseButton();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should react on mouse move', () => {
    const spyOnOnMouseMove = spyOn(rectangleService, 'onMouseMove');
    service.onMouseMove();
    expect(spyOnOnMouseMove).toHaveBeenCalled();
  });

  it('should react on mouse up', () => {
    service.selectorIsSingle = false;
    service.onMouseUp();
    expect(service.selectorIsSingle).toBeTruthy();
  });

  it('should return a rectangle', () => {
    const child = {getAttribute(): void { return; }};
    const spyOnGetAttribute = spyOn(child, 'getAttribute');
    service.returnRect(child as unknown as SVGGraphicsElement);
    expect(spyOnGetAttribute).toHaveBeenCalledTimes(4);
  });

  it('should return an ellipse', () => {
    const child = {getAttribute(): void { return; }};
    const spyOnGetAttribute = spyOn(child, 'getAttribute');
    service.returnEllipse(child as unknown as SVGGraphicsElement);
    expect(spyOnGetAttribute).toHaveBeenCalledTimes(4);
  });

  // it('should return a path', () => {
  //   const child: SVGGraphicsElement = renderer.createElement('path', 'svg');
  //   // const spyOnGetAttribute = spyOn(child, 'getAttribute');
  //   // service.returnPath(child as unknown as SVGGraphicsElement);
  //   const result = service.returnPath(child as unknown as SVGGraphicsElement);
  //   expect(result).toBeDefined();
  // });

  // it('should return image', () => {
  //   const child = {getBBox(): void { return; }};
  //   const spyOnGetBBox = spyOn(child, 'getBBox');
  //   service.returnImage(child as unknown as SVGGraphicsElement);
  //   expect(spyOnGetBBox).toHaveBeenCalledTimes(4);
  // });

});
