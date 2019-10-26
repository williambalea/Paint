import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { UndoRedoAction } from './undoRedoAction';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  actions: UndoRedoAction[];
  poppedActions: UndoRedoAction[];
  canvas : ElementRef;
  constructor(private renderer: Renderer2) { 
    this.actions = [];
    this.poppedActions = [];
    
  }

  addAction(action : UndoRedoAction) : void {
    this.actions.push(action);
    console.log('whenDrawing',this.actions);
    
  }

  savePoppedAction() : void {
    const lastAction : UndoRedoAction =  this.actions.pop() as UndoRedoAction;
    this.renderer.removeChild(this.canvas,lastAction.shape);
    console.log('actions',this.actions);
    this.poppedActions.push(lastAction);
  
  }
}
