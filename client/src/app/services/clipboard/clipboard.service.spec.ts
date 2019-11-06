import { Renderer2, RendererFactory2, ɵEMPTY_ARRAY } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { InputService } from '../input.service';
import { SelectorService } from '../selector/selector.service';
import { UndoRedoService } from '../undo-redo.service';
import { ViewChildService } from '../view-child.service';
import { ClipboardService } from './clipboard.service';
class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
  appendChild(): void {return; }
  removeChild(one: any, two: any): void {return; }
}
// tslint:disable-next-line: max-classes-per-file
class RendererFactoryMock {
    createRenderer(): void {return; }
  }

  // tslint:disable-next-line: max-classes-per-file
class ViewChildServiceMock {
    canvas: any = '';
  }

describe('ClipboardService', () => {
  let service: ClipboardService;
  let selectorService: SelectorService;
  let includingBoxService: IncludingBoxService;
  let undoRedoService: UndoRedoService;
  let renderer: Renderer2;
  let inputService: InputService;
  let viewChildService: ViewChildService;

  const mockShape: any = {id: 'shape'};
  let mockShapeArray: any[] = [];
  let mockShapes: SVGGraphicsElement[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClipboardService,
        SelectorService,
        RendererFactory2,
        ViewChildService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: RendererFactory2, useClass: RendererFactoryMock },
        { provide: ViewChildService, useClass: ViewChildServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(ClipboardService);
    selectorService = TestBed.get(SelectorService);
    includingBoxService = TestBed.get(IncludingBoxService);
    undoRedoService = TestBed.get(UndoRedoService);
    renderer = TestBed.get(Renderer2);
    inputService = TestBed.get(InputService);
    viewChildService = TestBed.get(ViewChildService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find a selection if an object is targeted', () => {
    selectorService.selectedShapes.push(mockShape);
    expect(service.findSelected()).toBeTruthy();
  });

  it('should not find a selection if no object is targeted', () => {
    selectorService.selectedShapes = [];
    console.log(selectorService.selectedShapes);
    console.log(service.dismissCanvas());
    expect(service.findSelected()).not.toBeTruthy();
  });

  it('should find that the clipboard is empty', () => {
    service.selectedItems = [];
    expect(service.clipboardEmpty()).toBeTruthy();
  });

  it('should find that the clipboard is empty', () => {
    service.selectedItems.push(mockShape);
    expect(service.clipboardEmpty()).not.toBeTruthy();
  });

  it('should have called controlC() thoroughly', () => {
    const controlCSpy = spyOn(service, 'controlC');
    service.controlC();

    expect(controlCSpy).toHaveBeenCalled();
    expect(service.selectedItems.length).toEqual(0);
  });

  it('should have called controlA() thoroughly', () => {
    const updateSpy = spyOn(includingBoxService, 'update');
    viewChildService.canvas.nativeElement = [];
    service.controlA();
    expect(service.selectedItems.length).toEqual(selectorService.selectedShapes.length);

    expect(updateSpy).toHaveBeenCalled();
    expect(service.selectedItems.length).toEqual(0);
    expect(service.newSelection).toBeTruthy();
  });

  it('should have called controlX() thoroughly', () => {
    const controlCSpy = spyOn(service, 'controlC');
    const clearSpy = spyOn(includingBoxService, 'clear');
    service.controlX();

    expect(controlCSpy).toHaveBeenCalled();
    expect(selectorService.selectedShapes.length).toEqual(0);
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should have called delete() thoroughly', () => {
    const rendererMockSpy = spyOn(renderer, 'removeChild');
    const clearSpy = spyOn(includingBoxService, 'clear');
    selectorService.selectedShapes.push(mockShape);
    service.delete();
    expect(rendererMockSpy).toHaveBeenCalled();
    expect(selectorService.selectedShapes.length).toEqual(0);
    console.log(selectorService.selectedShapes);
    expect(selectorService.selectedShapes).toEqual(ɵEMPTY_ARRAY);
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should have called controlV() thoroughly', () => {
    const duplicateSpy = spyOn(service, 'duplicate');

    service.controlV();
    expect(duplicateSpy).toHaveBeenCalled();
    expect(undoRedoService.poppedActions.length).toEqual(0);
  });

  it('should have called controlD() thoroughly', () => {
    const duplicateSpy = spyOn(service, 'duplicate');
    service.controlD();
    expect(duplicateSpy).toHaveBeenCalled();
    expect(undoRedoService.poppedActions.length).toEqual(0);
  });

  it('should enter newSelection statement', () => {
    service.newSelection = true;
    mockShapes.push(mockShape);
    inputService.incrementMultiplier = 3; // remove when inputcalled
    service.duplicate(mockShapeArray);
    expect(service.newSelection).not.toBeTruthy();
  });

  it('should add action upon duplicating', () => {
    const addActionSpy = spyOn(undoRedoService, 'addAction');
    mockShapes.push(mockShape);
    service.duplicate(mockShapes);
    expect(addActionSpy).toHaveBeenCalled();
  });

});
