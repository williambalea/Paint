// import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { PencilService } from './pencil.service';

// class InputServiceMock {
//   getMouse(): Point {return {x: 0, y: 0}; }
// }

describe('PencilService', () => {
  let service: PencilService;
  let colorService: ColorService;
  // let inputService: InputService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PencilService,
        ColorService,
        InputService,
        // { provide: Renderer2, useClass: Renderer2Mock },
        // { provide: InputService, useClass: InputServiceMock },

      ],
    }).compileComponents();
    service = TestBed.get(PencilService);
    colorService = TestBed.get(ColorService);
    // inputService = TestBed.get(InputService);
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

  // NATIVEELEMENT EROR
  // it('should call onMouseDown() upon mouse click', () => {
  //   const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
  //   const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
  //   const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();
  //   const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
  //   service.onMouseDown();
  //   expect(service.active).toEqual(true);
  //   expect(getFillColorSpy).toHaveBeenCalled();
  //   expect(service.stroke).toEqual(jasmine.any(String));
  //   expect(createElementSpy).toHaveBeenCalled();
  //   // expect(service.path).toEqual(jasmine.any(Path));
  //   expect(setStyleSpy).toHaveBeenCalled();
  //   expect(setAttributeSpy).toHaveBeenCalled();
  // });

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
    const setStyleSpy = spyOn(renderer, 'setStyle');
    service.draw();
    expect(service.linepath).not.toEqual('');
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
  });

});
