import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { InputService } from '../input.service';
import { SelectorService } from '../selector/selector.service';
import { UndoRedoService } from '../undo-redo.service';
import { ViewChildService } from '../view-child.service';
import { ClipboardService } from './clipboard.service';
// class RendererMock {
//   createElement(): void {return; }
//   setStyle(): void {return; }
//   setAttribute(): void {return; }
//   appendChild(): void {return; }
//   removeChild(one: any, two: any): void {return; }
// }
// // tslint:disable-next-line: max-classes-per-file
// class RendererFactoryMock {
//     createRenderer(): void {return; }
//   }

//   // tslint:disable-next-line: max-classes-per-file
// class ViewChildServiceMock {
//     canvas: any = '';
//   }

describe('ClipboardService', () => {
  let service: ClipboardService;
  let selectorService: SelectorService;
  let includingBoxService: IncludingBoxService;
  let undoRedoService: UndoRedoService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  let inputService: InputService;
  let viewChildService: ViewChildService;

  const mockShape: any = {id: 'shape'};
  const mockShapeArray: any[] = [];
  const mockShapes: SVGGraphicsElement[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClipboardService,
        SelectorService,
        ViewChildService,
        InputService,
        Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(ClipboardService);
    selectorService = TestBed.get(SelectorService);
    includingBoxService = TestBed.get(IncludingBoxService);
    undoRedoService = TestBed.get(UndoRedoService);
    inputService = TestBed.get(InputService);
    viewChildService = TestBed.get(ViewChildService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
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
    expect(service.clipboardEmpty()).not.toBeTruthy();
  });

  it('should find that the clipboard is not empty', () => {
    service.selectedItems.push(mockShape);
    expect(service.clipboardEmpty()).toBeTruthy();
  });

  it('should have called controlC() thoroughly', () => {
    const controlCSpy = spyOn(service, 'controlC');
    service.controlC();
    expect(controlCSpy).toHaveBeenCalled();
    expect(service.selectedItems.length).toEqual(0);
  });

  it('should have called controlA() thoroughly', () => {
    const svg = renderer.createElement('svg');
    includingBoxService.boxUpperLeft.x = 2;
    includingBoxService.boxUpperLeft.y = 2;
    viewChildService.canvas = new ElementRef(svg);
    service.controlA();
    expect(service.newSelection).toBeTruthy();
    expect(service.cloningPosition.x).toEqual(1);
    expect(service.cloningPosition.x).toEqual(1);

  });

  it('should have called controlX() thoroughly', () => {
    const svg = renderer.createElement('notsvg');
    service.selectedItems.push(svg);
    viewChildService.canvas = new ElementRef(svg);
    const removeChildMock = spyOn(renderer, 'removeChild');
    const controlCSpy = spyOn(service, 'controlC');

    service.controlX();
    expect(removeChildMock).toHaveBeenCalled();
    expect(controlCSpy).toHaveBeenCalled();
  });

  it('should have called delete() thoroughly', () => {
    const svg = renderer.createElement('svg');
    svg.setAttribute('id', 'notsvg');
    console.log(svg);
    const removeChildSpy = spyOn(renderer, 'removeChild');
    viewChildService.canvas = new ElementRef(svg);
    selectorService.selectedShapes.push(svg);
    service.delete();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(selectorService.selectedShapes.length).toEqual(0);
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
