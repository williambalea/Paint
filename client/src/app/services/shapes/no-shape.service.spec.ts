import { TestBed } from '@angular/core/testing';

import { NoShapeService } from './no-shape.service';

describe('NoShapeService', () => {
  let service: NoShapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
  }).compileComponents();
    service = TestBed.get(NoShapeService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call onMouseDown()', () => {
    const vari = service.onMouseDown();
    expect(vari).not.toBeDefined();
  });

  it('should call onMouseMove()', () => {
    const vari = service.onMouseMove();
    expect(vari).not.toBeDefined();
  });

  it('should call onMouseUp()', () => {
    const vari = service.onMouseUp();
    expect(vari).not.toBeDefined();
  });

});
