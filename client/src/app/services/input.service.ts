import { Injectable } from '@angular/core';
import { NB } from 'src/constants';
import { Point } from '../../../../common/interface/point';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private mouse: Point;
  shiftPressed: boolean;
  altPressed: boolean;
  isBlank: boolean;
  stampAngle: number;

  constructor() {
    this.shiftPressed = false;
    this.altPressed = false;
    this.mouse = {x: NB.Zero, y: NB.Zero};
    this.isBlank = true;
    this.stampAngle = NB.Zero;
  }

  setMouseOffset(event: MouseEvent) {
    this.mouse = {x: event.offsetX, y: event.offsetY};
  }

  getMouse(): Point {
    return this.mouse;
  }

  changeStampAngle(value: number): void {
    const increment = this.altPressed ? value : value * NB.Fifteen;
    this.stampAngle += increment;
    if (this.stampAngle >= 360) {
      this.stampAngle = 0;
    } else if (this.stampAngle <= 0 ) {
      this.stampAngle = 360;
    }
  }
}
