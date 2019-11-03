import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
// import {RendererFactory2 } from '@angular/core';
//Renderer2
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { PenService } from './pen.service';

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

describe('PenService', () => {
  let service: PenService;
  // let colorService: ColorService;
  // let inputService: InputService;
  // let renderer: Renderer2;
  // let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PenService,
        ColorService,
        InputService,
        // { provide: RendererFactory2, useClass: RendererFactoryMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(PenService);
    // colorService = TestBed.get(ColorService);
    // renderer = TestBed.get(Renderer2);
    // rendererFactory = TestBed.get(RendererFactory2);
    // renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get speed', () => {
    service.mouseSpeed = 0;
    service.lastMouseMoveTime = 0;
    const event = new MouseEvent('mouseDown');
    event.initMouseEvent('mouseDown', true, false, window, 1, 1, 1, 100, 100, false, false, false, false, 0, null);
    service.getSpeed(event);
    expect(service.mouseSpeed).not.toEqual(1);
    expect(service.lastMouseMoveTime).not.toEqual(1);
  });

  it('should reset pen attributes', () => {
    service.stroke = 'allo';
    service.active = true;
    service.reset();
    expect(service.stroke).toEqual('');
    expect(service.active).toBeFalsy();

  });

});
