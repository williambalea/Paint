import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { PencilService } from './pencil.service';

describe('PencilService', () => {
  let service: PencilService;
  let colorService: ColorService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  let viewChildService: ViewChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PencilService,
        ColorService,
        InputService,
        ViewChildService,
      ],
    }).compileComponents();
    service = TestBed.get(PencilService);
    colorService = TestBed.get(ColorService);
    viewChildService = TestBed.get(ViewChildService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should put to default attributes upon reset', () => {
    service.reset();
    expect(service.stroke).toEqual('');
    expect(service.active).toEqual(false);
  });

  it('should call onMouseDown() upon mouse click', () => {
    viewChildService.canvas = new ElementRef(renderer.createElement('rect', 'svg'));
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    service.linepath = '';
    service.onMouseDown();
    expect(service.active).toEqual(true);
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(service.stroke).toEqual(jasmine.any(String));
    expect(createElementSpy).toHaveBeenCalled();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(service.linepath).not.toEqual('');
  });

  it('Should call onMouseMove upon mouse movement', () => {
    const drawSpy = spyOn(service, 'draw');
    service.active = true;
    service.onMouseMove();
    expect(drawSpy).toHaveBeenCalled();
  });

  it('Should not call draw on mouse move', () => {
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.active = false;
    service.onMouseMove();
    if (service.active) {
      expect(drawSpy).not.toHaveBeenCalled();
    }
  });

  it('Should call onMouseUp() upon mouse click released', () => {
    const resetSpy = spyOn(service, 'reset').and.callThrough();
    const addColorsSpy = spyOn(colorService, 'addColorsToLastUsed').and.callThrough();
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();

    service.onMouseUp();
    expect(resetSpy).toHaveBeenCalled();
    expect(addColorsSpy).toHaveBeenCalled();
    expect(getFillColorSpy).toHaveBeenCalled();
  });

  it('should draw', () => {
    service.linepath = '';
    const setAttributeSpy = spyOn(renderer, 'setAttribute');
    service.draw();
    expect(service.linepath).not.toEqual('');
    expect(setAttributeSpy).toHaveBeenCalled();
  });

});
