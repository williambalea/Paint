import { Injectable } from '@angular/core';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { Rectangle } from './classes/rectangle';
import { Shape } from './classes/shape';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {

  shapes: Shape[] = [];
  preview: Preview;
  mouse: Point;
  origin: Point;
  strokeWidth: number;
  strokeEnable = true;
  fillEnable = true;

  constructor() {
    this.preview = {
      active: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  setMouseOrigin(event: MouseEvent): void {
    this.origin = {x: event.offsetX, y: event.offsetY};
    this.preview = {
      active: true,
      x: event.offsetX,
      y: event.offsetY,
      width: 0,
      height: 0,
    };
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

  drawRectangle(preview: Preview, fill: string, stroke: string): Shape {
    const rectangle = new Rectangle (
      preview.x,
      preview.y,
      preview.width,
      preview.height,
      fill,
      stroke,
      this.strokeWidth,
    );
    this.shapes.push(rectangle);
    return this.getShape(this.shapes.length);
    }

  clearShapes(): void {
    this.shapes = [];
  }

  getShape(shapeNumber: number): Shape{
    return this.shapes[shapeNumber];
  }
}
