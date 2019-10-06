import { Injectable } from '@angular/core';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { Brush } from '../../../Classes/Shapes/brush';
import { Pen } from '../../../Classes/Shapes/pen';
import { Shape } from '../../../Classes/Shapes/shape';
import { BRUSH, COLORS, EMPTY_STRING, NB, TOOL } from '../../../constants';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {
  shapes: Shape[];
  mouse: Point;
  origin: Point;
  preview: Preview;
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
    this.fillColor = COLORS.blackRGBA;
    this.strokeColor = COLORS.whiteRGBA;
    this.penStrokeWidth = NB.Seven;
    this.brushStrokeWidth = NB.Seven;
    this.brushStyle = BRUSH.smooth;
    this.strokeEnable = true;
    this.fillEnable = true;
    this.mouse = {x: NB.Zero, y: NB.Zero};
    this.origin = {x: NB.Zero, y: NB.Zero};
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
