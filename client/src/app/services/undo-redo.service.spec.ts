import { Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ACTIONS } from 'src/constants';
import { UndoRedoService } from './undo-redo.service';
import { UndoRedoAction } from './undoRedoAction';
import { ViewChildService } from './view-child.service';
import { InputService } from './input.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
}

describe('UndoRedoService', () => {
  let service: UndoRedoService;
  let rendererFactory: RendererFactory2;
  let renderer: Renderer2;
  let viewChildService: ViewChildService;
  let inputService: InputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UndoRedoService,
        ViewChildService,
        InputService,
        // ColorService,
        // InputService,
        { provide: Renderer2, useClass: RendererMock },
        // { provide: InputService, useClass: InputServiceMock },
        // { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(UndoRedoService);
    viewChildService = TestBed.get(ViewChildService);
    inputService = TestBed.get(InputService);
    // colorService = TestBed.get(ColorService);
    // inputService = TestBed.get(InputService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add action', () => {
    const spyOnPush = spyOn(service.actions, 'push');
    const action: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.addAction(action);
    expect(spyOnPush).toHaveBeenCalled();
  });

  it('should append on undi', () => {
    viewChildService.canvas = new ElementRef('allo');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    const spyOnremoveChild = spyOn(renderer, 'removeChild');
    const spyOnpush = spyOn(service.poppedActions, 'push');
    const spyOnvValidateIncrement = spyOn(service, 'validateIncrement');
    service.appendOnUndo(lastAction);
    expect(spyOnremoveChild).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
    expect(spyOnvValidateIncrement).toHaveBeenCalled();
  });

  it('should validate increment', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.validateIncrement(lastAction);
    expect(inputService.incrementMultiplier).toEqual(1);
  });

  it('should remove on undo', () => {
    viewChildService.canvas = new ElementRef('allo');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    const spyOnappendChild = spyOn(renderer, 'appendChild');
    const spyOnpush = spyOn(service.poppedActions, 'push');
    service.removeOnUndo(lastAction);
    expect(spyOnappendChild).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });
});
