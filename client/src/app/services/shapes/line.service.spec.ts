import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { LineService } from './line.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  backSpacePressed = false;
  getMouse(): void {return; }
}

fdescribe('LineService', () => {
  let service: LineService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LineService,
        ColorService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(LineService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset attributes', () => {
    service.start = false;
    service.stroke = 'test';
    service.active = true;
    service.linepath = 'test';
    service.savedPath = 'test';
    service.positions = [{x: 3, y: 1}];

    service.reset();
    expect(service.start).toEqual(true);
    expect(service.stroke).toEqual('');
    expect(service.active).toEqual(false);
    expect(service.linepath).toEqual('');
    expect(service.savedPath).toEqual('');
    expect(service.positions).toEqual([]);
  });

  it('should execute functions on mouse down', () => {
    service.active = false;
    const spyOnGetFillCollor = spyOn(colorService, 'getFillColor');
    const spyOnvalidationToCreatePath = spyOn(service, 'validationToCreatePath');
    const spyOnSetStyle = spyOn(service, 'setStyle');
    const spyOnDraw = spyOn(service, 'draw');

    service.onMouseDown();
    expect(service.positions.length).toEqual(1);
    expect(service.active).toEqual(true);
    expect(spyOnGetFillCollor).toHaveBeenCalled();
    expect(spyOnvalidationToCreatePath).toHaveBeenCalled();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnDraw).toHaveBeenCalled();
  });

  it('Should validate and call fucntion to create path', () => {
    service.start = true;
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    service.validationToCreatePath();
    expect(spyOnCreateElement).toHaveBeenCalled();
  });

  it('should set style', () => {
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    const spyOnvalidateJunctionStyle = spyOn(service, 'validateJunctionStyle');
    service.setStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
    expect(spyOnvalidateJunctionStyle).toHaveBeenCalled();
  });

  it ('should call setStyle if dot is a selected junction', () => {
    service.junctionStyle = 'dot';
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateJunctionStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should call setStyle if angeled is a selected junction', () => {
    service.junctionStyle = 'miter';
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateJunctionStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should call setStyle if round is a selected junction', () => {
    service.junctionStyle = 'round';
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.validateJunctionStyle();
    expect(spyOnSetStyle).toHaveBeenCalled();
  });

  it ('should call isActive on mouse move', () => {
    service.active = true;
    const spyOnIsActive = spyOn(service, 'isActive');
    service.onMouseMove();
    expect(spyOnIsActive).toHaveBeenCalled();
  });

  it ('should call isBackSpacePressed() on mouse move', () => {
    inputService.backSpacePressed = true;
    const spyOnIsBackSpacePressed = spyOn(service, 'isBackSpacePressed');
    service.onMouseMove();
    expect(spyOnIsBackSpacePressed).toHaveBeenCalled();
  });

});
