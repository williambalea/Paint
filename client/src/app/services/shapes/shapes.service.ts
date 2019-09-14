import { Injectable } from '@angular/core';
import { Preview } from '../../../../../common/interface/preview';
import { Rectangle } from './classes/rectangle';
import { Shape } from './classes/shape';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {

  shapes: Shape[] = [];

  // TODO: put coloring in own interface
  drawRectangle(preview: Preview, fill: string, stroke: string, strokeWidth: number): void {
    const rectangle: Rectangle = {
      x: preview.x,
      y: preview.y,
      width: preview.width,
      height: preview.height,
      fill,
      stroke,
      strokeWidth,
    };
    this.shapes.push(rectangle);
  }
}
