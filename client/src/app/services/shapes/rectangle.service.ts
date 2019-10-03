import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { Shape } from './shape';
import { ColorService } from '../color/color.service';

@Injectable({
  providedIn: 'root',
})
export class RectangleService implements Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;

  fillEnable: boolean;
  strokeEnable: boolean;

  active: boolean;
  shiftPressed: boolean;

  mouse: Point;
  origin: Point;
  rectangle: HTMLElement;

  constructor(private colorService: ColorService,
              private renderer: Renderer2) {
    this.reset();
  }

  reset(): void {
    this.x = NB.Zero;
    this.y =  NB.Zero;
    this.width = NB.Zero;
    this.height = NB.Zero;
    this.fill = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.strokeWidth = NB.Zero;

    this.fillEnable = true;
    this.strokeEnable = true;

    this.active = false;
    this.shiftPressed = false;
  }

  onMouseDown(event: MouseEvent): void {
    this.active = true;
    this.fill = this.colorService.getFillColor();
    this.stroke = this.colorService.getStrokeColor();
    this.setOrigin(event);
    this.setRectangleType();
    this.rectangle = this.renderer.createElement('rect', 'svg');
    this.renderer.appendChild(document.getElementById('canvas'), this.rectangle);
  }

  onMouseMove(event: MouseEvent): void {
    this.mouse = {x: event.offsetX, y: event.offsetY};
    if (this.active) {
      this.shiftPressed ? this.setSquareOffset() : this.setRectangleOffset();
      this.draw();
    }
  }

  onMouseUp(): void {
    this.active = false;
    this.reset();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

  setOrigin(event: MouseEvent): void {
    this.origin = {x: event.offsetX, y: event.offsetY};
    this.x = event.offsetX;
    this.y = event.offsetY;
  }

  setRectangleType(): void {
    if (!this.fillEnable) {
      this.fill = this.removeColor(this.fill);
    }
    if (!this.strokeEnable) {
      this.stroke = this.removeColor(this.stroke);
    }
  }

  removeColor(fill: string): string {
    const individualParams: string[] = fill.substr(NB.Five, fill.length - NB.One).split(',', NB.Four);
    return `rgba(${individualParams[NB.Zero]},${individualParams[NB.One]},${individualParams[NB.Two]},0)`;
  }

  setSquareOffset(): void {
    const deplacement: Point = {
      x: this.mouse.x - this.origin.x,
      y: this.mouse.y - this.origin.y,
    };

    const width = Math.min(Math.abs(deplacement.x), Math.abs(deplacement.y));

    const newOffset: Point = {
      x: this.origin.x + (Math.sign(deplacement.x) * width),
      y: this.origin.y + (Math.sign(deplacement.y) * width),
    };

    this.width = width;
    this.height = width;
    this.x = Math.min(this.origin.x, newOffset.x);
    this.y = Math.min(this.origin.y, newOffset.y);
  }

  setRectangleOffset(): void {
    this.width = Math.abs(this.mouse.x - this.origin.x);
    this.height = Math.abs(this.mouse.y - this.origin.y);
    this.x = Math.min(this.origin.x, this.mouse.x);
    this.y = Math.min(this.origin.y, this.mouse.y);
  }

  draw() {
    this.renderer.setAttribute(this.rectangle, 'x', this.x.toString());
    this.renderer.setAttribute(this.rectangle, 'y', this.y.toString());
    this.renderer.setAttribute(this.rectangle, 'width', this.width.toString());
    this.renderer.setAttribute(this.rectangle, 'height', this.height.toString());
    this.renderer.setStyle(this.rectangle, 'fill', this.fill);
    this.renderer.setStyle(this.rectangle, 'stroke', this.stroke);
    this.renderer.setStyle(this.rectangle, 'stroke-width', '7'); // hardcode
    this.rectangle.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      console.log("click!"); }, true);
  }

  changePrimaryColor(color: string): void {
    this.fill = color;
  }

  changeSecondaryColor(color: string): void {
      this.stroke = color;
  }
}
