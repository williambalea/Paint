import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { UndoRedoAction } from './undoRedoAction';
import { ACTIONS } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  actions: UndoRedoAction[];
  poppedActions: UndoRedoAction[];
  canvas : ElementRef;
  color : string;
  constructor(private renderer: Renderer2) { 
    this.actions = [];
    this.poppedActions = [];
    
  }

  addAction(action : UndoRedoAction) : void {
    this.actions.push(action);
    console.log('undo',this.actions);
  }

  savePoppedAction() : void {
    const lastAction : UndoRedoAction =  this.actions.pop() as UndoRedoAction;
    //let lastColor : string;
    switch(lastAction.action) {
      case ACTIONS.append :
        this.renderer.removeChild(this.canvas,lastAction.shape);
        break;
      case ACTIONS.changeColor :
        
        this.renderer.setAttribute(lastAction.shape, 'fill', lastAction.color as string);
       // this.actions.push(lastAction);
    } 
    
    this.poppedActions.push(lastAction);
    console.log('next color', lastAction.nextColor);
    this.poppedActions[this.poppedActions.length-1].color = lastAction.nextColor;
   // this.poppedActions[this.poppedActions.length-1].color = this.color;
    
  
  }


  redo() {
    const lastAction : UndoRedoAction =  this.poppedActions.pop() as UndoRedoAction;
    switch(lastAction.action) {
      case ACTIONS.append :
        this.renderer.appendChild(this.canvas.nativeElement,lastAction.shape);
        break;
      case ACTIONS.changeColor :
        console.log('color',lastAction.color );
        this.renderer.setAttribute(lastAction.shape, 'fill', lastAction.color as string);
        console.log('color',lastAction.color );
        break;
      default:
    } 
    this.actions.push(lastAction);
  }
}
