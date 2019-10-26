import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { ACTIONS } from 'src/constants';
import { UndoRedoAction } from './undoRedoAction';

@Injectable({
  providedIn: 'root',
})
export class UndoRedoService {

  actions: UndoRedoAction[];
  poppedActions: UndoRedoAction[];
  canvas: ElementRef;
  color: string;
  undoIsStarted: boolean;
  constructor(private renderer: Renderer2) {
    this.actions = [];
    this.poppedActions = [];
    this.undoIsStarted = false;

  }

  addAction(action: UndoRedoAction): void {
    this.actions.push(action);
  }

  undo(): void {
    const lastAction: UndoRedoAction =  this.actions.pop() as UndoRedoAction;
    // let lastColor : string;
    switch (lastAction.action) {
      case ACTIONS.append :
        this.renderer.removeChild(this.canvas.nativeElement, lastAction.shape);
        this.poppedActions.push(lastAction);
        break;
      case ACTIONS.changeColor :
        const changeFill: UndoRedoAction = {
          action: ACTIONS.changeColor,
          shape: lastAction.shape,
          oldColor: lastAction.shape.getAttribute('fill') as string,
        };
        this.renderer.setAttribute(lastAction.shape, 'fill', lastAction.oldColor as string);
        this.poppedActions.push(changeFill);
    }

    // console.log('next color', lastAction.nextColor);
    // this.poppedActions[this.poppedActions.length - 1].oldColor = lastAction.nextColor;
   // this.poppedActions[this.poppedActions.length-1].color = this.color;

  }

  redo() {
    const lastAction: UndoRedoAction =  this.poppedActions.pop() as UndoRedoAction;
    switch (lastAction.action) {
      case ACTIONS.append :
        this.renderer.appendChild(this.canvas.nativeElement, lastAction.shape);
        this.actions.push(lastAction);
        break;
      case ACTIONS.changeColor :
        const changeFill: UndoRedoAction = {
          action: ACTIONS.changeColor,
          shape: lastAction.shape,
          oldColor: lastAction.shape.getAttribute('fill') as string,
        };
        this.renderer.setAttribute(lastAction.shape, 'fill', lastAction.oldColor as string);
        this.actions.push(changeFill);
        break;
      default:
    }
  }
}
