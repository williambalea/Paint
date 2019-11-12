import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ACTIONS } from 'src/constants';
import { InputService } from './input.service';
import { UndoRedoService } from './undo-redo.service';
import { UndoRedoAction } from './undoRedoAction';
import { ViewChildService } from './view-child.service';

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
        { provide: Renderer2, useClass: RendererMock },
      ],
    }).compileComponents();
    service = TestBed.get(UndoRedoService);
    viewChildService = TestBed.get(ViewChildService);
    inputService = TestBed.get(InputService);
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

  it('should append on undo', () => {
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
    lastAction.increment = 1;
    expect(inputService.incrementMultiplier).toEqual(1);
    service.validateIncrement(lastAction);
    expect(inputService.incrementMultiplier).toEqual(0);
  });

  it('should not validate increment', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    lastAction.increment = undefined;
    expect(inputService.incrementMultiplier).toEqual(1);
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

  it('should remove many on undo', () => {
    viewChildService.canvas = new ElementRef('allo');
    const shapes: SVGGraphicsElement[] = [];
    const firstshape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    const secondshape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    shapes.push(firstshape);
    shapes.push(secondshape);
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shapes};
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    const spyOnpush = spyOn(service.poppedActions, 'push');
    service.removeManyOnUndo(lastAction);
    expect(spyOnAppendChild).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });

  it('should set old color by tagName path', () => {
    const shape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    shape.setAttribute('tagName', 'path');
    const spyOngetAttribute = spyOn(shape, 'getAttribute');
    service.setOldColor(shape);
    expect(spyOngetAttribute).toHaveBeenCalled();
  });

  it('should set old color by tagName g', () => {
    const shape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    shape.setAttribute('tagName', 'g');
    const spyOngetAttribute = spyOn(shape, 'getAttribute');
    service.setOldColor(shape);
    expect(spyOngetAttribute).toHaveBeenCalled();
  });

  it('should restore color', () => {
    const shape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    shape.setAttribute('tagName', 'path');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape};
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.restoreColor(lastAction);
    expect(spyOnSetAttribute).toHaveBeenCalled();
  });

  it('should change color on undo', () => {
    const spyOnrestoreColor = spyOn(service, 'restoreColor');
    const spyOnpush = spyOn(service.poppedActions, 'push');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.changeColorOnUndo(lastAction);
    expect(spyOnrestoreColor).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });

  it('should append on redo', () => {
    viewChildService.canvas = new ElementRef('allo');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    const spyOnappendChild = spyOn(renderer, 'appendChild');
    const spyOnpush = spyOn(service.actions, 'push');
    const spyOnvvalidaincrementMultiplier = spyOn(service, 'validaincrementMultiplier');
    service.appendOnRedo(lastAction);
    expect(spyOnappendChild).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
    expect(spyOnvvalidaincrementMultiplier).toHaveBeenCalled();
  });

  it('should validate increment multiplier', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    lastAction.increment = 1;
    expect(inputService.incrementMultiplier).toEqual(1);
    service.validaincrementMultiplier(lastAction);
    expect(inputService.incrementMultiplier).toEqual(2);
  });

  it('should not validate increment multiplier', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    lastAction.increment = undefined;
    expect(inputService.incrementMultiplier).toEqual(1);
    service.validaincrementMultiplier(lastAction);
    expect(inputService.incrementMultiplier).toEqual(1);
  });

  it('should remove on redo', () => {
    viewChildService.canvas = new ElementRef(renderer.createElement('rect', 'svg'));
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    const spyOnremoveChild = spyOn(renderer, 'removeChild');
    const spyOnpush = spyOn(service.actions, 'push');
    service.removeOnRedo(lastAction);
    expect(spyOnremoveChild).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });

  it('should remove many on undo', () => {
    viewChildService.canvas = new ElementRef('allo');
    const shapes: SVGGraphicsElement[] = [];
    const firstshape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    const secondshape: SVGGraphicsElement = renderer.createElement('rect', 'svg');
    shapes.push(firstshape);
    shapes.push(secondshape);
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shapes};
    const spyOnRemoveChild = spyOn(renderer, 'removeChild');
    const spyOnpush = spyOn(service.actions, 'push');
    service.removeManyOnRedo(lastAction);
    expect(spyOnRemoveChild).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });

  it('should change color on redo', () => {
    const spyOnrestoreColor = spyOn(service, 'restoreColor');
    const spyOnpush = spyOn(service.actions, 'push');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.changeColorOnRedo(lastAction);
    expect(spyOnrestoreColor).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });

  it('should append on undo when action is append', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.actions.push(lastAction);
    service.actions.push(lastAction);
    const spyOnAction = spyOn(service, 'appendOnUndo');
    service.undo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('should remove on undo when action is remove', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.remove , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.actions.push(lastAction);
    service.actions.push(lastAction);
    const spyOnAction = spyOn(service, 'removeOnUndo');
    service.undo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('should changeColor on undo when action is changeColor', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.changeColor , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.actions.push(lastAction);
    service.actions.push(lastAction);
    const spyOnAction = spyOn(service, 'changeColorOnUndo');
    service.undo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('should removeManyOnUndo on undo when action is removeManyOnUndo', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.removeMany , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.actions.push(lastAction);
    service.actions.push(lastAction);
    const spyOnAction = spyOn(service, 'removeManyOnUndo');
    service.undo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('should change color on redo', () => {
    const spyOnrestoreColor = spyOn(service, 'restoreColor');
    const spyOnpush = spyOn(service.actions, 'push');
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.changeColorOnRedo(lastAction);
    expect(spyOnrestoreColor).toHaveBeenCalled();
    expect(spyOnpush).toHaveBeenCalled();
  });

  it('should append on redo when action is append', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.append , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.poppedActions.push(lastAction);
    service.poppedActions.push(lastAction);
    const spyOnAction = spyOn(service, 'appendOnRedo');
    service.redo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('------should remove on redo when action is remove', () => {
    const previousAction: UndoRedoAction = { action: ACTIONS.remove , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.poppedActions.push(previousAction);
    service.poppedActions.push(previousAction);
    const spyOnAction = spyOn(service, 'removeOnRedo');
    service.redo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('should changeColor on redo when action is changeColor', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.changeColor , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.poppedActions.push(lastAction);
    service.poppedActions.push(lastAction);
    const spyOnAction = spyOn(service, 'changeColorOnRedo');
    service.redo();
    expect(spyOnAction).toHaveBeenCalled();
  });

  it('should removeManyOnUndo on redo when action is removeManyOnUndo', () => {
    const lastAction: UndoRedoAction = { action: ACTIONS.removeMany , shape: SVGGraphicsElement = renderer.createElement('rect', 'svg')};
    service.poppedActions.push(lastAction);
    service.poppedActions.push(lastAction);
    const spyOnAction = spyOn(service, 'removeManyOnRedo');
    service.redo();
    expect(spyOnAction).toHaveBeenCalled();
  });


});
