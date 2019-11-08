import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ACTIONS } from 'src/constants';
import { UndoRedoService } from './undo-redo.service';
import { UndoRedoAction } from './undoRedoAction';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
}

describe('UndoRedoService', () => {
  let service: UndoRedoService;
  let rendererFactory: RendererFactory2;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UndoRedoService,
        // ColorService,
        // InputService,
        { provide: Renderer2, useClass: RendererMock },
        // { provide: InputService, useClass: InputServiceMock },
        // { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(UndoRedoService);
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

  // it('append on undo', () => {

  // });


});
