import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../../../../../common/interface/point';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { BrushService } from './brush.service';

describe('BrushService', () => {
  let service: BrushService;
  let colorService: ColorService;
  let inputService: InputService;
  let viewChildService: ViewChildService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  class InputServiceMock {
    getMouse(): Point {return {x: 1, y: 2}; }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrushService,
        ColorService,
        InputService,
        Renderer2,
        { provide: InputService, useClass: InputServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(BrushService);
    viewChildService = TestBed.get(ViewChildService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should put to default attributes upon reset()', () => {
    service.reset();
    expect(service.linepath).toEqual('');
    expect(service.stroke).toEqual('');
    expect(service.fillColor).toEqual(jasmine.any(String));
    expect(service.active).toEqual(false);
  });

  it('Should call child functions upon mouseDown', () => {
    viewChildService.canvas = new ElementRef('allo');
    const addColorSpy = spyOn(colorService, 'addColorsToLastUsed');
    const getFillColorSpy = spyOn(colorService, 'getFillColor');
    const createElementSpy = spyOn(renderer, 'createElement');
    const appendChildSpy = spyOn(renderer, 'appendChild');
    const drawSpy = spyOn(service, 'draw');
    service.onMouseDown();
    expect(inputService.getMouse().x).toEqual(1);
    expect(inputService.getMouse().y).toEqual(2);
    expect(addColorSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();
    expect(service.active).toEqual(true);
  });

  it('Should call child functions upon mouseMove', () => {
    const drawSpy = spyOn(service, 'draw');

    service.active = true;
    service.onMouseMove();
    if (service.active) {
      expect(drawSpy).toHaveBeenCalled();
    }
  });

  it('Should not call draw on mouse move', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const drawSpy = spyOn(service, 'draw').and.callThrough();
    service.active = false;
    service.onMouseMove();
    if (service.active) {
      expect(getMouseSpy).not.toHaveBeenCalled();
      expect(drawSpy).not.toHaveBeenCalled();
    }
  });

  it('Should call child functions upon mouseUp', () => {
    const resetSpy = spyOn(service, 'reset').and.callThrough();
    service.onMouseUp();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('Should reset attributes upon reset()', () => {
    service.reset();
    expect(service.linepath).toEqual('');
    expect(service.stroke).toEqual('');
    expect(service.fillColor).toEqual(jasmine.any(String));
    expect(service.active).toEqual(false);
  });

  it('Should change primary color', () => {
    const black  = 'black';
    service.changePrimaryColor(black);
    expect(service.fillColor).toEqual('black');
    expect(service.fillColor).toEqual(jasmine.any(String));
  });

  it('Should change secondary color', () => {
    const black  = 'black';
    service.changeSecondaryColor(black);
    expect(service.stroke).toEqual('black');
    expect(service.stroke).toEqual(jasmine.any(String));
  });

  it('Should change filter', () => {
    const filterValue  = 'stringValue';
    service.changeFilter(filterValue);
    expect(service.filter).toEqual('url(#' + 'stringValue' + ')');
    expect(service.filter).toEqual(jasmine.any(String));
  });

  it('Should call draw() and child functions', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute');
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
  });
});
