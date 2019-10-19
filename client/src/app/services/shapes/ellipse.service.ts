import { Injectable, Renderer2 } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { EMPTY_STRING, NB, OUTLINE_TYPE } from 'src/constants';
import { InputService } from '../input.service';
import { Point } from './../../../../../common/interface/point';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class EllipseService implements Shape {

  x: number;
  y: number;
  xray: number;
  yray: number;
  active: boolean;
  fill: string;
  stroke: string;
  strokeWidth: number;
  ellipseType: string;

  fillEnable: boolean;
  strokeEnable: boolean;

  mouse: Point;
  origin: Point;
  ellipse: HTMLElement;

  constructor(private colorService: ColorService,
              private renderer: Renderer2,
              private inputService: InputService) {
    this.reset();
    this.strokeWidth = NB.Seven;
    this.fill = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.ellipseType = OUTLINE_TYPE.borderedAndFilled;

    this.fillEnable = true;
    this.strokeEnable = true;
  }

  reset(): void {
    this.x = NB.Zero;
    this.y = NB.Zero;
    this.xray = NB.Zero;
    this.yray = NB.Zero;

    this.active = false;
  }

  onMouseDown(): HTMLElement {
    this.active = true;
    this.fill = this.colorService.getFillColor();
    this.stroke = this.colorService.getStrokeColor();
    this.setOrigin(this.inputService.getMouse());
    this.setEllipseBorderType();
    this.ellipse = this.renderer.createElement('ellipse', 'svg');
    return this.ellipse;
  }

  onMouseMove(): void {
    this.mouse = this.inputService.getMouse();
    if (this.active) {
      this.inputService.shiftPressed ? this.setCircleOffset() : this.setEllipseOffset();
      this.draw();
    }
  }

  onMouseUp(): void {
    this.reset();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

  setOrigin(mouse: Point): void {
    this.origin = mouse;
    this.x = mouse.x;
    this.y = mouse.y;
  }

  setEllipseBorderType(): void {
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

  setCircleOffset(): void {
    const deplacement: Point = {
      x: this.mouse.x - this.origin.x,
      y: this.mouse.y - this.origin.y,
    };

    this.xray = Math.abs(deplacement.x) / NB.Two;
    this.yray = Math.abs(deplacement.y) / NB.Two;
    const ray = Math.max(this.xray, this.yray);

    this.xray = ray;
    this.yray = ray;
    this.x = this.origin.x + (Math.sign(deplacement.x) * ray);
    this.y = this.origin.y + (Math.sign(deplacement.y) * ray);
  }

  setEllipseOffset(): void {
    this.xray = Math.abs(this.mouse.x - this.origin.x) / NB.Two;
    this.yray = Math.abs(this.mouse.y - this.origin.y) / NB.Two;
    this.x = Math.min(this.origin.x, this.mouse.x) + this.xray;
    this.y = Math.min(this.origin.y, this.mouse.y) + this.yray;
  }

  draw(): void {
    this.renderer.setAttribute(this.ellipse, 'cx', this.x.toString());
    this.renderer.setAttribute(this.ellipse, 'cy', this.y.toString());
    this.renderer.setAttribute(this.ellipse, 'rx', this.xray.toString());
    this.renderer.setAttribute(this.ellipse, 'ry', this.yray.toString());
    this.renderer.setStyle(this.ellipse, 'fill', this.fill);
    this.renderer.setStyle(this.ellipse, 'stroke', this.stroke);
    this.renderer.setStyle(this.ellipse, 'stroke-width', this.strokeWidth.toString());
  }

  assignBorderedRectangle(): void {
    this.strokeEnable = true;
    this.fillEnable = false;
  }

  assignFilledRectangle(): void {
    this.strokeEnable = false;
    this.fillEnable = true;
  }

  assignBorderedAndFilledRectangle(): void {
    this.strokeEnable = true;
    this.fillEnable = true;
  }

  assignRectangleType(): void {
    switch (this.ellipseType) {
      case OUTLINE_TYPE.bordered:
        this.assignBorderedRectangle();
        break;
      case OUTLINE_TYPE.filled:
        this.assignFilledRectangle();
        break;
      case OUTLINE_TYPE.borderedAndFilled:
        this.assignBorderedAndFilledRectangle();
        break;
      default:
    }
  }

  changePrimaryColor(color: string): void {
    this.fill = color;
  }

  changeSecondaryColor(color: string): void {
    this.stroke = color;
  }

}
