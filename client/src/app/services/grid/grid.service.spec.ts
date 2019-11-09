import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ViewChildService } from '../view-child.service';
import { GridService } from './grid.service';

describe('GridService', () => {
  let service: GridService;
  let viewChildService: ViewChildService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GridService,
        ViewChildService,
        // { provide: Renderer2, useClass: RendererMock },
      ],
    }).compileComponents();
    viewChildService = TestBed.get(ViewChildService);
    service = TestBed.get(GridService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hide child', () => {
    viewChildService.drawingBoard = new ElementRef('allo');
    const spyOnremoveChildt = spyOn(renderer, 'removeChild');
    service.hideGrid();
    expect(spyOnremoveChildt).toHaveBeenCalled();
  });

  it('Should append a child when showing grid', () => {
    viewChildService.drawingBoard = new ElementRef('allo');
    const appendChildSpy = spyOn(renderer, 'appendChild');
    const spyOnremoveChildt = spyOn(renderer, 'removeChild');
    const spydraw = spyOn(service, 'draw');
    service.showGrid();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(spyOnremoveChildt).toHaveBeenCalled();
    expect(spydraw).toHaveBeenCalled();
  });

  it('Should set a numeral grid size', () => {
    const size = 10;
    service.setGridSize(size);
    expect(service.gridSize).toEqual(jasmine.any(Number));
    expect(service.gridSize).toEqual(size);
  });

  it('Should set a numeral width', () => {
    expect(service.width).toEqual(jasmine.any(Number));
    expect(service.width).toBeGreaterThan(0);
  });

  it('Should set a numeral height', () => {
    expect(service.height).toEqual(jasmine.any(Number));
    expect(service.height).toBeGreaterThan(0);
  });

  it('Should set a numeral opacity', () => {
    expect(service.opacity).toEqual(jasmine.any(Number));
    expect(service.opacity).toBeGreaterThanOrEqual(0);
    expect(service.opacity).toBeLessThanOrEqual(100);
  });

  it('Should set a numeral grid size', () => {
    expect(service.gridSize).toEqual(jasmine.any(Number));
    expect(service.gridSize).toBeGreaterThanOrEqual(40);
    expect(service.gridSize).toBeLessThanOrEqual(200);
  });

  it('Should build a grid with expected parameters', () => {
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();
    const appendChildSpy = spyOn(renderer, 'appendChild').and.callThrough();

    service.gridSize = 50;
    service.draw();
    expect(createElementSpy).toHaveBeenCalled();
    expect(service.gridSize).toEqual(50);
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
  });

  it('Should set gridSize at a minimum of forty', () => {
    service.gridSize = 30;
    service.setLastGridSize();
    expect(service.gridSize).toEqual(40);
  });

  it('Should decrease gridSize if restOfDivision statement enterered', () => {
    service.gridSize = 61;
    service.setLastGridSize();
    expect(service.gridSize).toEqual(60);
  });

  it('Should cap gridSize to 200', () => {
    service.gridSize = 201;
    service.setNextGridSize();
    expect(service.gridSize).toEqual(200);
  });

  it('Should increment gridSize by 5 if divided by multiple of 5', () => {
    service.gridSize = 150;
    service.setNextGridSize();
    expect(service.gridSize).toEqual(155);
  });
});
