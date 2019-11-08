import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { COLORS, OUTLINE_TYPE } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { EllipseService } from './ellipse.service';

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  getMouse(): void {return ; }
}

// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  shiftPressed: boolean;

  getFillColor(): void {return; }
  getStrokeColor(): void {return; }
  addColorsToLastUsed(): void {return; }
}

describe('EllipseService', () => {
  let service: EllipseService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  let viewChildService: ViewChildService;

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      EllipseService,
      ViewChildService,
      Renderer2,
      { provide: InputService, useClass: InputServiceMock },
      { provide: ColorService, useClass: ColorServiceMock },
    ],
  }).compileComponents();
  viewChildService = TestBed.get(ViewChildService);
  service = TestBed.get(EllipseService);
  colorService = TestBed.get(ColorService);
  inputService = TestBed.get(InputService);
  rendererFactory = TestBed.get(RendererFactory2);
  renderer = rendererFactory.createRenderer(null, null);
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
    service.x = 1;
    service.y = 1;
    service.xray = 1;
    service.yray = 1;
    service.active = true;
    service.reset();

    expect(service.x).toEqual(0);
    expect(service.y).toEqual(0);
    expect(service.xray).toEqual(0);
    expect(service.yray).toEqual(0);
    expect(service.active).toEqual(false);
  });

  it('should not fill ellipse', () => {
    service.fillEnable = true;
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.setEllipseBorderType();
    expect(spyOnSetAttribute).not.toHaveBeenCalled();
  });

  it('should fill ellipse', () => {
    service.fillEnable = false;
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.setEllipseBorderType();
    expect(spyOnSetAttribute).toHaveBeenCalled();
  });

  it('should not put stroke on ellipse', () => {
    service.strokeEnable = true;
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.setEllipseBorderType();
    expect(spyOnSetAttribute).not.toHaveBeenCalled();
  });

  it('should put stroke on ellipse', () => {
    service.strokeEnable = false;
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.setEllipseBorderType();
    expect(spyOnSetAttribute).toHaveBeenCalled();
  });

  it('should call onMouseDown() upon mouse being clicked', () => {
    service.active = false;
    const createElSpy = spyOn(renderer, 'createElement').and.callThrough();
    const svg = renderer.createElement('ellipse', 'svg');
    viewChildService.canvas = new ElementRef(svg);
    const fillColorSpy = spyOn(colorService, 'getFillColor');
    const strokeColorSpy = spyOn(colorService, 'getStrokeColor');
    const setOriginSpy = spyOn(service, 'setOrigin');
    const setEllipseSpy = spyOn(service, 'setEllipseBorderType');

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

  it('Should set origin to mouse', () => {
    const mouse = {x: 1, y: 2};
    service.setOrigin(mouse);
    expect(service.x).toEqual(1);
    expect(service.y).toEqual(2);
  });

  it('Should draw', () => {
    const setAttributeSpy = spyOn(service, 'setAttribute');
    const setStyleSpy = spyOn(service, 'setStyle');
    const setsetEllipseBorderType = spyOn(service, 'setEllipseBorderType');
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
    expect(setsetEllipseBorderType).toHaveBeenCalled();
  });

  it('Should set Circle offset', () => {
    service.mouse = {x: 10, y: 4};
    service.origin = {x: 2, y: 20};
    service.setCircleOffset();
    expect(service.xray).toEqual(8);
    expect(service.yray).toEqual(8);
    expect(service.x).toEqual(10);
    expect(service.y).toEqual(12);
  });

  it('Should set Ellipse offset', () => {
    service.mouse = {x: 10, y: 4};
    service.origin = {x: 2, y: 20};
    service.setEllipseOffset();
    expect(service.xray).toEqual(4);
    expect(service.yray).toEqual(8);
    expect(service.x).toEqual(6);
    expect(service.y).toEqual(12);
  });

  it('Should draw', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute');
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalledTimes(7);
  });

  it('Should set up Bordered Ellipse', () => {
    service.strokeEnable = false;
    service.fillEnable = true;
    service.assignBorderedEllipse();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(false);
  });

  it('Should set up Filled Ellipse', () => {
    service.strokeEnable = true;
    service.fillEnable = false;
    service.assignFilledEllipse();
    expect(service.strokeEnable).toEqual(false);
    expect(service.fillEnable).toEqual(true);
  });

  it('Should set up Bordered and Filled Ellipse', () => {
    service.strokeEnable = false;
    service.fillEnable = false;
    service.assignBorderedAndFilledEllipse();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(true);
  });

  it('Should assign Ellipse type to bordered', () => {
    const assignBorderedEllipseSpy = spyOn(service, 'assignBorderedEllipse');
    const assignFilledEllipseSpy = spyOn(service, 'assignFilledEllipse');
    const assignBandFEllipseSpy = spyOn(service, 'assignBorderedAndFilledEllipse');
    service.ellipseType = OUTLINE_TYPE.bordered;
    service.assignEllipseType();
    expect(assignBorderedEllipseSpy).toHaveBeenCalled();
    expect(assignFilledEllipseSpy).not.toHaveBeenCalled();
    expect(assignBandFEllipseSpy).not.toHaveBeenCalled();
  });
  it('Should assign Ellipse type to filled', () => {
    const assignBorderedEllipseSpy = spyOn(service, 'assignBorderedEllipse');
    const assignFilledEllipseSpy = spyOn(service, 'assignFilledEllipse');
    const assignBandFEllipseSpy = spyOn(service, 'assignBorderedAndFilledEllipse');
    service.ellipseType = OUTLINE_TYPE.filled;
    service.assignEllipseType();
    expect(assignBorderedEllipseSpy).not.toHaveBeenCalled();
    expect(assignFilledEllipseSpy).toHaveBeenCalled();
    expect(assignBandFEllipseSpy).not.toHaveBeenCalled();
  });
  it('Should assign Ellipse type to bordered and filled', () => {
    const assignBorderedEllipseSpy = spyOn(service, 'assignBorderedEllipse');
    const assignFilledEllipseSpy = spyOn(service, 'assignFilledEllipse');
    const assignBandFEllipseSpy = spyOn(service, 'assignBorderedAndFilledEllipse');
    service.ellipseType = OUTLINE_TYPE.borderedAndFilled;
    service.assignEllipseType();
    expect(assignBorderedEllipseSpy).not.toHaveBeenCalled();
    expect(assignFilledEllipseSpy).not.toHaveBeenCalled();
    expect(assignBandFEllipseSpy).toHaveBeenCalled();
  });
  it('Should assign nothing to default', () => {
    const assignBorderedEllipseSpy = spyOn(service, 'assignBorderedEllipse');
    const assignFilledEllipseSpy = spyOn(service, 'assignFilledEllipse');
    const assignBandFEllipseSpy = spyOn(service, 'assignBorderedAndFilledEllipse');
    service.ellipseType = '';
    service.assignEllipseType();
    expect(assignBorderedEllipseSpy).not.toHaveBeenCalled();
    expect(assignFilledEllipseSpy).not.toHaveBeenCalled();
    expect(assignBandFEllipseSpy).not.toHaveBeenCalled();
  });

  it('Should change Primary Color from black to blue', () => {
    service.fill = COLORS.blackRGBA;
    const newColor: string = COLORS.blueRGBA;
    service.changePrimaryColor(newColor);
    expect(service.fill).toEqual(COLORS.blueRGBA);
  });

  it('Should change Secondary Color from black to blue', () => {
    service.stroke = COLORS.blackRGBA;
    const newColor: string = COLORS.blueRGBA;
    service.changeSecondaryColor(newColor);
    expect(service.stroke).toEqual(COLORS.blueRGBA);
  });

});
