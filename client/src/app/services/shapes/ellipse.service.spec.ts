import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { COLORS, OUTLINE_TYPE } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { EllipseService } from './ellipse.service';

class RendererMock {
  createElement(): void {return; }
  setAttribute(): void {return; }
  setStyle(): void {return; }
}

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

  // NATIVEELEMENT EROR
  // it('should call onMouseDown() upon mouse being clicked', () => {
  //   service.active = false;
  //   const fillColorSpy = spyOn(colorService, 'getFillColor');
  //   const strokeColorSpy = spyOn(colorService, 'getStrokeColor');
  //   const setOriginSpy = spyOn(service, 'setOrigin');
  //   const setEllipseSpy = spyOn(service, 'setEllipseBorderType');
  //   const createElSpy = spyOn(renderer, 'createElement');

  //   service.onMouseDown();

  //   expect(fillColorSpy).toHaveBeenCalled();
  //   expect(strokeColorSpy).toHaveBeenCalled();
  //   expect(setOriginSpy).toHaveBeenCalled();
  //   expect(setEllipseSpy).toHaveBeenCalled();
  //   expect(service.active).toEqual(true);
  //   expect(createElSpy).toHaveBeenCalled();
  // });

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

  it('Should not remove any filling color fillEnable and strokeEnable are true', () => {
    const removeColorSpy = spyOn(service, 'removeColor');
    service.fillEnable = true;
    service.strokeEnable = true;

    service.setEllipseBorderType();

    expect(removeColorSpy).toHaveBeenCalledTimes(0);
  });

  it('Should remove filling color fillEnable is false', () => {
    const removeColorSpy = spyOn(service, 'removeColor');
    service.fillEnable = false;
    service.strokeEnable = true;

    service.setEllipseBorderType();

    expect(removeColorSpy).toHaveBeenCalledTimes(1);
  });

  it('Should remove both color fillEnable and strokeEnable are both false', () => {
    const removeColorSpy = spyOn(service, 'removeColor');
    service.fillEnable = false;
    service.strokeEnable = false;

    service.setEllipseBorderType();

    expect(removeColorSpy).toHaveBeenCalledTimes(2);
  });

  it('Should remove color by setting A to 0', () => {
    let blueColor: string = COLORS.greenRBGA;
    blueColor = service.removeColor(blueColor);
    expect(blueColor).toEqual('rgba(0, 255, 0,0)');
  });

  it('Should draw', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute');
    const setStyleSpy = spyOn(renderer, 'setStyle');
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalledTimes(4);
    expect(setStyleSpy).toHaveBeenCalledTimes(3);
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
    const setStyleSpy = spyOn(renderer, 'setStyle');
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalledTimes(4);
    expect(setStyleSpy).toHaveBeenCalledTimes(3);
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
