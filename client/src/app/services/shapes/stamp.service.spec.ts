import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { StampService } from './stamp.service';

class InputServiceMock {
  getMouse(): any {return {x: 0, y: 0}; }
}

describe('StampService', () => {
  let inputService: InputService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  let service: StampService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ColorService,
        { provide: InputService, useClass: InputServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(StampService);
    inputService = TestBed.get(InputService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // MARCHE PAS NATIVE ELEMENT
  // it('should draw and render upon mouse down', () => {
  //   const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
  //   const drawSpy = spyOn(service, 'draw');
  //   service.selectStampIndex = 1;
  //   service.onMouseDown();
  //   expect(service.selectStampIndex).not.toBeUndefined();
  //   expect(createElementSpy).toHaveBeenCalled();
  //   expect(drawSpy).toHaveBeenCalled();
  // });

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
    const setAttributeSpy = spyOn(renderer, 'setAttribute');
    // const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    const mockAngle = 1;
    inputService.stampAngle = mockAngle;
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    // expect(getMouseSpy).toHaveBeenCalled();
  });
});
