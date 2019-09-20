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

  /* MAB: Ajout de méthodes pour l'accès des attributs du rectangle 

  fetchRectangle() {
    const rectangle = new Rectangle(1, 2, 3, 4, 'black', 'black', 5);
    return rectangle;
  }
  */

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



  // TODO: put options (fill, etc.) in own interface
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
    return this.getShape(this.shapes.length); // return latest shape (rectangle) for handling
    }

  clearShapes():void {
    this.shapes = [];
  }

  getShape(shapeNumber:number): Shape{
    return this.shapes[shapeNumber];
  }

  /*
  //TODO: find out how the nature of a line impacts how the preview works.
  drawLine(preview:Preview, stroke:string, strokeWidth:number): Shape{
    const line = new Line (
      preview.x,
      preview.y,
      fill,
      stroke,
      strokeWidth    
    );
    this.shapes.push(line);
    return this.getShape(this.shapes.length);
  }
  */

}

  
