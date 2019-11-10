import { ElementRef, Renderer2, RendererFactory2, ɵEMPTY_ARRAY } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import {ViewChildService} from '../view-child.service';
import { EraserService } from './eraser.service';
import { EMPTY_STRING } from 'src/constants';
import { provideAutoMock } from 'src/test.helpers.spec';


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
        // { provide: RendererFactory2, useClass: RendererFactoryMock },
          Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(EraserService);
    viewChildService = TestBed.get(ViewChildService);
    // colorService = TestBed.get(ColorService);
    // renderer = TestBed.get(Renderer2);
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

  // it('should set attribute preview', () => {
  //   let shape: SVGGraphicsElement;
  //   shape = renderer.createElement('rect', 'svg');
  //   let redContour: HTMLElement;
  //   redContour = renderer.createElement('rect', 'svg');
  //   const spyOnSetAttribute = spyOn( renderer, 'setAttribute');
  //   service.setAttributePreview(redContour);
  //   expect(spyOnSetAttribute).toHaveBeenCalledTimes(7);
  // });

  // it('should clear', () => {
  //   let i: SVGGraphicsElement;
  //   i = renderer.createElement('rect', 'svg');
  //   service.shapesToErase.push(i);
  //   const spyOnRemoveChild = spyOn( renderer, 'removeChild');
  //   service.clear();
  //   expect(spyOnRemoveChild).toHaveBeenCalled();
  // });

  // it('should validate intersection', () => {
  //   const isIntersection = true;
  //   let child: SVGGraphicsElement;
  //   child = renderer.createElement('rect', 'svg');
  //   const spyOnaddToPreview = spyOn(service, 'addToPreview');
  //   const spyOnvalidateErase = spyOn(service, 'validateErase');
  //   service.validateIntersection(isIntersection, child);
  //   expect(spyOnaddToPreview).toHaveBeenCalled();
  //   expect(spyOnvalidateErase).toHaveBeenCalled();
  // });

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

  // TESTS QUI NE MARCHENT PAS a cause du native Element
  // it('should initialize view children', () => {
  //   const createElement = spyOn( renderer, 'createElement');
  //   service.initializeViewChildren();
  //   expect(createElement).toHaveBeenCalled();
  //   expect(viewChildService.drawingBoard).toBeDefined();
  //   expect(viewChildService.canvas).toBeDefined();
  // })

  // it('should validate erase', () => {
  //   let child: SVGGraphicsElement;
  //   child = renderer.createElement('rect', 'svg');
  //   service.eraseMouseDown = true;
  //   const spyOnRemoveChild = spyOn( renderer, 'removeChild');
  //   service.validateErase(child);
  //   expect(spyOnRemoveChild).toHaveBeenCalled();
  // });

  it('should reset upon calling intersect', () => {
    const resetSpy = spyOn(service, 'reset');
    // const spyOnCursorBox = spyOn(service.cursor, 'getBoundingClientRect');
    // const spyOnClear = spyOn(service, 'clear');
    // service.intersect();
    // expect(spyOnCursorBox).toHaveBeenCalled();
    // expect(spyOnClear).toHaveBeenCalled();
    service.intersect();
    expect(resetSpy).toHaveBeenCalled();
  });
});
