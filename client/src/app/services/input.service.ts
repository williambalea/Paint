import { Injectable } from '@angular/core';
import { NB } from 'src/constants';
import { Point } from '../../../../common/interface/point';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private mouse: Point;
  shiftPressed: boolean;
  escapePressed: boolean;
  backSpacePressed: boolean;
  isBlank: boolean;
  isDoubleClick: boolean;

  constructor() {
    this.shiftPressed = false;
    this.mouse = {x: NB.Zero, y: NB.Zero};
    this.isBlank = true;
    this.escapePressed = false;
    this.isDoubleClick = false;
    this.backSpacePressed = false;
  }

  setMouseOffset(event: MouseEvent) {
    this.mouse = {x: event.offsetX, y: event.offsetY};
  }

  getMouse(): Point {
    return this.mouse;
  }
}