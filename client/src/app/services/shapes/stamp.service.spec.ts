import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { StampService } from './stamp.service';

class RendererMock {
  createElement(): void {return; }
  setAttribute(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  getMouse(): any {return {x: 0, y: 0}; }
}

describe('StampService', () => {
  let inputService: InputService;
  let renderer: Renderer2;
  let service: StampService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ColorService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(StampService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should draw and render upon mouse down', () => {
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
    const drawSpy = spyOn(service, 'draw');

    service.selectStampIndex = 1;
    service.onMouseDown();
    expect(service.selectStampIndex).not.toBeUndefined();
    expect(createElementSpy).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalled();

  });

  it('should not draw or render upon mouse down', () => {
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
    const drawSpy = spyOn(service, 'draw');

    service.onMouseDown();
    expect(service.selectStampIndex).toBeUndefined();
    expect(createElementSpy).not.toHaveBeenCalled();
    expect(drawSpy).not.toHaveBeenCalled();
    expect(service.stamp).toBeUndefined();
  });

  it('should assign x,y positions upon mouse movement', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();

    service.onMouseMove();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(service.position.x).toEqual(jasmine.any(Number));
    expect(service.position.x).toEqual(jasmine.any(Number));
  });

  it('should select a specific stamp linked to its index', () => {
    const image = 'imageString';
    const index = 1;
    service.selectStamp(image, index);

    expect(service.selectedStamp).toEqual(image);
    expect(service.selectStampIndex).toEqual(index);
  });

  it('should not do anything upon releasing mouse click', () => {
    const returnValue = service.onMouseUp();
    expect(returnValue).toBeUndefined();
  });

  it('should set attributes through renderer upon calling draw() ', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const mockAngle = 1;
    inputService.stampAngle = mockAngle;
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(getMouseSpy).toHaveBeenCalled();
  });
});
