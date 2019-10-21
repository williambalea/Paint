import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { BrushService } from './brush.service';

class Renderer2Mock {
  setAttribute(): void {return; }
  setStyle(): void {return; }
}

describe('BrushService', () => {
  let service: BrushService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrushService,
        ColorService,
        InputService,
        { provide: Renderer2, useClass: Renderer2Mock },
      ],
    }).compileComponents();
    service = TestBed.get(BrushService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
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
    const addColorSpy = spyOn(colorService, 'addColorsToLastUsed').and.callThrough();
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.onMouseDown();

    expect(addColorSpy).toHaveBeenCalled();
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalled();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();
    expect(service.active).toEqual(true);
  });
  it('Should call child functions upon mouseMove', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.active = true;
    service.onMouseMove();
    if (service.active) {
      expect(getMouseSpy).toHaveBeenCalled();
      expect(drawSpy).toHaveBeenCalled();
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
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();

    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
  });
});
