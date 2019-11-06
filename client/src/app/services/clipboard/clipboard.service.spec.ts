import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExportModalComponent } from 'src/app/export-modal/export-modal.component';
import { Rectangle } from 'src/Classes/Shapes/rectangle';
import { Shape } from 'src/Classes/Shapes/shape';
import { SelectorService } from '../selector/selector.service';
import { ShapesService } from '../shapes/shapes.service';
import { ClipboardService } from './clipboard.service';
import { TOOL } from 'src/constants';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
  appendChild(): void {return; }
  removeChild(): void {return; }
}

describe('ClipboardService', () => {
  let service: ClipboardService;
  let rendererMock: Renderer2;
  let selectorService: SelectorService;
  let mockShape: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClipboardService,
        SelectorService,
        { provide: Renderer2, useClass: RendererMock },
      ],
    }).compileComponents();
    service = TestBed.get(ClipboardService);
    rendererMock = TestBed.get(Renderer2);
    selectorService = TestBed.get(SelectorService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true because there is a selection', () => {
    selectorService.selectedShapes.push(mockShape);
    expect(service.findSelected()).toBeTruthy();
  });

  it('should return false because there is no selection', () => {
    selectorService.selectedShapes = [];
    expect(service.findSelected()).not.toBeTruthy();
  });

  it('should return false because the clipboard does not hold any shape', () => {
    selectorService.selectedShapes = [];
    expect(service.findSelected()).not.toBeTruthy();
  });

  it('should return true because the clipboard holds shapes', () => {
    service.selectedItems.push(mockShape);
    expect(service.clipboardEmpty()).not.toBeTruthy();
  });

  it('should return true because the clipboard holds shapes', () => {
    service.selectedItems.push(mockShape);
    expect(service.clipboardEmpty()).not.toBeTruthy();
  });



});
