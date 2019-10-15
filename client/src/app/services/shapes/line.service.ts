import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class LineService implements Shape {

  linepath: string;
  stroke: string;
  strokeWidth: number;
  active: boolean;
  positions: Point[];
  start: boolean;
  savedPath: string;

  path: HTMLElement;

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
    this.strokeWidth = NB.Seven;
    this.reset();
    }

  reset(): void {
    this.start = true;
    this.stroke = EMPTY_STRING;
    this.active = false;
    this.linepath = EMPTY_STRING;
    this.savedPath = EMPTY_STRING;
    this.positions = [];
  }

  onMouseDown(): any {
    this.positions.push(this.inputService.getMouse());
    this.active = true;
    this.stroke = this.colorService.getFillColor();
    if (this.start) {
    this.path = this.renderer.createElement('path', 'svg');
    }
    this.setStyle();
    this.draw();
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.start = false;
    this.savedPath = this.linepath;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
    return this.path;
  }

  setStyle() {
    this.renderer.setStyle(this.path, 'stroke', this.stroke.toString());
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'stroke-linejoin', 'round');
    this.renderer.setStyle(this.path, 'fill', 'none');
    this.renderer.setStyle(this.path, 'stroke-width', this.strokeWidth.toString());
  }

  onMouseMove(): any {
    if (this.active) {
      this.linepath = this.savedPath + `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y}`;
      this.renderer.setAttribute(this.path, 'd', this.linepath);
    }
    if (this.inputService.backSpacePressed) {
      if (this.positions.length > 1) {
      this.positions.pop();
      }
      this.stroke = this.colorService.getFillColor();
      if (this.start) {
      this.path = this.renderer.createElement('path', 'svg');
      }
      this.setStyle();
      this.redraw();
      this.renderer.setAttribute(this.path, 'd', this.linepath);
      this.start = false;
      this.savedPath = this.linepath;
      this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
      return this.path;
    }
    if (this.inputService.shiftPressed) {
      this.renderer.setAttribute(this.path, 'd', this.linepath);
      this.renderer.setAttribute(this.path, 'd', this.linepath += 'Z');
      this.reset();
    }

    if (this.inputService.isDoubleClick) {
       console.log('lineservice double');
       this.renderer.setAttribute(this.path, 'd', this.linepath);
       this.reset(); }
    }

  onMouseUp(): void {
    if (this.inputService.escapePressed) {
      this.reset();
    }
    if (this.inputService.backSpacePressed) {
      this.removeLastSegment();
    }
  }

  dblclick(): void{
    console.log('lineservice double');
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.reset();
  }

  removeLastSegment() {
      console.log('hi');
      this.active = false;
      //this.positions.pop();
     // this.savedPath = EMPTY_STRING;
      this.start = true;
  }

  changeLinePatter(newFilter: string): void {
    // this.filter = `url(#${newFilter})`;
  }

  draw() {
    if (this.start) {
    this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[this.positions.length - 1].x} ${this.positions[this.positions.length - 1].y}`;
    }
  }

  redraw() {
    for (let  i = 0; i < this.positions.length; i++) {
    if  (i === 0) {
      this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[i].x} ${this.positions[i].y}`;
    }
  }
}
}
