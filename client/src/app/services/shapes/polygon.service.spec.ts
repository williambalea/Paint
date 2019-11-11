import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY_STRING, NB } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { PolygonService } from './polygon.service';

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
  let rendererFactory: RendererFactory2;
  let viewChildService: ViewChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PolygonService,
        ColorService,
        InputService,
        ViewChildService,
        { provide: InputService, useClass: InputServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(PolygonService);
    viewChildService = TestBed.get(ViewChildService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should change type to Bordered', () => {
    service.polygonType = 'Bordered';
    const spyOnAssignBorderedPolygon = spyOn(service, 'assignBorderedPolygon');
    service.assignPolygonType();
    expect(spyOnAssignBorderedPolygon).toHaveBeenCalled();
  });

  it('Should change type to Filled', () => {
    service.polygonType = 'Filled';
    const spyOnAssignFilledPolygon = spyOn(service, 'assignFilledPolygon');
    service.assignPolygonType();
    expect(spyOnAssignFilledPolygon).toHaveBeenCalled();
  });

  it('Should change type to Bordered & Filled', () => {
    service.polygonType = 'Bordered & Filled';
    const spyOnAssignBorderedAndFilledPolygon = spyOn(service, 'assignBorderedAndFilledPolygon');
    service.assignPolygonType();
    expect(spyOnAssignBorderedAndFilledPolygon).toHaveBeenCalled();
  });

  it('Should not assign type on default', () => {
    service.polygonType = 'random';
    const spyOnAssignBorderedPolygon = spyOn(service, 'assignBorderedPolygon');
    const spyOnAssignFilledPolygon = spyOn(service, 'assignFilledPolygon');
    const spyOnAssignBorderedAndFilledPolygon = spyOn(service, 'assignBorderedAndFilledPolygon');
    service.assignPolygonType();
    expect(spyOnAssignBorderedPolygon).not.toHaveBeenCalled();
    expect(spyOnAssignFilledPolygon).not.toHaveBeenCalled();
    expect(spyOnAssignBorderedAndFilledPolygon).not.toHaveBeenCalled();
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
    const spyOnSetAttributes = spyOn(renderer, 'setAttribute');
    service.fillEnable = false;
    service.strokeEnable = false;
    service.setPolygonType();
    expect(spyOnSetAttributes).toHaveBeenCalledTimes(2);
  });

  it('should not set polygon type', () => {
    const spyOnSetAttributes = spyOn(renderer, 'setAttribute');
    service.fillEnable = true;
    service.strokeEnable = true;
    service.setPolygonType();
    expect(spyOnSetAttributes).not.toHaveBeenCalled();
  });

  // it('should remove color', () => {
  //   const fill = 'black';
  //   const returnValue = service.removeColor(fill);
  //   expect(returnValue).toEqual(jasmine.any(String));
  // });

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
    const setAttributeSpy = spyOn(service, 'setAttributesPolygon');
    const setStyleSpy = spyOn(service, 'setStylePolygon');
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
    expect(service.initialPoint.x).toEqual(NB.Zero);
    expect(service.initialPoint.y).toEqual(NB.MinusOne);
  });

  it('should set attributes polygon', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute');
    service.setAttributesPolygon();
    expect(setAttributeSpy).toHaveBeenCalled();
  });

  it('should set style polygon', () => {
    const setStyleSpy = spyOn(renderer, 'setAttribute');
    service.setStylePolygon();
    expect(setStyleSpy).toHaveBeenCalled();
  });

  it('should call child functions upon down mouse', () => {
    viewChildService.canvas = new ElementRef(renderer.createElement('rect', 'svg'));
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

  it('should generate vertices upon moving mouse if active', () => {
    service.active = true;
    const generateVerticesSpy = spyOn(service, 'generateVertices');
    // const getMouseSpy = spyOn(inputService, 'getMouse');
    const drawSpy = spyOn(service, 'draw');
    service.onMouseMove();
    expect(generateVerticesSpy).toHaveBeenCalled();
    // expect(getMouseSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should not generate vertices or draw if not active', () => {
    const generateVerticesSpy = spyOn(service, 'generateVertices').and.callThrough();
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.active = false;
    service.onMouseMove();
    expect(service.active).toEqual(false);
    expect(generateVerticesSpy).not.toHaveBeenCalled();
    expect(getMouseSpy).not.toHaveBeenCalled();
    expect(drawSpy).not.toHaveBeenCalled();
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
