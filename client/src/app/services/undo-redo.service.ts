import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ACTIONS } from 'src/constants';
import { InputService } from './input.service';
import { UndoRedoAction } from './undoRedoAction';
import { ViewChildService } from './view-child.service';

@Injectable({
  providedIn: 'root',
})
export class UndoRedoService {
  renderer: Renderer2;
  actions: UndoRedoAction[];
  poppedActions: UndoRedoAction[];
  color: string;
  undoIsStarted: boolean;
  constructor(private rendererFactory: RendererFactory2,
              private inputService: InputService,
              private viewChildService: ViewChildService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.actions = [];
    this.poppedActions = [];
    this.undoIsStarted = false;

  }

  addAction(action: UndoRedoAction): void {
    this.actions.push(action);
  }

  appendOnUndo( lastAction: UndoRedoAction): void {
    this.renderer.removeChild(this.viewChildService.canvas.nativeElement, lastAction.shape);
    this.poppedActions.push(lastAction);
    this.validateIncrement(lastAction);
  }

  validateIncrement(lastAction: UndoRedoAction): void {
    if (lastAction.increment) {
      this.inputService.incrementMultiplier--;
    }
  }

  removeOnUndo(lastAction: UndoRedoAction): void {
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, lastAction.shape);
    this.poppedActions.push(lastAction);
  }

  removeManyOnUndo(lastAction: UndoRedoAction): void {
    const shapes = lastAction.shapes as unknown as SVGGraphicsElement[];
    for (const shape of shapes) {
      this.renderer.appendChild(this.viewChildService.canvas.nativeElement, shape);
    }
    this.poppedActions.push(lastAction);
  }

  setOldColor(shape: SVGGraphicsElement): string {
    if (shape.tagName === 'path' || shape.tagName === 'g') {
      return shape.getAttribute('stroke') as string;
    } else {
      return shape.getAttribute('fill') as string;
    }
  }

  restoreColor(lastAction: UndoRedoAction): void {
    const shape = lastAction.shape as SVGGraphicsElement;
    const oldColor = lastAction.oldColor as string;
    if (shape.tagName === 'path' || shape.tagName === 'g') {
      this.renderer.setAttribute(shape, 'stroke', oldColor);
    } else {
      this.renderer.setAttribute(shape, 'fill', oldColor);
    }
  }

  changeColorOnUndo(lastAction: UndoRedoAction): void {
    const changeFill: UndoRedoAction = {
      action: ACTIONS.changeColor,
      shape: lastAction.shape,
      oldColor: this.setOldColor(lastAction.shape as SVGGraphicsElement),
    };
    this.restoreColor(lastAction);
    this.poppedActions.push(changeFill);
  }

  undo(): void {
    const lastAction: UndoRedoAction =  this.actions.pop() as UndoRedoAction;
    switch (lastAction.action) {
      case ACTIONS.append :
        this.appendOnUndo(lastAction);
        break;
      case ACTIONS.remove :
        this.removeOnUndo(lastAction);
        break;
      case ACTIONS.changeColor :
        this.changeColorOnUndo(lastAction);
        break;
      case ACTIONS.removeMany :
        this.removeManyOnUndo(lastAction);
        break;
      default:
    }

    this.undoIsStarted = true;
  }

  appendOnRedo(lastAction: UndoRedoAction): void {
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, lastAction.shape);
    this.actions.push(lastAction);
    this.validaincrementMultiplier(lastAction);
  }

  validaincrementMultiplier(lastAction: UndoRedoAction): void {
    if (lastAction.increment) {
      this.inputService.incrementMultiplier++;
    }
  }

  removeOnRedo(lastAction: UndoRedoAction): void {
    this.renderer.removeChild(this.viewChildService.canvas.nativeElement, lastAction.shape);
    this.actions.push(lastAction);
  }

  removeManyOnRedo(lastAction: UndoRedoAction): void {
    const shapes = lastAction.shapes as unknown as SVGGraphicsElement[];
    for (const shape of shapes) {
      this.renderer.removeChild(this.viewChildService.canvas.nativeElement, shape);
    }
    this.actions.push(lastAction);
  }

  changeColorOnRedo(lastAction: UndoRedoAction): void {
    const changeFill: UndoRedoAction = {
      action: ACTIONS.changeColor,
      shape: lastAction.shape,
      oldColor: this.setOldColor(lastAction.shape as SVGGraphicsElement),
    };
    this.restoreColor(lastAction);
    this.actions.push(changeFill);
  }

  redo() {
    const lastAction: UndoRedoAction =  this.poppedActions.pop() as UndoRedoAction;
    switch (lastAction.action) {
      case ACTIONS.append :
        this.appendOnRedo(lastAction);
        break;
      case ACTIONS.remove :
          this.removeOnRedo(lastAction);
          break;
      case ACTIONS.changeColor :
        this.changeColorOnRedo(lastAction);
        break;
      case ACTIONS.removeMany :
        this.removeManyOnRedo(lastAction);
        break;
      default:
    }
  }
}
