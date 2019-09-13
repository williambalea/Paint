import { Injectable } from '@angular/core';
import { Preview } from '../../../../../common/interface/preview';
import { Shape } from './classes/shape';
import { Rectangle } from './classes/rectangle';

@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  public shapes: Shape[] = [];

  constructor() { }

  // TODO: put coloring in own interface
  public drawRectangle(preview: Preview, fill: string, stroke: string, strokeWidth: number): void {
    const rectangle: Rectangle = {
      x: preview.x,
      y: preview.y,
      width: preview.width,
      height: preview.height,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth
    }
    this.shapes.push(rectangle);
  }
}
