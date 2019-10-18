import { TestBed } from '@angular/core/testing';
import { GridService } from './grid.service';

describe('GridService', () => {
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GridService,
      ],
    }).compileComponents();
    service = TestBed.get(GridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should set a numeral grid size', () => {
    expect(service.gridSize).toEqual(jasmine.any(Number));
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
    expect(service.opacity).toBeLessThanOrEqual(1);
  });
  it('Should set a numeral grid size', () => {
    expect(service.gridSize).toEqual(jasmine.any(Number));
    expect(service.gridSize).toBeGreaterThanOrEqual(40);
    expect(service.gridSize).toBeLessThanOrEqual(200);
  });
  it('Should build a grid with expected parameters', () => {
    service.gridSize = 50;
    service.draw(service.gridSize);
    expect(service.gridSize).toEqual(50);
    /* add more logic */
  });
});
