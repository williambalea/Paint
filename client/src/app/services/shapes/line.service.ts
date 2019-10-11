import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { Shape } from './shape';
import { Point } from '../../../../../common/interface/point';

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

  path: HTMLElement;

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
    this.strokeWidth = NB.Seven;
    this.reset();
    this.positions = [];
    this.start = true;
  }

  reset(): void {
    this.stroke = EMPTY_STRING;
    this.active = false;
  }
  onMouseDown(): any {
    this.positions.push(this.inputService.getMouse());
    this.active = true;
    this.stroke = this.colorService.getFillColor();
    this.path = this.renderer.createElement('path', 'svg');
    this.renderer.setStyle(this.path, 'stroke', this.stroke.toString());
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'stroke-linejoin', 'round');
    this.renderer.setStyle(this.path, 'fill', 'none');
    this.renderer.setStyle(this.path, 'stroke-width', this.strokeWidth.toString());
    this.draw();
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.start = false;
    return this.path;
  }

  onMouseMove(): void {
    if (this.active) {
      // this.draw();
    }
  }
  onMouseUp(): void {
    this.reset();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());

  }

  draw() {
    if (this.start) {
    this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[this.positions.length - 1].x} ${this.positions[this.positions.length - 1].y}`;
    }
  }
}
