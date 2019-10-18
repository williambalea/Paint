import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { LineService } from './line.service';

fdescribe('LineService', () => {
  let service: LineService;
  let colorService: ColorService;
  // let inputService: InputService;
  // let renderer2: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LineService,
        ColorService,
        InputService,
        Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(LineService);
    colorService = TestBed.get(ColorService);
    //inputService = TestBed.get(InputService);
    // renderer2 = TestBed.get(Renderer2);
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

  it('should call isactive on mouse mouse', () => {
    service.active = true;
    const spyOnIsActive = spyOn(service, 'isActive');
    service.onMouseMove();
    expect(spyOnIsActive).toHaveBeenCalled();
  });

});
