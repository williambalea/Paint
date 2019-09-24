import { Injectable } from '@angular/core';
import { EMPTY_STRING, tool } from '../../../../../common/constants';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { Pen } from './classes/pen';
import { Rectangle } from './classes/rectangle';
import { Shape } from './classes/shape';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {

  shapes: Shape[] = [];
  mouse: Point;
  origin: Point;

  preview: Preview;
  rectangle: Rectangle;
  pen: Pen;

  strokeWidth: number;
  fillColor: string;
  strokeColor: string;

  strokeEnable = true;
  fillEnable = true;

  constructor() {
    this.resetPreview();
    this.strokeWidth = 1;
  }

  setMouseOrigin(event: MouseEvent): void {
    this.origin = {x: event.offsetX, y: event.offsetY};
    this.preview.x = event.offsetX;
    this.preview.y = event.offsetY;
    this.preview.width = 0;
    this.preview.height = 0;
  }

  setRectangleOffset(): void {
    this.preview.width = Math.abs(this.mouse.x - this.origin.x);
    this.preview.height = Math.abs(this.mouse.y - this.origin.y);
    this.preview.x = Math.min(this.origin.x, this.mouse.x);
    this.preview.y = Math.min(this.origin.y, this.mouse.y);
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

    this.preview.width = width;
    this.preview.height = width;
    this.preview.x = Math.min(this.origin.x, newOffset.x);
    this.preview.y = Math.min(this.origin.y, newOffset.y);
  }

  setRectangleType(): void {
    if (!this.fillEnable) {
      this.fillColor = this.removeColor(this.fillColor);
    }
    if (!this.strokeEnable) {
      this.strokeColor = this.removeColor(this.strokeColor);
    }
  }

  drawRectangle(): Shape {
    this.setRectangleType();
    const rectangle = new Rectangle (
      tool.rectangle,
      this.preview.x,
      this.preview.y,
      this.preview.width,
      this.preview.height,
      this.fillColor,
      this.strokeColor,
      this.strokeWidth,
    );
    this.shapes.push(rectangle);
    return this.getShape(this.shapes.length);
  }

  drawPencil(): void {
    const pen = new Pen (
      tool.pen,
      this.preview.path,
      this.fillColor,
      this.strokeWidth,
    );
    this.shapes.push(pen);
  }

  clearShapes(): void {
    this.shapes = [];
  }

  getShape(shapeNumber: number): Shape {
    return this.shapes[shapeNumber];
  }

  removeColor(fill: string): string {
    const individualParams: string[] = fill.substr(5, fill.length - 1).split(',', 4);
    return `rgba(${individualParams[0]},${individualParams[1]},${individualParams[2]},0)`;
  }

  resetPreview(): void {
    this.preview = {
      active: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      path: EMPTY_STRING,
    };
  }

}
