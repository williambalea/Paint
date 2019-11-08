import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { NB } from 'src/constants';
import * as svgIntersections from 'svg-intersections';
import { InputService } from '../input.service';
import { RectangleService } from '../shapes/rectangle.service';
import { Shape } from '../shapes/shape';
import { ViewChildService } from '../view-child.service';

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
    private viewChildService: ViewChildService,
    private inputService: InputService) {
    this.active = false;
    this.selectedShapes = [];
    this.selectorIsSingle = true;
  }

  onMouseDown(): any {
    this.validateSelectorIsSingle();
    this.renderer.setAttribute(this.rectangle, 'fill', 'none');
    this.renderer.setAttribute(this.rectangle, 'stroke-dasharray', '3');
    this.renderer.setAttribute(this.rectangle, 'stroke', 'navy');
    this.validateMouseButton();
    this.renderer.setAttribute(this.rectangle, 'stroke-width', '1');
    this.renderer.setAttribute(this.rectangle, 'stroke-opacity', '1');
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
      this.renderer.setAttribute(this.rectangle, 'stroke', 'red');
    }
  }

  onMouseMove(): void {
    this.rectangleService.onMouseMove();
  }

  onMouseUp(): void {
    this.selectorIsSingle = true;
    this.rectangleService.onMouseUp();
    this.renderer.removeChild(this.viewChildService.canvas.nativeElement, this.rectangle);
  }

  returnRect(child: SVGGraphicsElement): any {
    return svgIntersections.shape('rect', {
      x: child.getBBox().x,
      y: child.getBBox().y,
      width: child.getBBox().width,
      height: child.getBBox().height,
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

  intersection(selectorArea: any, canvas: ElementRef): void {
    const intersect = svgIntersections.intersect;
    const elementsCount: number = canvas.nativeElement.children.length;
    let currentShape: any;
    for (let i = 0; i < elementsCount; i++) {
      if (selectorArea === canvas.nativeElement.children[i]) {
        return;
      }
      currentShape = this.setCurrentShape(canvas.nativeElement.children[i]);
      const intersections = intersect(
        this.returnIntersectionShape(selectorArea),
        currentShape,
      );
      if (intersections.points.length === NB.Two) {
        this.validateIntersection(canvas.nativeElement.children[i]);
      }
    }
  }

  setCurrentShape(value: SVGGraphicsElement): any {
    switch (value.tagName) {
      case 'ellipse':
        return this.returnEllipse(value);
      case 'path':
        return this.returnPath(value);
      case 'rect':
      case 'polygon':
      case 'image':
      case 'text':
      case 'g':
        return this.returnRect(value);
      default:
    }
  }
}
