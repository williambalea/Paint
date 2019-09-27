import { Injectable } from '@angular/core';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { Brush } from '../../../Classes/brush';
import { Pen } from '../../../Classes/pen';
import { Rectangle } from '../../../Classes/rectangle';
import { Shape } from '../../../Classes/shape';
import { BRUSH, EMPTY_STRING, NB, TOOL } from '../../../constants';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {
  // TODO: QA
  shapes: Shape[];
  mouse: Point;
  origin: Point;
  preview: Preview;
  rectangleStrokeWidth: number;
  fillColor: string;
  strokeColor: string;
  penStrokeWidth: number;
  brushStrokeWidth: number;
  brushStyle: BRUSH;
  strokeEnable: boolean;
  fillEnable: boolean;

  constructor() {
    this.shapes = [];
    this.resetPreview();
    this.rectangleStrokeWidth = NB.Seven;
    this.penStrokeWidth = NB.Seven;
    this.brushStrokeWidth = NB.Seven;
    this.brushStyle = BRUSH.smooth;
    this.strokeEnable = true;
    this.fillEnable = true;
  }

  getShapes(): Shape[] {
    return this.shapes;
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
      TOOL.rectangle,
      this.preview.x,
      this.preview.y,
      this.preview.width,
      this.preview.height,
      this.fillColor,
      this.strokeColor,
      this.rectangleStrokeWidth,
    );
    this.shapes.push(rectangle);
    return this.getShape(this.shapes.length);
  }

  drawPen(): void {
    const pen = new Pen (
      TOOL.pen,
      this.preview.path,
      this.fillColor,
      this.penStrokeWidth,
    );
    this.shapes.push(pen);
  }

  drawBrush(): void {
    const brush = new Brush (
      TOOL.brush,
      this.preview.path,
      this.fillColor,
      this.brushStrokeWidth,
      this.preview.filter,
    );
    this.shapes.push(brush);
  }

  clearShapes(): void {
    this.shapes = [];
  }

  getShape(shapeNumber: number): Shape {
    return this.shapes[shapeNumber];
  }

  removeColor(fill: string): string {
    const individualParams: string[] = fill.substr(NB.Five, fill.length - NB.One).split(',', NB.Four);
    return `rgba(${individualParams[NB.Zero]},${individualParams[NB.One]},${individualParams[NB.Two]},0)`;
  }

  resetPreview(): void {
    this.preview = {
      active: false,
      x: NB.Zero,
      y: NB.Zero,
      width: NB.Zero,
      height: NB.Zero,
      path: EMPTY_STRING,
      filter: EMPTY_STRING,
    };
  }

}
