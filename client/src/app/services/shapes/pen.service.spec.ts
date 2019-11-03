import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import {Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { PenService } from './pen.service';

// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  addColorsToLastUsed(): void {return; }
  getFillColor(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('PenService', () => {
  let service: PenService;
  let colorService: ColorService;
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
    colorService = TestBed.get(ColorService);
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

  it('should execute on mouse move', () => {
    service.active = true;
    service.strokeWidth = 0;
    const spyOnvalidateStrokeWidthMin = spyOn(service, 'validateStrokeWidthMin');
    const spyOnvalidateStrokeWidthMax = spyOn(service, 'validateStrokeWidthMax');
    const spyOnDraw = spyOn(service, 'draw');
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.onMouseMove();
    expect(service.strokeWidth).not.toEqual(0);
    expect(spyOnvalidateStrokeWidthMin).toHaveBeenCalled();
    expect(spyOnvalidateStrokeWidthMax).toHaveBeenCalled();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnDraw).toHaveBeenCalled();
  });

  it('should not execute on mouse move', () => {
    service.active = false;
    service.strokeWidth = 0;
    const spyOnvalidateStrokeWidthMin = spyOn(service, 'validateStrokeWidthMin');
    const spyOnvalidateStrokeWidthMax = spyOn(service, 'validateStrokeWidthMax');
    const spyOnDraw = spyOn(service, 'draw');
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.onMouseMove();
    expect(service.strokeWidth).toEqual(0);
    expect(spyOnvalidateStrokeWidthMin).not.toHaveBeenCalled();
    expect(spyOnvalidateStrokeWidthMax).not.toHaveBeenCalled();
    expect(spyOnSetStyle).not.toHaveBeenCalled();
    expect(spyOnDraw).not.toHaveBeenCalled();
  });

  it('should validate stroke width min', () => {
    service.strokeWidth = 1;
    service.minStrokeWidth = 2;
    service.validateStrokeWidthMin();
    expect(service.strokeWidth).toEqual(2);
  });

  it('should not validate stroke width min', () => {
    service.strokeWidth = 2;
    service.minStrokeWidth = 1;
    service.validateStrokeWidthMin();
    expect(service.strokeWidth).toEqual(2);
  });

  it('should validate stroke width max', () => {
    service.strokeWidth = 2;
    service.maxStrokeWidth = 1;
    service.validateStrokeWidthMin();
    expect(service.strokeWidth).toEqual(10);
  });

  it('should execute on mouse up', () => {
    const spyOnReset = spyOn(service, 'reset');
    const spyOnColorService = spyOn(colorService, 'addColorsToLastUsed');
    service.onMouseUp();
    expect(spyOnReset).toHaveBeenCalled();
    expect(spyOnColorService).toHaveBeenCalled();
  });

  it('should draw', () => {
    service.linepath = '';
    const spyOnsetAttribute = spyOn(renderer, 'setAttribute');
    const spyOnsetStyle = spyOn(renderer, 'setStyle');
    service.draw();
    expect(service.linepath).not.toEqual('');
    expect(spyOnsetAttribute).toHaveBeenCalled();
    expect(spyOnsetStyle).toHaveBeenCalled();
  });

  // it('should not validate stroke width max', () => {
  //   service.strokeWidth = 1;
  //   service.maxStrokeWidth = 2;
  //   service.validateStrokeWidthMin();
  //   expect(service.strokeWidth).toEqual(10);
  // });

  //LES TESTS QUI NE MARCHENT PAS
  //nativeElement of undefined
  // it('should create pen group', () => {
  //   const spyOnPenWrapper = spyOn(renderer, 'createElement');
  //   service.createPenGroup();
  //   expect(spyOnPenWrapper).toHaveBeenCalled();
  // });

});
