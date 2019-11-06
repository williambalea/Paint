import { TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { UndoRedoService } from './undo-redo.service';

describe('UndoRedoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Renderer2,
    ],
  }));

  it('should be created', () => {
    const service: UndoRedoService = TestBed.get(UndoRedoService);
    expect(service).toBeTruthy();
  });
});
