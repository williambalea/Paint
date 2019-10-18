import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { PenService } from './pen.service';

fdescribe('PenService', () => {
  let service: PenService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PenService,
        ColorService,
        InputService,
        Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(PenService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call onMouseDown() upon mouse click', () => {
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
    const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();

    service.onMouseDown();

    expect(service.active).toEqual(true);

    expect(getFillColorSpy).toHaveBeenCalled();
    expect(service.stroke).toEqual(jasmine.any(String));

    expect(createElementSpy).toHaveBeenCalled();
    // expect(service.path).toEqual(jasmine.any(Path));

    expect(setStyleSpy).toHaveBeenCalled();
    expect(setAttributeSpy).toHaveBeenCalled();
  });
  it('Should call onMouseMove() upon mouse movement', () => {
    const drawSpy = spyOn(service, 'draw').and.callThrough();

    service.active = true;
    service.onMouseMove();
    if (service.active) {
      expect(drawSpy).toHaveBeenCalled();
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
  it('Should call draw() and child functions', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();

    service.draw();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
  });
});
