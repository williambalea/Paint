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
    const spy = spyOn(service, 'onMouseDown');
    service.onMouseDown();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onMouseMove()', () => {
    const spy = spyOn(service, 'onMouseMove');
    service.onMouseMove();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onMouseUp()', () => {
    const spy = spyOn(service, 'onMouseUp');
    service.onMouseUp();
    expect(spy).toHaveBeenCalled();
  });

});
