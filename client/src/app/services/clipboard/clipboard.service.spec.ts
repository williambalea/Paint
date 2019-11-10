import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
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

  it('should clone the node when generating a shape', () => {
    viewChildService.canvas = new ElementRef(renderer.createElement('svg'));
    const shapeCopy: SVGGraphicsElement[] = [];
    const shape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    shapeCopy.push(shape);
    const cloneNodeSpy = spyOn(shape, 'cloneNode').and.callThrough();
    service.generateShapes(shapeCopy);
    expect(cloneNodeSpy).toHaveBeenCalled();
  });

  it('should return false if shapecounter is false', () => {
    const item: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    item.setAttribute('id', 'canvas');
    selectorService.selectedShapes.push(item);
    expect(service.dismissCanvas()).not.toBeTruthy();
  });

  it('should return an action object with the proper attributes', () => {
    const shapeCopy = 'value' as unknown as SVGGraphicsElement;
    const returnAction = service.defineAction(shapeCopy);
    expect(returnAction).toBeDefined();
  });

  it('should not enter conditionnal statement nor modify values', () => {
    inputService.incrementMultiplier = 1;
    service.validateOverflow(1, 1, 2, 2);
    expect(inputService.incrementMultiplier).toEqual(1);
  });

  it('should enter conditionnal statement and modify values', () => {
    inputService.incrementMultiplier = 1;
    service.validateOverflow(1000, 1000, 2, 2);
    expect(inputService.incrementMultiplier).toEqual(0);
  });

  it('should validate last child', () => { });

  it('should assign validate to false after new selection', () => {
    service.newSelection = true;
    inputService.incrementMultiplier = 5;
    service.validateNewSelection();
    expect(service.newSelection).toEqual(false);
    expect(inputService.incrementMultiplier).toEqual(1);
  });

  it('should not assign validate to false after new selection', () => {
    service.newSelection = false;
    inputService.incrementMultiplier = 10;
    service.validateNewSelection();
    expect(service.newSelection).toEqual(false);
    expect(inputService.incrementMultiplier).toEqual(10);

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

  it('should validate before removing child', () => {
    const validateRemoveChildSpy = spyOn(service, 'validateRemoveChild');
    const item: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    selectorService.selectedShapes.push(item);
    service.delete();
    expect(validateRemoveChildSpy).toHaveBeenCalled();
  });

  it('should not remove child on id svg', () => {
    const spyOnremoveChild = spyOn(renderer, 'removeChild');
    const svg = renderer.createElement('svg') as SVGGraphicsElement;
    svg.setAttribute('id', 'svg');
    service.validateRemoveChild(svg);
    const canvas = renderer.createElement('canvas') as SVGGraphicsElement;
    canvas.setAttribute('id', 'canvas');
    service.validateRemoveChild(canvas);
    expect(spyOnremoveChild).not.toHaveBeenCalled();
  });

  it('should remove child on id other than svg and canvas', () => {
    viewChildService.canvas = new ElementRef('allo');
    const spyOnremoveChild = spyOn(renderer, 'removeChild');
    const svg = renderer.createElement('svg') as SVGGraphicsElement;
    svg.setAttribute('id', 'allo');
    service.validateRemoveChild(svg);
    expect(spyOnremoveChild).toHaveBeenCalled();
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
