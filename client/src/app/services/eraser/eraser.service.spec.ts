import { ElementRef, Renderer2, RendererFactory2, ɵEMPTY_ARRAY } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY_STRING } from 'src/constants';
import { provideAutoMock } from 'src/test.helpers.spec';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import {ViewChildService} from '../view-child.service';
import { EraserService } from './eraser.service';

describe('EraserService', () => {
  let service: EraserService;
  // let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  let viewChildService: ViewChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EraserService,
        ColorService,
        InputService,
        provideAutoMock(InputService),
        provideAutoMock(ColorService),
        provideAutoMock(ViewChildService),
        Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(EraserService);
    viewChildService = TestBed.get(ViewChildService);
    // colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the children', () => {
    service.drawingBoard = new ElementRef('drawingBoardValue');
    service.canvas = new ElementRef('canvasValue');
    service.initializeViewChildren();
    expect(service.drawingBoard).toEqual(viewChildService.drawingBoard);
    expect(service.canvas).toEqual(viewChildService.canvas);
  });

  it('should create an eraser', () => {
    const initializeViewChildrenSpy = spyOn(service, 'initializeViewChildren');
    const setAttributeCursorSpy = spyOn(service, 'setAttributeCursor');
    service.drawingBoard = new ElementRef('svg');
    service.createEraser(1, 1);
    service.setAttributeCursor(1, 1);
    expect(initializeViewChildrenSpy).toHaveBeenCalled();
    expect(setAttributeCursorSpy).toHaveBeenCalled();
  });

  it('should set copy attributes with a stroke', () => {
    const shape = renderer.createElement('svg') as SVGGraphicsElement;
    shape.setAttribute('fill', 'blue');
    shape.setAttribute('stroke', 'blue');
    shape.setAttribute('stroke-opacity', '-5');
    shape.setAttribute('stroke-width', '-5');
    service.setForElementWithStroke(shape);
    expect(service.setForElementWithStroke(shape).getAttribute('fill')).toEqual('none');
    expect(service.setForElementWithStroke(shape).getAttribute('stroke')).toEqual('red');
    expect(service.setForElementWithStroke(shape).getAttribute('stroke-opacity')).toEqual('1');
    expect(service.setForElementWithStroke(shape).getAttribute('stroke-width')).not.toEqual('initialValue');
  });

  it('should set copy attributes without a stroke', () => {
    const shape = renderer.createElement('svg') as SVGGraphicsElement;
    shape.setAttribute('x', '-5');
    shape.setAttribute('y', '-5');
    shape.setAttribute('width', '-5');
    shape.setAttribute('height', '-5');
    shape.setAttribute('fill', 'blue');
    shape.setAttribute('stroke', 'blue');
    shape.setAttribute('stroke-width', '-5');
    service.setForElementWithoutStroke(shape);
    expect(service.setForElementWithStroke(shape).getAttribute('fill')).toEqual('none');
    expect(service.setForElementWithStroke(shape).getAttribute('stroke')).toEqual('red');
    expect(service.setForElementWithStroke(shape).getAttribute('width')).not.toBeNaN();
    expect(service.setForElementWithStroke(shape).getAttribute('height')).not.toBeNaN();
    expect(service.setForElementWithStroke(shape).getAttribute('stroke-width')).not.toBeNaN();
    expect(service.setForElementWithStroke(shape).getAttribute('x')).not.toBeNaN();
    expect(service.setForElementWithStroke(shape).getAttribute('y')).not.toBeNaN();
  });

  it('should update position', () => {
    let cursor: SVGGraphicsElement;
    cursor = renderer.createElement('rect', 'svg');
    service.size = 1;
    cursor.setAttribute('x', '1');
    cursor.setAttribute('y', '1');
    inputService.getMouse().x = 1;
    inputService.getMouse().y = 1;

    const spyOnCreateEraser = spyOn(service, 'createEraser');
    const spyOnIntersect = spyOn(service, 'intersect');
    const spyOnSetAttribute = spyOn( renderer, 'setAttribute');
    service.updatePosition(cursor);
    expect(spyOnCreateEraser).toHaveBeenCalled();
    expect(spyOnIntersect).toHaveBeenCalled();
    expect(spyOnSetAttribute).toHaveBeenCalled();
  });

  it('should set cursor attributes', () => {
    const x = 1;
    const y = 1;
    const spyOnSetAttribute = spyOn( renderer, 'setAttribute');
    service.setAttributeCursor(x, y);
    expect(spyOnSetAttribute).toHaveBeenCalledTimes(7);
  });

  it('should reset shapes to eraser and counter', () => {
    const element = renderer.createElement('element') as SVGGraphicsElement;
    viewChildService.eraserCountour = new ElementRef(renderer.createElement('svg'));
    service.shapesToErase.push(element);
    service.reset();
    expect(service.shapesToErase).toEqual(ɵEMPTY_ARRAY);
    expect(viewChildService.eraserCountour.nativeElement.innerHTML).toEqual(EMPTY_STRING);
  });

  it('should add to preview', () => {
    let shape: SVGGraphicsElement;
    shape = renderer.createElement('rect', 'svg');
    const spyOnCreateElement  = spyOn(renderer, 'createElement');
    const spyOnsetAttributePreview  = spyOn(service, 'setAttributePreview');
    const spyOnPush = spyOn(service.shapesToErase, 'push');
    const spyOnappendChild = spyOn( renderer, 'appendChild');
    service.addToPreview(shape);
    expect(spyOnCreateElement).toHaveBeenCalled();
    expect(spyOnsetAttributePreview).toHaveBeenCalled();
    expect(spyOnPush).toHaveBeenCalled();
    expect(spyOnappendChild).toHaveBeenCalled();
  });

  it('should set attribute preview with stroke', () => {
    const setForElementWithStrokeSpy = spyOn(service, 'setForElementWithStroke');
    const setForElementWithoutStrokeSpy = spyOn(service, 'setForElementWithoutStroke');
    const shape = renderer.createElement('element') as SVGGraphicsElement;
    shape.setAttribute('stroke', 'strokeValue');
    service.setAttributePreview(shape);
    expect(setForElementWithStrokeSpy).toHaveBeenCalled();
    expect(setForElementWithoutStrokeSpy).not.toHaveBeenCalled();
  });

  it('should set attribute preview without stroke', () => {
    const setForElementWithStrokeSpy = spyOn(service, 'setForElementWithStroke');
    const setForElementWithoutStrokeSpy = spyOn(service, 'setForElementWithoutStroke');
    const shape = renderer.createElement('element') as SVGGraphicsElement;
    service.setAttributePreview(shape);
    expect(setForElementWithStrokeSpy).not.toHaveBeenCalled();
    expect(setForElementWithoutStrokeSpy).toHaveBeenCalled();
  });

  it('should return valid intersection', () => {
    const firstShape: ClientRect = { bottom: 1, height: 1, left: 1,
                                     right: 1, top: 1, width: 1};
    const secondShape: ClientRect = { bottom: 1, height: 1, left: 1,
                                     right: 1, top: 1, width: 1};
    expect(service.calculateIntersection(firstShape, secondShape)).toBeTruthy();
  });

  it('should not return valid intersection', () => {
    const firstShape: ClientRect = { bottom: 0, height: 1, left: 0,
                                     right: 2, top: 0, width: 1};
    const secondShape: ClientRect = { bottom: 1, height: 1, left: 1,
                                     right: 1, top: 1, width: 1};
    expect(service.calculateIntersection(firstShape, secondShape)).not.toBeTruthy();
  });

  it('should reset upon calling intersect', () => {
    const resetSpy = spyOn(service, 'reset');
    service.canvas = new ElementRef(renderer.createElement('canvas'));
    service.intersect();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should not itterate if the canvas is empty', () => {
    const calculateIntersectionSpy = spyOn(service, 'calculateIntersection');
    service.canvas = new ElementRef(renderer.createElement('canvas'));
    console.log(service.canvas);
    service.intersect();
    expect(calculateIntersectionSpy).not.toHaveBeenCalled();
  });
});
