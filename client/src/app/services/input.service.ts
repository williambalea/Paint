import { Injectable } from '@angular/core';
import { EMPTY_STRING, NB, TOOL } from 'src/constants';
import { Point } from '../../../../common/interface/point';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private mouse: Point;
  shiftPressed: boolean;
  escapePressed: boolean;
  backSpacePressed: boolean;
  controlPressed: boolean;
  altPressed: boolean;
  isBlank: boolean;
  isDoubleClick: boolean;
  enterPressed: boolean;
  gridShortcutsActive: boolean;

  stampAngle: number;
  json: string;
  drawingName: string;
  drawingTags: string[];
  drawingHtml: string;
  drawingColor: string;
  isNotEmpty: boolean;
  mouseButton: number;
  isDrawed: boolean;

  constructor() {
    this.shiftPressed = false;
    this.altPressed = false;
    this.mouse = { x: NB.Zero, y: NB.Zero };
    this.isBlank = true;
    this.escapePressed = false;
    this.isDoubleClick = false;
    this.backSpacePressed = false;
    this.enterPressed = false;
    this.stampAngle = NB.Zero;
    this.json = EMPTY_STRING;
    this.drawingName = EMPTY_STRING;
    this.drawingTags = [];
    this.drawingHtml = EMPTY_STRING;
    this.isNotEmpty = false;
    this.isDrawed = false;
    this.controlPressed = false;
    this.gridShortcutsActive = true;
  }

  setMouseOffset(event: MouseEvent, area: HTMLElement, tool: string): void {
    if (tool === TOOL.brush || tool === TOOL.pen || tool === TOOL.pencil ||
      tool === TOOL.pipette || tool === TOOL.eraser) {
      this.mouse = { x: event.clientX - area.getBoundingClientRect().left,
      y: event.clientY - area.getBoundingClientRect().top + NB.Twenty };
    } else {
      this.mouse = { x: event.clientX - area.getBoundingClientRect().left, y: event.clientY - area.getBoundingClientRect().top};
    }
  }

  getMouse(): Point {
    return this.mouse;
  }

  changeStampAngle(value: number): void {
    const increment = this.altPressed ? value : value * NB.Fifteen;
    this.stampAngle += increment;
    if (this.stampAngle >= NB.ThreeHundredSixty) {
      this.stampAngle = NB.Zero;
    } else if (this.stampAngle <= NB.Zero) {
      this.stampAngle = NB.ThreeHundredSixty;
    }
  }

  saveJSON(json: string): void {
    this.json = json;
  }

}
