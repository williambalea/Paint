import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { LineService } from './line.service';
import { STROKE_DASHARRAY_STYLE } from 'src/constants';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
}
// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  getFillColor(): void {return; }
  addColorsToLastUsed(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  backSpacePressed = false;
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('LineService', () => {
  let service: LineService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LineService,
        ColorService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(LineService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset attributes', () => {
    service.start = false;
    service.stroke = 'test';
    service.active = true;
    service.linepath = 'test';
    service.savedPath = 'test';
    service.positions = [{x: 3, y: 1}];

    service.reset();
    expect(service.start).toEqual(true);
    expect(service.stroke).toEqual('');
    expect(service.active).toEqual(false);
    expect(service.linepath).toEqual('');
    expect(service.savedPath).toEqual('');
    expect(service.positions).toEqual([]);
  });

  it('should execute functions on mouse down', () => {
    service.active = false;
    const spyOnGetFillCollor = spyOn(colorService, 'getFillColor');
    const spyOnvalidationToCreatePath = spyOn(service, 'validationToCreatePath');
    const spyOnSetStyle = spyOn(service, 'setStyle');
    const spyOnDraw = spyOn(service, 'draw');

    service.onMouseDown();
    expect(service.positions.length).toEqual(1);
    expect(service.active).toEqual(true);
    expect(spyOnGetFillCollor).toHaveBeenCalled();
    expect(spyOnvalidationToCreatePath).toHaveBeenCalled();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnDraw).toHaveBeenCalled();
  });

  it('Should validate and call fucntion to create path', () => {
    service.start = true;
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    service.validationToCreatePath();
    expect(spyOnCreateElement).toHaveBeenCalled();
  });
  it('Should not validate and call fucntion to create path', () => {
    service.start = false;
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    service.validationToCreatePath();
    expect(spyOnCreateElement).not.toHaveBeenCalled();
  });

  it('should set style', () => {
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    const spyOnvalidateJunctionStyle = spyOn(service, 'validateJunctionStyle');
    service.setStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnvalidateJunctionStyle).toHaveBeenCalled();
  });

  it ('should call setStyle if dot is a selected junction', () => {
    service.junctionStyle = 'dot';
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateJunctionStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should call setStyle if angeled is a selected junction', () => {
    service.junctionStyle = 'miter';
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateJunctionStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should call setStyle if round is a selected junction', () => {
    service.junctionStyle = 'round';
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateJunctionStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should draw preview on mouse move', () => {
    service.savedPath = 'abc';
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.isActive();
    expect(service.linepath).toEqual('abcL1 2');
    expect(spyOnSetAttribute).toHaveBeenCalled();
  });

  it('should draw the starting point', () => {
    service.positions = [{x: 1, y: 2}];
    service.start = true;
    const spyOnFinishDraw = spyOn(service, 'finishDraw');
    service.draw();
    expect(service.linepath).toEqual('M1 2');
    expect(spyOnFinishDraw).toHaveBeenCalled();
  });

  it('should draw the next line', () => {
    service.positions = [{x: 1, y: 2}, {x: 3, y: 4}];
    service.linepath = 'abc';
    service.start = false;
    const spyOnFinishDraw = spyOn(service, 'finishDraw');
    service.draw();
    expect(service.linepath).toEqual('abcL3 4');
    expect(spyOnFinishDraw).toHaveBeenCalled();
  });

  it('should redraw the starting point', () => {
    service.positions = [{x: 1, y: 2}, {x: 3, y: 4}];
    const spyOnFinishDraw = spyOn(service, 'finishDraw');
    service.redraw();
    expect(service.linepath).toEqual('M1 2L3 4');
    expect(spyOnFinishDraw).toHaveBeenCalled();
  });

  it ('should call isActive on mouse move', () => {
    service.active = true;
    const spyOnIsActive = spyOn(service, 'isActive');
    service.onMouseMove();
    expect(spyOnIsActive).toHaveBeenCalled();
  });

  it ('should call isBackSpacePressed() on mouse move', () => {
    inputService.backSpacePressed = true;
    const spyOnIsBackSpacePressed = spyOn(service, 'isBackSpacePressed');
    service.onMouseMove();
    expect(spyOnIsBackSpacePressed).toHaveBeenCalled();
  });

  it ('should call isShiftPressed() on mouse move', () => {
    inputService.shiftPressed = true;
    const spyOnIsShiftPressed = spyOn(service, 'isShiftPressed');
    service.onMouseMove();
    expect(spyOnIsShiftPressed).toHaveBeenCalled();
  });

  it('should delete last segment with BackSpace', () => {
    service.stroke = 'string';
    const spyOnDeletePosition = spyOn(service, 'deletePosition');
    const spyOnGetFillColor = spyOn(colorService, 'getFillColor');
    const spyOnValidationToCreatePath = spyOn(service, 'validationToCreatePath');
    const spyOnSetStyle = spyOn(service, 'setStyle');
    const spyOnRedraw = spyOn(service, 'redraw');
    service.isBackSpacePressed();
    expect(spyOnDeletePosition).toHaveBeenCalled();
    expect(spyOnGetFillColor).toHaveBeenCalled();
    expect(spyOnValidationToCreatePath).toHaveBeenCalled();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnRedraw).toHaveBeenCalled();
  });

  it ('should not clean table if there is only one positon', () => {
    service.positions = [{x: 1, y: 2}];
    service.deletePosition();
    expect(service.positions.length === 1);
  });

  it ('should clean table when there is more than 1 position', () => {
    service.positions = [{x: 1, y: 2}, {x: 3, y: 4}];
    service.deletePosition();
    expect(service.positions.length === 2);
  });

  it ('should close line with shift pressed', () => {
    service.linepath = '';
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    const spyOnReset = spyOn(service, 'reset');
    service.isShiftPressed();
    expect(spyOnSetAttribute).toHaveBeenCalled();
    expect(spyOnReset).toHaveBeenCalled();
    expect(service.linepath).toEqual('Z');
  });

  it ('should delete all line in escape pressed', () => {
    inputService.escapePressed = true;
    const spyOnReset = spyOn(service, 'reset');
    service.onMouseUp();
    expect(spyOnReset).toHaveBeenCalled();
  });

  it('should finish line after doubleClick', () => {
    service.doubleClick = true;
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    const spyOnReset = spyOn(service, 'reset');
    service.onMouseUp();
    expect(spyOnSetAttribute).toHaveBeenCalled();
    expect(spyOnReset).toHaveBeenCalled();
  });

  it ('should do the last steps of the draw', () => {
    service.start = true;
    service.savedPath = '';
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    const spyOnAddColorsToLastUsed = spyOn(colorService, 'addColorsToLastUsed');
    service.finishDraw();
    expect(spyOnSetAttribute).toHaveBeenCalled();
    expect(service.start).toEqual(false);
    expect(service.savedPath).toEqual(service.linepath);
    expect(spyOnAddColorsToLastUsed).toHaveBeenCalled();
  });

  it ('should assign stroke style dotted point', () => {
    service.dashArrayType = '';
    service.assignStrokeStyleDottedPoint();
    expect(service.dashArrayType = '1,20');
  });

  it ('should assign stroke style dotted line', () => {
    service.dashArrayType = '';
    service.assignStrokeStyleDottedLine();
    expect(service.dashArrayType = '20,20');
  });

  it ('should assign stroke style full line', () => {
    service.dashArrayType = '';
    service.assignStrokeStyleFullLine();
    expect(service.dashArrayType = '');
  });

  it('Should assign strokeStyle to dottedPoint', () => {
    const assignDottedPointSpy = spyOn(service, 'assignStrokeStyleDottedPoint');
    const assignDottedLineSpy = spyOn(service, 'assignStrokeStyleDottedLine');
    const assignFullLineSpy = spyOn(service, 'assignStrokeStyleFullLine');
    service.dashArrayType = STROKE_DASHARRAY_STYLE.dottedPoint;
    service.assignStrokeStyle();
    expect(assignDottedPointSpy).toHaveBeenCalled();
    expect(assignDottedLineSpy).not.toHaveBeenCalled();
    expect(assignFullLineSpy).not.toHaveBeenCalled();
  });
  it('Should assign strokeStyle to dottedLine', () => {
    const assignDottedPointSpy = spyOn(service, 'assignStrokeStyleDottedPoint');
    const assignDottedLineSpy = spyOn(service, 'assignStrokeStyleDottedLine');
    const assignFullLineSpy = spyOn(service, 'assignStrokeStyleFullLine');
    service.dashArrayType = STROKE_DASHARRAY_STYLE.dottedLine;
    service.assignStrokeStyle();
    expect(assignDottedPointSpy).not.toHaveBeenCalled();
    expect(assignDottedLineSpy).toHaveBeenCalled();
    expect(assignFullLineSpy).not.toHaveBeenCalled();
  });
  it('Should assign strokeStyle to fullLine', () => {
    const assignDottedPointSpy = spyOn(service, 'assignStrokeStyleDottedPoint');
    const assignDottedLineSpy = spyOn(service, 'assignStrokeStyleDottedLine');
    const assignFullLineSpy = spyOn(service, 'assignStrokeStyleFullLine');
    service.dashArrayType = STROKE_DASHARRAY_STYLE.fullLine;
    service.assignStrokeStyle();
    expect(assignDottedPointSpy).not.toHaveBeenCalled();
    expect(assignDottedLineSpy).not.toHaveBeenCalled();
    expect(assignFullLineSpy).toHaveBeenCalled();
  });

  it('Should assign nothing in default case', () => {
    const assignDottedPointSpy = spyOn(service, 'assignStrokeStyleDottedPoint');
    const assignDottedLineSpy = spyOn(service, 'assignStrokeStyleDottedLine');
    const assignFullLineSpy = spyOn(service, 'assignStrokeStyleFullLine');
    service.dashArrayType = 'a';
    service.assignStrokeStyle();
    expect(assignDottedPointSpy).not.toHaveBeenCalled();
    expect(assignDottedLineSpy).not.toHaveBeenCalled();
    expect(assignFullLineSpy).not.toHaveBeenCalled();
  });

  it ('should change junction value to newJunction', () => {
    const newJunction: string = 'abc';
    service.captDot(newJunction);
    expect(service.junction).toEqual('url(#abc)');
  });

  it ('should assign angled junction style angled', () => {
    service.junctionValue = '';
    service.junction = 'dot';
    service.assignJunctionStyleAngled();
    expect(service.junctionValue).toEqual('miter');
    expect(service.junction).toEqual('');
  });

  it ('should assign angled junction style randed', () => {
    service.junctionValue = '';
    service.junction = 'dot';
    service.assignJunctionStyleRounded();
    expect(service.junctionValue).toEqual('round');
    expect(service.junction).toEqual('');
  });

  it('Should change junction to dot', () => {
    service.junctionStyle = 'dot';
    const spyOnCaptDot = spyOn(service, 'captDot');
    service.changeJunction();
    expect(spyOnCaptDot).toHaveBeenCalled();
  });

  it('Should change junction to angled', () => {
    service.junctionStyle = 'miter';
    const spyOnAssignJunctionStyleAngled = spyOn(service, 'assignJunctionStyleAngled');
    service.changeJunction();
    expect(spyOnAssignJunctionStyleAngled).toHaveBeenCalled();
  });

  it('Should change junction to rounded', () => {
    service.junctionStyle = 'round';
    const spyOnSssignJunctionStyleRounded = spyOn(service, 'assignJunctionStyleRounded');
    service.changeJunction();
    expect(spyOnSssignJunctionStyleRounded).toHaveBeenCalled();
  });

  it('Should not assign junction on default', () => {
    service.junctionStyle = 'allo';
    const spyOnCaptDot = spyOn(service, 'captDot');
    const spyOnAssignJunctionStyleAngled = spyOn(service, 'assignJunctionStyleAngled');
    const spyOnSssignJunctionStyleRounded = spyOn(service, 'assignJunctionStyleRounded');
    service.changeJunction();
    expect(spyOnCaptDot).not.toHaveBeenCalled()
    expect(spyOnSssignJunctionStyleRounded).not.toHaveBeenCalled();
    expect(spyOnAssignJunctionStyleAngled).not.toHaveBeenCalled();
  });



});
