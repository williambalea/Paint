import { TestBed } from '@angular/core/testing';
import { OUTLINE_TYPE } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { EllipseService } from './ellipse.service';

describe('EllipseService', () => {
  let service: EllipseService;
  let colorService: ColorService;
  // tslint:disable-next-line: prefer-const
  let inputService: InputService;

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      EllipseService,
      ColorService,
      InputService,
    ],
  }).compileComponents();
  service = TestBed.get(EllipseService);
  colorService = TestBed.get(ColorService);
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
    const fillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const strokeColorSpy = spyOn(colorService, 'getStrokeColor').and.callThrough();
    const setOriginSpy = spyOn(service, 'setOrigin').and.callThrough();
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const setEllipseSpy = spyOn(service, 'setEllipseType').and.callThrough();

    service.onMouseDown();

    expect(fillColorSpy).toHaveBeenCalled();
    expect(strokeColorSpy).toHaveBeenCalled();
    expect(setOriginSpy).toHaveBeenCalled();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(setEllipseSpy).toHaveBeenCalled();

    expect(service.active).toEqual(true);
    expect(service.fill).toEqual(jasmine.any(String));
    expect(service.stroke).toEqual(jasmine.any(String));
    expect(service.fill).toEqual(jasmine.any(String));

    // verify render.createElement()

    expect(service.ellipse).not.toBeNull();
  });
  it('should call onMouseMouse() upon mouse being moved', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const setCircleOffsetSpy = spyOn(service, 'setCircleOffset').and.callThrough();
    const setEllipseSpy = spyOn(service, 'setEllipseOffset').and.callThrough();
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.onMouseMove();

    expect(getMouseSpy).toHaveBeenCalled();

    service.active = true;
    inputService.shiftPressed = true;

    if (service.active) {
      expect(drawSpy).toHaveBeenCalled();
      if (inputService.shiftPressed) {
        expect(setCircleOffsetSpy).toHaveBeenCalled();
      } else {
        expect(setEllipseSpy).toHaveBeenCalled();
      }
    }
  });
  it('Should call onMouseUp() upon releasing mouse button', () => {
    const resetSpy = spyOn(service, 'reset').and.callThrough();
    const addColorsSpy = spyOn(colorService, 'addColorsToLastUsed').and.callThrough();
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const getStrokeColorSpy = spyOn(colorService, 'getStrokeColor').and.callThrough();

    service.onMouseUp();

    expect(resetSpy).toHaveBeenCalled();
    expect(addColorsSpy).toHaveBeenCalled();
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(getStrokeColorSpy).toHaveBeenCalled();
  });

});
