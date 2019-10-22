import { TestBed } from '@angular/core/testing';

import { EventEmitterService } from './event-emitter.service';

describe('EventEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    expect(service).toBeTruthy();
  });

  it('should emit showgrid', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    const spyEmit = spyOn(service.showGridEmitter, 'emit');
    service.showGrid();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should emit hideGrid', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    const spyEmit = spyOn(service.hideGridEmitter, 'emit');
    service.hideGrid();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should emit sendSVGToServer', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    const spyEmit = spyOn(service.sendSVGToServerEmitter, 'emit');
    service.sendSVGToServer();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should emit appendToDrawingSpace', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    const spyEmit = spyOn(service.appendToDrawingSpaceEmitter, 'emit');
    service.appendToDrawingSpace();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should emit select', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    const spyEmit = spyOn(service.selectEmitter, 'emit');
    service.select();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should emit clearCanvas', () => {
    const service: EventEmitterService = TestBed.get(EventEmitterService);
    const spyEmit = spyOn(service.clearCanvasEmitter, 'emit');
    service.clearCanvas();
    expect(spyEmit).toHaveBeenCalled();
  });
});
