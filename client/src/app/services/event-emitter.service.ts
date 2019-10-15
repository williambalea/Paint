import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {

  showGridEmitter = new EventEmitter();
  hideGridEmitter = new EventEmitter();

  showGrid() {
    this.showGridEmitter.emit();
  }

  hideGrid() {
    this.hideGridEmitter.emit();
  }
}
