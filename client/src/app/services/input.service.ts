import { Injectable } from '@angular/core';
import { NB } from 'src/constants';
import { Point } from '../../../../common/interface/point';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private mouse: Point;
  shiftPressed: boolean;
  isBlank: boolean;
  constructor() {
    this.shiftPressed = false;
    this.mouse = {x: NB.Zero, y: NB.Zero};
    this.isBlank = true;
  }

  setMouseOffset(event: MouseEvent) {
    this.mouse = {x: event.offsetX, y: event.offsetY};
  }

  getMouse(): Point {
    return this.mouse;
  }
}
