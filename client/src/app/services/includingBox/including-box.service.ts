import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { EMPTY_STRING, NB, SVGinnerWidth } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { SelectorService } from '../selector/selector.service';
import { ViewChildService } from '../view-child.service';

@Injectable({
  providedIn: 'root',
})
export class IncludingBoxService {
  renderer: Renderer2;
  boxUpperLeft: Point;
  width: number;
  height: number;

  constructor(private selectorService: SelectorService,
              private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.clear();
  }

  clear(): void {
    this.boxUpperLeft = { x: NB.Zero, y: NB.Zero };
    this.width = NB.Zero;
    this.height = NB.Zero;
  }

  update(): void {
    (this.viewChildService.includingBox.nativeElement as SVGGraphicsElement).innerHTML = EMPTY_STRING;
    this.boxUpperLeft = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
    const finalPoint: Point = { x: 0, y: 0 };
    const bottomRight: Point = { x: 0, y: 0 };
    this.selectorService.selectedShapes.forEach((value: SVGGraphicsElement) => {
      const clientRect = value.getBoundingClientRect() as DOMRect;
      const shapeBoundary = {
        x: clientRect.x - SVGinnerWidth - NB.One,
        y: clientRect.y - NB.One,
        width: clientRect.width,
        height: clientRect.height,
      } as SVGRect;
      this.validateNoStroke(value, shapeBoundary);
      this.calculateInitialPoint(shapeBoundary);
      this.calculateBottomRight(bottomRight, shapeBoundary);
      this.calculateFinalPoint(bottomRight, finalPoint);
    });
    this.calculateSize(finalPoint);
    this.draw();
  }

  calculateSize( finalPoint: Point): void {
    this.width = finalPoint.x - this.boxUpperLeft.x;
    this.height = finalPoint.y - this.boxUpperLeft.y;
  }

  calculateFinalPoint(bottomRight: Point, finalPoint: Point): void {
    if (bottomRight.x > finalPoint.x) {
      finalPoint.x = bottomRight.x;
    }
    if (bottomRight.y > finalPoint.y) {
      finalPoint.y = bottomRight.y;
    }
  }

  calculateBottomRight(bottomRight: Point, shapeBoundary: SVGRect): void {
    bottomRight.x = shapeBoundary.x + shapeBoundary.width;
    bottomRight.y = shapeBoundary.y + shapeBoundary.height;
  }

  validateNoStroke(value: SVGGraphicsElement, shapeBoundary: SVGRect): void {
    if (value.getAttribute('stroke-opacity') !== NB.Zero.toString() &&
    value.tagName !== 'image' && value.tagName !== 'text' && value.tagName !== 'g') {
      const strokeWidthOverflow = Number(value.getAttribute('stroke-width') as string);
      shapeBoundary.x -= strokeWidthOverflow / NB.Two;
      shapeBoundary.y -= strokeWidthOverflow / NB.Two;
      shapeBoundary.width += strokeWidthOverflow;
      shapeBoundary.height += strokeWidthOverflow;
    }
  }

  calculateInitialPoint(shapeBoundary: SVGRect ): void {
    if (shapeBoundary.x < this.boxUpperLeft.x) {
      this.boxUpperLeft.x = shapeBoundary.x;
    }
    if (shapeBoundary.y < this.boxUpperLeft.y) {
      this.boxUpperLeft.y = shapeBoundary.y;
    }
  }

  draw(): void {
    this.appendRectangleBox();
    this.appendControlPoints();
  }

  appendRectangleBox(): void {
    if (this.width > 0 && this.height > 0) {
      const rectangle = this.renderer.createElement('rect', 'svg');
      this.setAttributeRectangleBox(rectangle);
      this.setStyleRectangleBox(rectangle);
      this.renderer.appendChild(this.viewChildService.includingBox.nativeElement, rectangle);
    }
  }

  setAttributeRectangleBox(rectangle: SVGGraphicsElement): void {
    this.renderer.setAttribute(rectangle, 'x', this.boxUpperLeft.x.toString());
    this.renderer.setAttribute(rectangle, 'y', this.boxUpperLeft.y.toString());
    this.renderer.setAttribute(rectangle, 'width', this.width.toString());
    this.renderer.setAttribute(rectangle, 'height', this.height.toString());
  }

  setStyleRectangleBox(rectangle: SVGGraphicsElement): void {
    this.renderer.setAttribute(rectangle, 'stroke-width', '1');
    this.renderer.setAttribute(rectangle, 'stroke', 'navy');
    this.renderer.setAttribute(rectangle, 'fill', 'none');
  }

  appendControlPoints(): void {
    if (this.width > 0 && this.height > 0) {
      const positions: Point[] = this.setControlPoints();
      for (let i = 0; i < NB.Eight; i++) {
        const point = this.renderer.createElement('circle', 'svg');
        this.setAttributeControlPoints(point, positions[i]);
        this.renderer.setAttribute(point, 'id', `control${i}`);
        this.setStylePoints(point, positions[i]);
        this.renderer.appendChild(this.viewChildService.includingBox.nativeElement, point);
      }
    }
  }

  setAttributeControlPoints(point: SVGGraphicsElement, positions: Point): void {
    this.renderer.setAttribute(point, 'cx', positions.x.toString());
    this.renderer.setAttribute(point, 'cy', positions.y.toString());
    this.renderer.setAttribute(point, 'r', NB.Four.toString());
  }

  setStylePoints(point: SVGGraphicsElement, positions: Point): void {
    this.renderer.setAttribute(point, 'fill', 'white');
    this.renderer.setAttribute(point, 'stroke', 'navy');
    this.renderer.setAttribute(point, 'stroke-width', '1');
  }

  setControlPoints(): Point[] {
    const positions: Point[] = [
      { x: this.boxUpperLeft.x, y: this.boxUpperLeft.y },
      { x: (this.boxUpperLeft.x + (this.width / NB.Two)), y: this.boxUpperLeft.y },
      { x: (this.boxUpperLeft.x + this.width), y: this.boxUpperLeft.y },
      { x: this.boxUpperLeft.x, y: (this.boxUpperLeft.y + (this.height / NB.Two)) },
      { x: (this.boxUpperLeft.x + this.width), y: (this.boxUpperLeft.y + (this.height / NB.Two)) },
      { x: this.boxUpperLeft.x, y: this.boxUpperLeft.y + (this.height) },
      { x: (this.boxUpperLeft.x + (this.width / NB.Two)), y: this.boxUpperLeft.y + (this.height) },
      { x: (this.boxUpperLeft.x + this.width), y: this.boxUpperLeft.y + (this.height) },
    ];
    return positions;
  }
}
