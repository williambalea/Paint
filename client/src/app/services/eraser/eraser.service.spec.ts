import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { ElementRef } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';
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
  //let viewChildService: ViewChildService;

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

  // TESTS QUI NE MARCHENT PAS:
  // it('should initialize view children', () => {
  //   const createElement = spyOn( renderer, 'createElement');
  //   service.initializeViewChildren();
  //   expect(createElement).toHaveBeenCalled();
  //   expect(viewChildService.drawingBoard).toBeDefined();
  //   expect(viewChildService.canvas).toBeDefined();

  // })
});
