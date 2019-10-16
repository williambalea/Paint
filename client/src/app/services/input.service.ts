import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EMPTY_STRING, NB } from 'src/constants';
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
  json: string;
  drawingName: string;
  drawingTags: string[];
  drawingHtml: string;
  isNotEmpty: boolean;

  isConfirmed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isconfirmed$: Observable<boolean>;

  constructor() {
    this.shiftPressed = false;
    this.altPressed = false;
    this.mouse = {x: NB.Zero, y: NB.Zero};
    this.isBlank = true;
    this.stampAngle = NB.Zero;
    this.json = EMPTY_STRING;
    this.drawingName = EMPTY_STRING;
    this.drawingTags = [];
    this.drawingHtml = EMPTY_STRING;
    this.isNotEmpty = false ;
    this.isconfirmed$ = this.isConfirmed.asObservable();

  }
  setToTrue(): void {
    this.isConfirmed.next(true);
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

  saveJSON(json: string) {
    this.json = json;
  }

}
