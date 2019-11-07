import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GridService } from './grid.service';


describe('GridService', () => {
  let service: GridService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GridService,
        // { provide: Renderer2, useClass: RendererMock },
      ],
    }).compileComponents();
    service = TestBed.get(GridService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);  });

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
});
