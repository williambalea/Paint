import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UndoRedoService } from './undo-redo.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
}

describe('UndoRedoService', () => {
  let service: UndoRedoService;

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
    // rendererFactory = TestBed.get(RendererFactory2);
    // renderer = rendererFactory.createRenderer(null, null);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
