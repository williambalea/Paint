import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OUTLINE_TYPE } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { EllipseService } from './ellipse.service';

class RendererMock {
  createElement(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  getMouse(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  shiftPressed: boolean;

  getFillColor(): void {return; }
  getStrokeColor(): void {return; }
  addColorsToLastUsed(): void {return;}
}


describe('EllipseService', () => {
  let service: EllipseService;
  let colorService: ColorService;
  // tslint:disable-next-line: prefer-const
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      EllipseService,
      { provide: InputService, useClass: InputServiceMock },
      { provide: ColorService, useClass: ColorServiceMock },
      {provide: Renderer2, useClass: RendererMock},
    ],
  }).compileComponents();
  service = TestBed.get(EllipseService);
  colorService = TestBed.get(ColorService);
  inputService = TestBed.get(InputService);
  renderer = TestBed.get(Renderer2);

});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set a numeral stroke width value', () => {
    expect(service.strokeWidth).toEqual(jasmine.any(Number));
  });
  it('should set a string fill value', () => {
    expect(service.fill).toEqual(jasmine.any(String));
  });
  it('should set a string stroke value', () => {
    expect(service.stroke).toEqual(jasmine.any(String));
  });
  it('should set a bordered and filled type', () => {
    expect(service.ellipseType).toEqual(OUTLINE_TYPE.borderedAndFilled);
  });
  it('should set a true fillEnable value', () => {
    expect(service.fillEnable).toEqual(true);
  });
  it('should set a true strokeEnable value', () => {
    expect(service.strokeEnable).toEqual(true);
  });
  it('reset() should set attributes to 0', () => {
    service.reset();
    expect(service.x).toEqual(0);
    expect(service.y).toEqual(0);
    expect(service.xray).toEqual(0);
    expect(service.yray).toEqual(0);
    expect(service.active).toEqual(false);
  });
  it('should call onMouseDown() upon mouse being clicked', () => {
    service.active = false;
    const fillColorSpy = spyOn(colorService, 'getFillColor');
    const strokeColorSpy = spyOn(colorService, 'getStrokeColor');
    const setOriginSpy = spyOn(service, 'setOrigin');
    const setEllipseSpy = spyOn(service, 'setEllipseType');
    const createElSpy = spyOn(renderer, 'createElement');

    service.onMouseDown();

    expect(fillColorSpy).toHaveBeenCalled();
    expect(strokeColorSpy).toHaveBeenCalled();
    expect(setOriginSpy).toHaveBeenCalled();
    expect(setEllipseSpy).toHaveBeenCalled();
    expect(service.active).toEqual(true);
    expect(createElSpy).toHaveBeenCalled();
  });

  it('should call setCircleOffset when mouse moving and shift is pressed', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse');
    const setCircleOffsetSpy = spyOn(service, 'setCircleOffset');
    const drawSpy = spyOn(service, 'draw');
    service.active = true;
    inputService.shiftPressed = true;

    service.onMouseMove();

    expect(getMouseSpy).toHaveBeenCalled();
    expect(setCircleOffsetSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should call setEllipseOffset when mouse moving and shift is not pressed', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse');
    const setEllipseOffsetSpy = spyOn(service, 'setEllipseOffset');
    const drawSpy = spyOn(service, 'draw');
    service.active = true;
    inputService.shiftPressed = false;

    service.onMouseMove();

    expect(getMouseSpy).toHaveBeenCalled();
    expect(setEllipseOffsetSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should not draw if mouse is not active onMouseMove', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse');
    const drawSpy = spyOn(service, 'draw');
    service.active = false;
    service.onMouseMove();

    expect(getMouseSpy).toHaveBeenCalled();
    expect(drawSpy).not.toHaveBeenCalled();
  });

  it('Should call reset() and add last used colors to colorService when Mouse Up', () => {
    const resetSpy = spyOn(service, 'reset');
    const addColorsSpy = spyOn(colorService, 'addColorsToLastUsed');
    service.onMouseUp();

    expect(resetSpy).toHaveBeenCalled();
    expect(addColorsSpy).toHaveBeenCalled();
  });

});
