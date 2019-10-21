import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { NB } from 'src/constants';
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
  selectedShapes: SVGGraphicsElement[];
  selectorIsSingle: boolean;

  constructor(private rectangleService: RectangleService,
              private renderer: Renderer2,
              private inputService: InputService) {
    this.active = false;
    this.selectedShapes = [];
    this.selectorIsSingle = true;
  }

  onMouseDown(): any {
    this.validateSelectorIsSingle();
    this.renderer.setStyle(this.rectangle, 'fill', 'none');
    this.renderer.setStyle(this.rectangle, 'stroke-dasharray', '3');
    this.renderer.setStyle(this.rectangle, 'stroke', 'navy');
    this.validateMouseButton();
    this.renderer.setStyle(this.rectangle, 'stroke-width', '1');
    this.renderer.setStyle(this.rectangle, 'stroke-opacity', '1');
    return this.rectangle;
  }

  validateSelectorIsSingle(): void {
    if (this.selectorIsSingle) {
      this.rectangle = this.rectangleService.onMouseDown();
      this.selectorIsSingle = false;
    }
  }
  validateMouseButton(): void {
    if (this.inputService.mouseButton === 2) {
      this.renderer.setStyle(this.rectangle, 'stroke', 'red');
    }
  }

  onMouseMove(): void {
    this.rectangleService.onMouseMove();
  }
  onMouseUp(): void {
    this.selectorIsSingle = true;
  }

  isCloseTo(x: number, y: number): boolean {
    return (x + NB.ZeroPointFive > y) && (y + NB.ZeroPointFive > x);
  }

  returnRect(child: SVGGraphicsElement): any {
    return svgIntersections.shape('rect', {
      x: child.getAttribute('x'),
      y: child.getAttribute('y'),
      width: child.getAttribute('width'),
      height: child.getAttribute('height'),
    });
  }

  returnEllipse(child: SVGGraphicsElement): any {
    return svgIntersections.shape('ellipse', {
      cx: child.getAttribute('cx'),
      cy: child.getAttribute('cy'),
      rx: child.getAttribute('rx'),
      ry: child.getAttribute('ry'),
    });
  }

  returnPath(child: SVGGraphicsElement): any {
    return svgIntersections.shape('path', {
      d: child.getAttribute('d'),
    });
  }

  returnPolygon(child: SVGGraphicsElement): any {
    return svgIntersections.shape('rect', {
      x: child.getBBox().x,
      y: child.getBBox().y,
      width: child.getBBox().width,
      height: child.getBBox().height,
    });
  }

  returnImage(child: SVGGraphicsElement): any {
    return svgIntersections.shape('rect', {
      x: child.getAttribute('x'),
      y: child.getAttribute('y'),
      width: child.getAttribute('width'),
      height: child.getAttribute('height'),
    });
  }

  returnIntersectionShape(selectorArea: any): any {
    return svgIntersections.shape('rect', {
      x: selectorArea.x.animVal.value,
      y: selectorArea.y.animVal.value,
      width: selectorArea.width.animVal.value,
      height: selectorArea.height.animVal.value,
    });
  }

  validateIntersection(child: SVGGraphicsElement): void {
    if (this.inputService.mouseButton === NB.Two) {
      const index = this.selectedShapes.indexOf(child);
      if (index !== -NB.One) {
        this.selectedShapes.splice(index, NB.One);
      }
    }
    if (!this.selectedShapes.includes(child) && this.inputService.mouseButton === NB.Zero) {
      this.selectedShapes.push(child);
    }
  }

  isCorrectIntersection(intersections: any): boolean {
    return (intersections.points.length !== NB.Zero) &&
        (!this.isCloseTo(intersections.points[NB.Zero].x, intersections.points[NB.One].x)) &&
        (!this.isCloseTo(intersections.points[NB.Zero].y, intersections.points[NB.One].y))
  }

  intersection(selectorArea: any, canvas: ElementRef): void {
    const intersect = svgIntersections.intersect;
    const elementsCount: number = canvas.nativeElement.children.length;
    let currentShape: any;
    for (let i = 0; i < elementsCount; i++) {
      if (selectorArea === canvas.nativeElement.children[i]) {
        break;
      }
      switch (canvas.nativeElement.children[i].tagName) {
        case 'rect':
          currentShape = this.returnRect(canvas.nativeElement.children[i]);
          break;
        case 'ellipse':
          currentShape = this.returnEllipse(canvas.nativeElement.children[i]);
          break;
        case 'path':
          currentShape = this.returnPath(canvas.nativeElement.children[i]);
          break;
        case 'polygon':
          currentShape = this.returnPolygon(canvas.nativeElement.children[i]);
          break;
        case 'image':
          currentShape = this.returnPolygon(canvas.nativeElement.children[i]);
          break;
      }
      const intersections = intersect(
        this.returnIntersectionShape(selectorArea),
        currentShape,
      );
      if (this.isCorrectIntersection(intersections)) {
        this.validateIntersection(canvas.nativeElement.children[i]);
      }
    }
  }
}
