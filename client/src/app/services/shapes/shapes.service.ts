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
    const rectangle = new Rectangle (
      preview.x,
      preview.y,
      preview.width,
      preview.height,
      fill,
      stroke,
      strokeWidth,
    );
    this.shapes.push(rectangle);
    }

  clearShapes():void {
    this.shapes = [];
  }
}

  
