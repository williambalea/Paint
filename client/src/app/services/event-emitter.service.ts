import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {

  sendSVGToServerEmitter = new EventEmitter();
  appendToDrawingSpaceEmitter = new EventEmitter();
  selectEmitter = new EventEmitter();
  clearCanvasEmitter = new EventEmitter();
  uploadEmitter = new EventEmitter();

  controlCEmitter = new EventEmitter();
  controlXEmitter = new EventEmitter();
  controlVEmitter = new EventEmitter();
  controlDEmitter = new EventEmitter();
  controlAEmitter = new EventEmitter();
  deleteEmitter = new EventEmitter();

  assignSelectorToolEmitter = new EventEmitter();

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

  assignSelectedTool(): void {
    this.assignSelectorToolEmitter.emit();
  }

  upload(): void {
    this.uploadEmitter.emit();
  }

}
