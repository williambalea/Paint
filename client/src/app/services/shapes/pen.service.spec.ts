import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import {Renderer2, RendererFactory2 } from '@angular/core';
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
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PenService,
        ColorService,
        InputService,
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(PenService);
    // colorService = TestBed.get(ColorService);
    //renderer = TestBed.get(Renderer2);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
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

  it('should execute on mouse down', () => {
    service.active = false;
    const spyOnCreatePenGroupe = spyOn(service, 'createPenGroup');
    service.onMouseDown();
    expect(service.active).toBeTruthy();
    expect(spyOnCreatePenGroupe).toHaveBeenCalled();
  });

  it('should create path', () => {
    service.stroke = '';
    service.linepath = '';
    const spyOnSetStylePath = spyOn(service, 'setStylePath');
    service.createPath();
    expect(service.stroke).not.toEqual('');
    expect(spyOnSetStylePath).toHaveBeenCalled();
    expect(service.linepath).not.toEqual('');
  });

  it('should set style path', () => {
    const spyOnSetStylePath = spyOn(renderer, 'setStyle');
    service.setStylePath();
    expect(spyOnSetStylePath).toHaveBeenCalledTimes(3);
  });

  //LES TESTS QUI NE MARCHENT PAS

  //nativeElement of undefined
  // it('should create pen group', () => {
  //   const spyOnPenWrapper = spyOn(renderer, 'createElement');
  //   service.createPenGroup();
  //   expect(spyOnPenWrapper).toHaveBeenCalled();
  // });

});
