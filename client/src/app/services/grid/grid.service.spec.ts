import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ViewChildService } from '../view-child.service';
import { GridService } from './grid.service';

describe('GridService', () => {
  let service: GridService;
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
    service = TestBed.get(GridService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
    service.draw(service.gridSize);
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

  it('Should append a child when showing grid', () => {
    const appendChildSpy = spyOn(renderer, 'appendChild');
    service.showGrid();
    expect(appendChildSpy).toHaveBeenCalled();
  });

  it('Should remove a child when showing grid', () => {
    const removeChildSpy = spyOn(renderer, 'removeChild');
    service.showGrid();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('Should call the draw function when showing grid', () => {
    const drawSpy = spyOn(service, 'draw');
    service.showGrid();
    expect(drawSpy).toHaveBeenCalled();
  });
});
