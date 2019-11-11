import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { RectangleService } from './rectangle.service';

class ColorServiceMock {
  // getFillColor(): void {return; }
  addColorsToLastUsed(): void {return; }
  getFillColor(): void {return; }
  getStrokeColor(): void {return; }
  createElement(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  shiftPressed: boolean;
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('RectangleService', () => {
  let service: RectangleService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RectangleService,
        ColorService,
        InputService,
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(RectangleService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);  });

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

  // NativeElement eror
  // it ('should excute on mouse down', () => {
  //   const spyOnGetFillCollor = spyOn(colorService, 'getFillColor');
  //   const spyOnGetStrokeColor = spyOn(colorService, 'getStrokeColor');
  //   const spyOnSetOrigin = spyOn(service, 'setOrigin');
  //   const spyOnCreateElement = spyOn(renderer, 'createElement');
  //   const spyOnSetStyle = spyOn(service, 'setStyle');
  //   const spyOnSetRectangleType = spyOn(service, 'setRectangleType');
  //   const spyAppendChild = spyOn(renderer, 'setStyle');
  //   service.onMouseDown();
  //   expect(service.active).toBeTruthy();
  //   expect(spyOnGetFillCollor).toHaveBeenCalled();
  //   expect(spyOnGetStrokeColor).toHaveBeenCalled();
  //   expect(spyOnSetOrigin).toHaveBeenCalled();
  //   expect(spyOnCreateElement).toHaveBeenCalled();
  //   expect(spyOnSetStyle).toHaveBeenCalled();
  //   expect(spyOnSetRectangleType).toHaveBeenCalled();
  //   expect(spyAppendChild).toHaveBeenCalled();
  // });

  it('should set style', () => {
    const spyOnsetAttribute = spyOn(renderer, 'setAttribute');
    service.setStyle();
    expect(spyOnsetAttribute).toHaveBeenCalled();
  });

  it ('should react on mouse move', () => {
    const spyOnGetMouse = spyOn(inputService, 'getMouse');
    const spyOnSetSquareOffset = spyOn(service, 'setSquareOffset');
    const spyOnRetRectangleOffset = spyOn(service, 'setRectangleOffset');
    const SpyOnDraw = spyOn(service, 'draw');
    service.active = true;
    service.onMouseMove();
    expect(spyOnGetMouse).toHaveBeenCalled();
    if (inputService.shiftPressed) {
      expect(spyOnSetSquareOffset).toHaveBeenCalled();
    } else {
      expect(spyOnRetRectangleOffset).toHaveBeenCalled();
    }
    expect(SpyOnDraw).toHaveBeenCalled();
  });

  it ('should call setSquareOffset on mouse move', () => {
    const spyOnGetMouse = spyOn(inputService, 'getMouse');
    const spyOnSetSquareOffset = spyOn(service, 'setSquareOffset');
    const spyOnRetRectangleOffset = spyOn(service, 'setRectangleOffset');
    const SpyOnDraw = spyOn(service, 'draw');
    service.active = true;
    inputService.shiftPressed = true;
    service.onMouseMove();
    expect(spyOnGetMouse).toHaveBeenCalled();

    expect(spyOnSetSquareOffset).toHaveBeenCalled();
    expect(spyOnRetRectangleOffset).not.toHaveBeenCalled();
    expect(SpyOnDraw).toHaveBeenCalled();
  });

  it ('should call setRectangleOffset on mouse move', () => {
    const spyOnGetMouse = spyOn(inputService, 'getMouse');
    const spyOnSetSquareOffset = spyOn(service, 'setSquareOffset');
    const spyOnRetRectangleOffset = spyOn(service, 'setRectangleOffset');
    const SpyOnDraw = spyOn(service, 'draw');
    service.active = true;
    inputService.shiftPressed = false;
    service.onMouseMove();
    expect(spyOnGetMouse).toHaveBeenCalled();

    expect(spyOnSetSquareOffset).not.toHaveBeenCalled();
    expect(spyOnRetRectangleOffset).toHaveBeenCalled();
    expect(SpyOnDraw).toHaveBeenCalled();
  });

  it ('should not react on mouse move', () => {
    const spyOnGetMouse = spyOn(inputService, 'getMouse');
    const spyOnSetSquareOffset = spyOn(service, 'setSquareOffset');
    const spyOnRetRectangleOffset = spyOn(service, 'setRectangleOffset');
    const SpyOnDraw = spyOn(service, 'draw');
    service.active = false;
    inputService.shiftPressed = false;
    service.onMouseMove();
    expect(spyOnGetMouse).toHaveBeenCalled();

    expect(spyOnSetSquareOffset).not.toHaveBeenCalled();
    expect(spyOnRetRectangleOffset).not.toHaveBeenCalled();
    expect(SpyOnDraw).not.toHaveBeenCalled();
  });

  it ('should execute on mouse up', () => {
    const spyOnReset = spyOn(service, 'reset');
    const spyOnAddColorsToLastUsed = spyOn(colorService, 'addColorsToLastUsed');
    service.onMouseUp();
    expect(spyOnReset).toHaveBeenCalled();
    expect(spyOnAddColorsToLastUsed).toHaveBeenCalled();
  });

  it ('should set origin', () => {
    const mouse: Point  = {x: 1, y: 1};
    service.setOrigin(mouse);
    expect(service.x).toEqual(1);
    expect(service.y).toEqual(1);
  });

  it('should set rectangle type', () => {
    service.fillEnable = false;
    service.strokeEnable = false;
    const spyOnsetAttribute = spyOn(renderer, 'setAttribute');
    service.setRectangleType();
    expect(spyOnsetAttribute).toHaveBeenCalled();
  });

  it('should not set rectangle type', () => {
    service.fillEnable = true;
    service.strokeEnable = true;
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.setRectangleType();
    expect(spyOnSetStyle).toHaveBeenCalledTimes(0);
  });

  it('should set square offset', () => {
    service.mouse = {x: 10, y: 4};
    service.origin = {x: 2, y: 20};
    service.setSquareOffset();
    expect(service.width).toEqual(16);
    expect(service.height).toEqual(16);
    expect(service.x).toEqual(2);
    expect(service.y).toEqual(4);
  });

  // Ca marche pas - je comprends pas pk
  it('should set rectangle offset', () => {
    service.mouse = {x: 10, y: 4};
    service.origin = {x: 2, y: 20};
    service.setRectangleOffset();
    expect(service.width).toEqual(8);
    expect(service.height).toEqual(16);
    expect(service.x).toEqual(2);
    expect(service.y).toEqual(4);
  });

  it('should draw', () => {
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.draw();
    expect(spyOnSetAttribute).toHaveBeenCalledTimes(4);
  });

  it ('should assign bordered rectangle', () => {
    service.strokeEnable = false;
    service.fillEnable = true;
    service.assignBorderedRectangle();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(false);
  });

  it ('should assign filled rectangle', () => {
    service.strokeEnable = true;
    service.fillEnable = false;
    service.assignFilledRectangle();
    expect(service.strokeEnable).toEqual(false);
    expect(service.fillEnable).toEqual(true);
  });

  it ('should assign bordered and filled rectangle', () => {
    service.strokeEnable = false;
    service.fillEnable = false;
    service.assignBorderedAndFilledRectangle();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(true);
  });

  it('should change primary color', () => {
    const color = 'red';
    service.changePrimaryColor(color);
    expect(service.fill).toEqual('red');
  });

  it('should change secondary color', () => {
    const color = 'red';
    service.changeSecondaryColor(color);
    expect(service.stroke).toEqual('red');
  });

  it('Should assign rectangle type to bordered', () => {
    service.rectangleType = 'Bordered';
    const spyOnAssignBorderedRectang = spyOn(service, 'assignBorderedRectangle');
    service.assignRectangleType();
    expect(spyOnAssignBorderedRectang).toHaveBeenCalled();
  });

  it('Should  assign rectangle type to filled', () => {
    service.rectangleType = 'Filled';
    const spyOnAssignFilledRectangle = spyOn(service, 'assignFilledRectangle');
    service.assignRectangleType();
    expect(spyOnAssignFilledRectangle).toHaveBeenCalled();
  });

  it('Should assign rectangle type to bordered and filled', () => {
    service.rectangleType = 'Bordered & Filled';
    const spyOnSssignBorderedAndFilledRectangle = spyOn(service, 'assignBorderedAndFilledRectangle');
    service.assignRectangleType();
    expect(spyOnSssignBorderedAndFilledRectangle).toHaveBeenCalled();
  });

  it('Should not assign junction on default', () => {
    service.rectangleType = 'allo';
    const spyOnAssignBorderedRectang = spyOn(service, 'assignBorderedRectangle');
    const spyOnAssignFilledRectangle = spyOn(service, 'assignFilledRectangle');
    const spyOnSssignBorderedAndFilledRectangle = spyOn(service, 'assignBorderedAndFilledRectangle');
    service.assignRectangleType();
    expect(spyOnAssignBorderedRectang).not.toHaveBeenCalled();
    expect(spyOnAssignFilledRectangle).not.toHaveBeenCalled();
    expect(spyOnSssignBorderedAndFilledRectangle).not.toHaveBeenCalled();
  });

});
