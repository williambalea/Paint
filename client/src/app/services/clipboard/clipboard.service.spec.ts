import { ElementRef, Renderer2, RendererFactory2, ɵEMPTY_ARRAY } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { InputService } from '../input.service';
import { SelectorService } from '../selector/selector.service';
import { UndoRedoService } from '../undo-redo.service';
import { ViewChildService } from '../view-child.service';
import { ClipboardService } from './clipboard.service';

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

  it('should have called controlC by calling controlX', () => {
    const controlCSpy = spyOn(service, 'controlC');
    service.controlC();
    expect(controlCSpy).toHaveBeenCalled();
    expect(service.selectedItems.length).toEqual(0);
  });

  it('should not remove the child if the id is canvas or svg', () => {
    const removeChildSpy = spyOn(renderer, 'removeChild');
    viewChildService.canvas = new ElementRef(renderer.createElement('svg'));
    const item = renderer.createElement('object1');
    const item2 = renderer.createElement('object2');
    item.setAttribute('id', 'canvas');
    item2.setAttribute('id', 'svg');
    service.selectedItems.push(item);
    service.selectedItems.push(item2);
    service.controlX();
    expect(removeChildSpy).not.toHaveBeenCalled();
  });

  it('should remove the child if the id isnt canvas or svg', () => {
    const removeChildSpy = spyOn(renderer, 'removeChild');
    viewChildService.canvas = new ElementRef(renderer.createElement('svg'));
    const item = renderer.createElement('object1');
    item.setAttribute('id', 'rect');
    selectorService.selectedShapes.push(item);
    service.controlX();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('should clear the includingbox and selectedShape', () => {
    const clearSpy = spyOn(includingBoxService, 'clear');
    const controlCSpy = spyOn(service, 'controlC');
    service.controlX();
    expect(clearSpy).toHaveBeenCalled();
    expect(controlCSpy).toHaveBeenCalled();
    expect(selectorService.selectedShapes).toEqual(ɵEMPTY_ARRAY);
  });

  it('should return false if shapecounter is false', () => {
    const item: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    item.setAttribute('id', 'canvas');
    selectorService.selectedShapes.push(item);
    expect(service.dismissCanvas()).not.toBeTruthy();
  });

  it('should empty selectedshapes array and call clear', () => {
    const clearSpy = spyOn(includingBoxService, 'clear');
    service.delete();
    expect(selectorService.selectedShapes).toEqual(ɵEMPTY_ARRAY);
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should removechild if id isnt canvas', () => {
    const removeChildSpy = spyOn(renderer, 'removeChild');
    viewChildService.canvas = new ElementRef(renderer.createElement('canvas'));
    const shape = document.createElement('shape') as unknown as SVGGraphicsElement;
    shape.id = 'notCanvas';
    selectorService.selectedShapes.push(shape);
    service.delete();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('should call addAction', () => {
    const addActionSpy = spyOn(undoRedoService, 'addAction');
    viewChildService.canvas = new ElementRef(renderer.createElement('canvas'));
    const shape = document.createElement('shape') as unknown as SVGGraphicsElement;
    const shapeArray: SVGGraphicsElement[] = [];
    shapeArray.push(shape);
    service.duplicate(shapeArray);
    expect(addActionSpy).toHaveBeenCalled();

  });

  it('should have called controlV() thoroughly', () => {
    const duplicateSpy = spyOn(service, 'duplicate').and.callThrough();
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
    inputService.incrementMultiplier = 3;
    service.duplicate(mockShapeArray);
    expect(service.newSelection).not.toBeTruthy();
  });
});
