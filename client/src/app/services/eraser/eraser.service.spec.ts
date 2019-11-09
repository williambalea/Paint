import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import {ViewChildService} from '../view-child.service';
import { EraserService } from './eraser.service';

// tslint:disable-next-line: max-classes-per-file
class ViewChildServiceMock {
  drawingBoard: ElementRef ;
}

// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  // getFillColor(): void {return; }
  // addColorsToLastUsed(): void {return; }
  getFillColor(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('EraserService', () => {
  let service: EraserService;
  // let colorService: ColorService;
  // let inputService: InputService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  // let viewChildService: ViewChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EraserService,
        ColorService,
        InputService,
        {provide: ViewChildService, useClass: ViewChildServiceMock},
        // { provide: RendererFactory2, useClass: RendererFactoryMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
          Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(EraserService);
    // viewChildService = TestBed.get(ViewChildService);
    // colorService = TestBed.get(ColorService);
    // renderer = TestBed.get(Renderer2);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update position', () => {
    let cursor: SVGGraphicsElement;
    cursor = renderer.createElement('rect', 'svg');
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

  it('should clear', () => {
    let i: SVGGraphicsElement;
    i = renderer.createElement('rect', 'svg');
    service.shapesToErase.push(i);
    const spyOnRemoveChild = spyOn( renderer, 'removeChild');
    service.clear();
    expect(spyOnRemoveChild).toHaveBeenCalled();
  });

  it('should validate intersection', () => {
    const isIntersection = true;
    let child: SVGGraphicsElement;
    child = renderer.createElement('rect', 'svg');
    const spyOnaddToPreview = spyOn(service, 'addToPreview');
    const spyOnvalidateErase = spyOn(service, 'validateErase');
    service.validateIntersection(isIntersection, child);
    expect(spyOnaddToPreview).toHaveBeenCalled();
    expect(spyOnvalidateErase).toHaveBeenCalled();
  });

  it('should not validate intersection', () => {
    const isIntersection = false;
    let child: SVGGraphicsElement;
    child = renderer.createElement('rect', 'svg');
    const spyOnaddToPreview = spyOn(service, 'addToPreview');
    const spyOnvalidateErase = spyOn(service, 'validateErase');
    service.validateIntersection(isIntersection, child);
    expect(spyOnaddToPreview).not.toHaveBeenCalled();
    expect(spyOnvalidateErase).not.toHaveBeenCalled();
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

  // it('should intersect', () => {
  //   const spyOnCursorBox = spyOn(service.cursor, 'getBoundingClientRect');
  //   const spyOnClear = spyOn(service, 'clear');
  //   service.intersect();
  //   expect(spyOnCursorBox).toHaveBeenCalled();
  //   expect(spyOnClear).toHaveBeenCalled();
  // })
});
