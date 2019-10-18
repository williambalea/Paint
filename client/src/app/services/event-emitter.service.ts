import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {

  showGridEmitter = new EventEmitter();
  hideGridEmitter = new EventEmitter();
  sendSVGToServerEmitter = new EventEmitter();
  appendToDrawingSpaceEmitter = new EventEmitter();
  selectEmitter = new EventEmitter();

  showGrid(): void {
    this.showGridEmitter.emit();
  }

  hideGrid(): void {
    this.hideGridEmitter.emit();
  }

  sendSVGToServer(): void {
    this.sendSVGToServerEmitter.emit();
  }

  appendToDrawingSpace(): void {
    this.appendToDrawingSpaceEmitter.emit();
  }

  select(): void {
    this.selectEmitter.emit();
  }
}