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

  changeColorOnUndo(lastAction: UndoRedoAction): void {
    const changeFill: UndoRedoAction = {
      action: ACTIONS.changeColor,
      shape: lastAction.shape,
      oldColor: lastAction.shape.tagName === 'path' || lastAction.shape.tagName === 'g' ? lastAction.shape.getAttribute('stroke') as string : lastAction.shape.getAttribute('fill') as string,

    };
    console.log('will', lastAction.oldColor);
    (lastAction.shape.tagName === 'path' || lastAction.shape.tagName === 'g') ? this.renderer.setAttribute(lastAction.shape, 'stroke', lastAction.oldColor as string) : this.renderer.setAttribute(lastAction.shape, 'fill', lastAction.oldColor as string);
    this.poppedActions.push(changeFill);
  }

  undo(): void {
    const lastAction: UndoRedoAction =  this.actions.pop() as UndoRedoAction;
    console.log('action', this.actions);
    console.log('popped', this.poppedActions);
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

  changeColorOnRedo(lastAction: UndoRedoAction): void {
    const changeFill: UndoRedoAction = {
      action: ACTIONS.changeColor,
      shape: lastAction.shape,
      oldColor: (lastAction.shape.tagName === 'path' || lastAction.shape.tagName === 'g') ? lastAction.shape.getAttribute('stroke') as string : lastAction.shape.getAttribute('fill') as string,
    };
    console.log(lastAction.shape.tagName);
    (lastAction.shape.tagName === 'path' || lastAction.shape.tagName === 'g') ? this.renderer.setAttribute(lastAction.shape, 'stroke', lastAction.oldColor as string) : this.renderer.setAttribute(lastAction.shape, 'fill', lastAction.oldColor as string);
    this.actions.push(changeFill);
  }

  redo() {
    const lastAction: UndoRedoAction =  this.poppedActions.pop() as UndoRedoAction;
    console.log('action', this.actions);
    console.log('popped', this.poppedActions);
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
      default:
    }
  }
}
