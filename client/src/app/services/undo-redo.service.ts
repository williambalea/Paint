import { Injectable } from '@angular/core';
import { UndoRedoAction } from './undoRedoAction';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  actions: UndoRedoAction[];
  poppedActions: UndoRedoAction[];

  constructor() { 
    this.actions = [];
    this.poppedActions = [];
  }

  addAction(action : UndoRedoAction) : void {
    this.actions.push(action);
    console.log('actions', this.actions);
  }

  savePoppedAction() : void {
    this.poppedActions.push(this.actions.pop() as UndoRedoAction);
    console.log('popped', this.actions);
  }
}
