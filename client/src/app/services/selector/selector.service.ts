import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import * as svgIntersections from 'svg-intersections';
import { InputService } from '../input.service';
import { RectangleService } from '../shapes/rectangle.service';
import { Shape } from '../shapes/shape';

@Injectable({
  providedIn: 'root',
})
export class SelectorService implements Shape {
  rectangle: HTMLElement;
  active: boolean;
  selectedShapes: any[];

  constructor(private rectangleService: RectangleService,
              private renderer: Renderer2,
              private inputService: InputService) {
                this.active = false;
                this.selectedShapes = [];
              }

  onMouseDown(): any {
    this.rectangle = this.rectangleService.onMouseDown();
    this.renderer.setStyle(this.rectangle, 'fill', 'none');
    this.renderer.setStyle(this.rectangle, 'stroke-dasharray', '3');
    this.renderer.setStyle(this.rectangle, 'stroke', 'navy');
    this.renderer.setStyle(this.rectangle, 'stroke-width', '2');
    return this.rectangle;
  }
  onMouseMove(): void {
    this.rectangleService.onMouseMove();
  }
  onMouseUp(): void {
    this.rectangle = this.renderer.createElement('rect', 'svg');
  }

  intersection(selectorArea: any, canvas: ElementRef): void {
    const intersect = svgIntersections.intersect;
    const shape = svgIntersections.shape;
    const elementsCount: number = canvas.nativeElement.children.length;
    let currentShape: any;
    for ( let i = 0; i < elementsCount; i++ ) {
      if (selectorArea === canvas.nativeElement.children[i]) {
        break;
      }
      switch (canvas.nativeElement.children[i].tagName) {
        case 'rect':
          currentShape = shape('rect', {
            x: canvas.nativeElement.children[i].getAttribute('x'),
            y: canvas.nativeElement.children[i].getAttribute('y'),
            width: canvas.nativeElement.children[i].getAttribute('width'),
            height: canvas.nativeElement.children[i].getAttribute('height'),
          });
          break;
        case 'ellipse':
          currentShape = shape('ellipse', {
            cx: canvas.nativeElement.children[i].getAttribute('cx'),
            cy: canvas.nativeElement.children[i].getAttribute('cy'),
            rx: canvas.nativeElement.children[i].getAttribute('rx'),
            ry: canvas.nativeElement.children[i].getAttribute('ry'),
          });
          break;
        case 'path':
          currentShape = shape('path', {
            d: canvas.nativeElement.children[i].getAttribute('d'),
          });
          break;
        case 'polygon':
          currentShape = shape('polygon', {
            points: canvas.nativeElement.children[i].getAttribute('points'),
          });
          break;
        case 'image':
          currentShape = shape('rect', {
            x: canvas.nativeElement.children[i].getAttribute('x'),
            y: canvas.nativeElement.children[i].getAttribute('y'),
            width: canvas.nativeElement.children[i].getAttribute('width'),
            height: canvas.nativeElement.children[i].getAttribute('height'),
          });
          break;
      }
      const intersections = intersect (
        shape('rect', {
          x: selectorArea.x.animVal.value,
          y: selectorArea.y.animVal.value,
          width: selectorArea.width.animVal.value,
          height: selectorArea.height.animVal.value }),
          currentShape,
      );
      if (intersections.points.length !== 0) {
        if (this.inputService.mouseButton === 2) {
          this.selectedShapes.splice(canvas.nativeElement.children[i]);
        }
        if (!this.selectedShapes.includes(canvas.nativeElement.children[i]) && this.inputService.mouseButton === 0) {
          this.selectedShapes.push(canvas.nativeElement.children[i]);
          console.log(this.selectedShapes);
        }
      }
    }
  }

}
