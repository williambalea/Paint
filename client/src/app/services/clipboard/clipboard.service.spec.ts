import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FileParametersServiceService } from '../file-parameters-service.service';
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
  let fileParameterService: FileParametersServiceService;

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
    fileParameterService = TestBed.get(FileParametersServiceService);
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

  it('should have called controlC() thoroughly', () => {
    const controlCSpy = spyOn(service, 'controlC');
    service.controlC();
    expect(controlCSpy).toHaveBeenCalled();
    expect(service.selectedItems.length).toEqual(0);
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

  // it('should clone the node when generating a shape', () => {

  // });

  it('should return an action object with the proper attributes', () => {
    const shapeCopy = 'value' as unknown as SVGGraphicsElement;
    const returnAction = service.defineAction(shapeCopy);
    expect(returnAction).toBeDefined();
  });

  // it('should not return an empty string as transformValue', () => {
  //   const shapeCopy = 'value' as unknown as SVGGraphicsElement;
  //   const oldTransform = service.validateOldTransform(shapeCopy);
  //   expect(oldTransform).toBeDefined();
  // });

  // it('should return an empty string as transformValue', () => {
  //   const shapeCopy = 'value' as unknown as SVGGraphicsElement;
  //   const oldTransform = service.validateOldTransform(shapeCopy);
  //   expect(oldTransform).toEqual(EMPTY_STRING);
  // });

  it('should not enter conditionnal statement nor modify values', () => {
    inputService.incrementMultiplier = 1;
    service.validateOverflow(1, 1, 2, 2);
    expect(inputService.incrementMultiplier).toEqual(1);
  });

  it('should enter conditionnal statement and modify values', () => {
    inputService.incrementMultiplier = 1;
    service.validateOverflow(1000, 1000, 2, 2);
    console.log(fileParameterService.canvasHeight.getValue());
    expect(inputService.incrementMultiplier).toEqual(0);
  });

  it('should validate last child', () => {
    const svg = renderer.createElement('rect', 'svg');
    const svgSecond = renderer.createElement('rect', 'svg');
    viewChildService.canvas = new ElementRef(svg);
    svg.appendChild(viewChildService.canvas, svgSecond);
    const overflowX = 1;
    const overflowY = 2;
    service.validateLastChild(overflowX, overflowY);
    expect(overflowX).toEqual(1);
    expect(overflowY).toEqual(2);
  });

  // it('should assign values to overflows', () => {
  //   viewChildService.canvas = new ElementRef(document.createElement('svg'));
  //   const getBoundingClientRectSpy = spyOn(viewChildService.canvas.nativeElement.lastChild, 'getBoundingClientRect').and.callThrough();
  //   const svg = renderer.createElement('svg');
  //   renderer.appendChild(viewChildService.canvas, svg);
  //   console.log(viewChildService.canvas);

  //   service.validateLastChild(1, 1);
  //   expect(getBoundingClientRectSpy).toHaveBeenCalled();
  // });

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

  // it('should have called controlX() thoroughly', () => {
  //   const svg = renderer.createElement('notsvg');
  //   service.selectedItems.push(svg);
  //   viewChildService.canvas = new ElementRef(svg);
  //   const removeChildMock = spyOn(renderer, 'removeChild').and.callThrough();
  //   const controlCSpy = spyOn(service, 'controlC').and.callThrough();

  //   service.controlC();
  //   expect(removeChildMock).toHaveBeenCalled();
  //   expect(controlCSpy).toHaveBeenCalled();
  // });

  // it('should have called delete() thoroughly', () => {
  //   const svg = renderer.createElement('svg');
  //   svg.setAttribute('id', 'notsvg');
  //   console.log(svg);
  //   const removeChildSpy = spyOn(renderer, 'removeChild').and.callThrough();
  //   viewChildService.canvas = new ElementRef(svg);
  //   selectorService.selectedShapes.push(svg);
  //   service.delete();
  //   expect(removeChildSpy).toHaveBeenCalled();
  //   expect(selectorService.selectedShapes.length).toEqual(0);
  // });

  // it('should return an empty selector array on delete()', () => {
  //   const svgChild = renderer.createElement('svg');
  //   viewChildService.canvas = new ElementRef(document.createElement('svg'));
  //   renderer.appendChild(viewChildService.canvas, svgChild);
  //   selectorService.selectedShapes.push(svgChild);
  //   service.delete();
  //   console.log(selectorService.selectedShapes.length);
  //   expect(selectorService.selectedShapes.length).toEqual(0);
  // });

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
    inputService.incrementMultiplier = 3; // remove when inputcalled
    service.duplicate(mockShapeArray);
    expect(service.newSelection).not.toBeTruthy();
  });

  // it('should add action upon duplicating', () => {
  //   const addActionSpy = spyOn(undoRedoService, 'addAction');
  //   mockShapes.push(mockShape);
  //   service.duplicate(mockShapes);
  //   expect(addActionSpy).toHaveBeenCalled();
  // });

});
