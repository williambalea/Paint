import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB, OUTLINE_TYPE } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { Shape } from './shape';

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
  active: boolean;
  rectangleType: string;

  fillEnable: boolean;
  strokeEnable: boolean;

  mouse: Point;
  origin: Point;
  rectangle: HTMLElement;

  constructor(private colorService: ColorService,
              private renderer: Renderer2,
              private inputService: InputService) {
    this.reset();
    this.strokeWidth = NB.Seven;
    this.fill = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.rectangleType = OUTLINE_TYPE.borderedAndFilled;

    this.fillEnable = true;
    this.strokeEnable = true;
  }

  reset(): void {
    this.x = NB.Zero;
    this.y = NB.Zero;
    this.width = NB.Zero;
    this.height = NB.Zero;

    this.active = false;
  }

  onMouseDown(): any {
    this.active = true;
    this.fill = this.colorService.getFillColor();
    this.stroke = this.colorService.getStrokeColor();
    this.setOrigin(this.inputService.getMouse());
    this.rectangle = this.renderer.createElement('rect', 'svg');
    this.setStyle();
    this.setRectangleType();
    return this.rectangle;
  }

  setStyle() {
    this.renderer.setStyle(this.rectangle, 'fill', this.fill);
    this.renderer.setStyle(this.rectangle, 'stroke', this.stroke);
    this.renderer.setStyle(this.rectangle, 'stroke-width', this.strokeWidth.toString());
  }

  onMouseMove(): void {
    this.mouse = this.inputService.getMouse();
    if (this.active) {
      this.inputService.shiftPressed ? this.setSquareOffset() : this.setRectangleOffset();
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

  setRectangleType(): void {
    if (!this.fillEnable) {
      this.renderer.setStyle(this.rectangle, 'fill', 'none');
    }
    if (!this.strokeEnable) {
      this.renderer.setStyle(this.rectangle, 'stroke-opacity', '0');
    }
  }

  setSquareOffset(): void {
    const deplacement: Point = {
      x: this.mouse.x - this.origin.x,
      y: this.mouse.y - this.origin.y,
    };

    const width = Math.max(Math.abs(deplacement.x), Math.abs(deplacement.y));

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

  draw(): void {
    this.renderer.setAttribute(this.rectangle, 'x', this.x.toString());
    this.renderer.setAttribute(this.rectangle, 'y', this.y.toString());
    this.renderer.setAttribute(this.rectangle, 'width', this.width.toString());
    this.renderer.setAttribute(this.rectangle, 'height', this.height.toString());
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
    switch (this.rectangleType) {
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
