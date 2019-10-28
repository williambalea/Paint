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
  clearCanvasEmitter = new EventEmitter();

  controlCEmitter = new EventEmitter();
  controlXEmitter = new EventEmitter();
  controlVEmitter = new EventEmitter();
  controlQEmitter = new EventEmitter();
  controlAEmitter = new EventEmitter();
  deleteEmitter = new EventEmitter();

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

  clearCanvas(): void {
    this.clearCanvasEmitter.emit();
  }

  controlC(): void {
    this.controlCEmitter.emit();
  }

  controlX(): void {
    this.controlXEmitter.emit();
  }

  controlV(): void {
    this.controlVEmitter.emit();
  }

  controlQ(): void {
    this.controlQEmitter.emit();
  }

  controlA(): void {
    this.controlAEmitter.emit();
  }

  delete(): void {
    this.deleteEmitter.emit();
  }

}
