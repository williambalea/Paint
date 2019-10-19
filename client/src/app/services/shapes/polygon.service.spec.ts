import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY_STRING, NB, OUTLINE_TYPE } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { PolygonService } from './polygon.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
  appendChild(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  backSpacePressed = false;
  getMouse(): Point {return {x: 0, y: 0}; }
}

describe('PolygonService', () => {
  let service: PolygonService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PolygonService,
        ColorService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(PolygonService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should allow for multitude types of polygon drawing', () => {
    const borderedSpy = spyOn(service, 'assignBorderedPolygon').and.callThrough();
    const filledSpy = spyOn(service, 'assignFilledPolygon').and.callThrough();
    const borderedFilledSpy = spyOn(service, 'assignBorderedAndFilledPolygon').and.callThrough();

    service.polygonType = OUTLINE_TYPE.bordered;
    service.assignPolygonType();
    expect(borderedSpy).toHaveBeenCalled();

    service.polygonType = OUTLINE_TYPE.filled;
    service.assignPolygonType();
    expect(filledSpy).toHaveBeenCalled();

    service.polygonType = OUTLINE_TYPE.borderedAndFilled;
    service.assignPolygonType();
    expect(borderedFilledSpy).toHaveBeenCalled();
  });

  it('should change primary color', () => {
    service.fill = 'fillColor';
    service.changePrimaryColor(service.fill);
    expect(service.fill).toEqual('fillColor');
  });

  it('should change secondary color', () => {
    service.stroke = 'strokeColor';
    service.changeSecondaryColor(service.stroke);
    expect(service.stroke).toEqual('strokeColor');
  });

  it('should set polygon type', () => {
    const removeColorSpy = spyOn(service, 'removeColor').and.callThrough();
    service.fillEnable = false;
    service.strokeEnable = false;
    service.setPolygonType();
    expect(removeColorSpy).toHaveBeenCalled();
    expect(removeColorSpy).toHaveBeenCalled();
    // test for vars assignments
  });

  it('should remove color', () => {
    // add test
  });

  it('should assign accordingly to bordered and filled polygon', () => {
    service.assignBorderedAndFilledPolygon();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(true);
  });

  it('should assign accordingly to filled polygon', () => {
    service.assignFilledPolygon();
    expect(service.strokeEnable).toEqual(false);
    expect(service.fillEnable).toEqual(true);
  });

  it('should assign accordingly to bordered polygon', () => {
    service.assignBorderedPolygon();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(false);
  });

  it('should set origin', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    service.setOrigin();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(service.origin.x).toEqual(jasmine.any(Number));
    expect(service.origin.y).toEqual(jasmine.any(Number));
  });

  it('should draw and call child functions', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
    expect(service.initialPoint.x).toEqual(NB.Zero);
    expect(service.initialPoint.y).toEqual(NB.MinusOne);
  });

  it('should call child functions upon down mouse', () => {
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const getStrokeColorSpy = spyOn(colorService, 'getStrokeColor').and.callThrough();
    const setOriginSpy = spyOn(service, 'setOrigin').and.callThrough();
    const setPolygonTypeSpy = spyOn(service, 'setPolygonType').and.callThrough();
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();

    service.onMouseDown();
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(getStrokeColorSpy).toHaveBeenCalled();
    expect(setOriginSpy).toHaveBeenCalled();
    expect(setPolygonTypeSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalled();

  });

  it('should call child functions upon moving mouse', () => {
    const generateVerticesSpy = spyOn(service, 'generateVertices').and.callThrough();
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.active = true;
    service.onMouseMove();
    expect(generateVerticesSpy).toHaveBeenCalled();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should call child functions upon mouse up', () => {
    const addColorsSpy = spyOn(colorService, 'addColorsToLastUsed').and.callThrough();
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const getStrokeColorSpy = spyOn(colorService, 'getStrokeColor').and.callThrough();

    service.onMouseUp();
    expect(addColorsSpy).toHaveBeenCalled();
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(getStrokeColorSpy).toHaveBeenCalled();
    expect(service.pointString).toEqual(EMPTY_STRING);
    expect(service.active).toEqual(false);
  });

  it('should call multiple child functions upon generateVertices()', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();

    const i = 1;
    const j = 1;
    const n = 2;
    const x = 4;
    const y = 4;
    const angle = NB.ThreeHundredSixty / n;

    service.generateVertices(i, j, n, x, y);

    expect(getMouseSpy).toHaveBeenCalled();
    expect(service.initialPoint.x).toEqual(jasmine.any(Number));
    expect(service.initialPoint.y).toEqual(jasmine.any(Number));
    expect(service.pointString).toEqual(jasmine.any(String));
    expect(angle).toEqual(jasmine.any(Number));

  });
});
