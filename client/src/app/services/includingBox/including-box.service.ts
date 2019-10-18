import { Injectable, Renderer2 } from '@angular/core';
import { NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { SelectorService } from '../selector/selector.service';

@Injectable({
  providedIn: 'root',
})
export class IncludingBoxService {
  boxUpperLeft: Point;
  width: number;
  height: number;
  boxGElement: HTMLElement;

  constructor(private selectorService: SelectorService,
              private renderer: Renderer2) {
    this.boxUpperLeft = {x: Number.MAX_VALUE, y: Number.MAX_VALUE};
    this.width = NB.Zero;
    this.height = NB.Zero;
    this.boxGElement = this.renderer.createElement('g', 'svg');
  }

  update(): void {
    this.selectorService.selectedShapes.forEach((value: SVGGraphicsElement) => {
      const shapeBoundary: SVGRect = value.getBBox();
      if (value.style.strokeOpacity !== NB.Zero.toString()) {
        const strokeWidthOverflow = Number.parseInt(value.style.strokeWidth as string, 10);
        shapeBoundary.x -= strokeWidthOverflow / 2;
        shapeBoundary.y -= strokeWidthOverflow / 2;
        shapeBoundary.width += strokeWidthOverflow;
        shapeBoundary.height += strokeWidthOverflow;
      }
      const shapeLowerRight: Point = {
        x: shapeBoundary.x + shapeBoundary.width,
        y: shapeBoundary.y + shapeBoundary.height,
      };
      const boxLowerRight: Point = {
        x: this.boxUpperLeft.x + this.width,
        y: this.boxUpperLeft.y + this.height,
      };
      if (shapeBoundary.x < this.boxUpperLeft.x) {
        this.boxUpperLeft.x = shapeBoundary.x;
      }
      if (shapeBoundary.y < this.boxUpperLeft.y) {
        this.boxUpperLeft.y = shapeBoundary.y;
      }
      if (shapeLowerRight.x > boxLowerRight.x) {
        const distanceBetween = shapeLowerRight.x - boxLowerRight.x;
        this.width += distanceBetween;
      }
      if (shapeLowerRight.y > boxLowerRight.y) {
        const distanceBetween = shapeLowerRight.y - boxLowerRight.y;
        this.height += distanceBetween;
      }
    });
    this.draw();
  }

  draw(): void {
    this.boxGElement = this.renderer.createElement('g', 'svg');
    this.appendRectangleBox();
    this.appendControlPoints();
  }

  appendRectangleBox(): void {
    const rectangle = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(rectangle, 'x', this.boxUpperLeft.x.toString());
    this.renderer.setAttribute(rectangle, 'y', this.boxUpperLeft.y.toString());
    this.renderer.setAttribute(rectangle, 'width', this.width.toString());
    this.renderer.setAttribute(rectangle, 'height', this.height.toString());
    this.renderer.setStyle(rectangle, 'stroke-width', '1');
    this.renderer.setStyle(rectangle, 'stroke', 'navy');
    this.renderer.setStyle(rectangle, 'fill', 'none');
    this.renderer.appendChild(this.boxGElement, rectangle);
  }

  appendControlPoints(): void {
    const positions: Point[] = this.setControlPoints();
    for (let i = 0; i < NB.Eight; i++) {
      const point = this.renderer.createElement('circle', 'svg');
      this.renderer.setAttribute(point, 'cx', positions[i].x.toString());
      this.renderer.setAttribute(point, 'cy', positions[i].y.toString());
      this.renderer.setAttribute(point, 'r', NB.Four.toString());
      this.renderer.setAttribute(point, 'id', `control${i}`);
      this.renderer.setStyle(point, 'fill', 'white');
      this.renderer.setStyle(point, 'stroke', 'navy');
      this.renderer.setStyle(point, 'stroke-width', '1');
      this.renderer.appendChild(this.boxGElement, point);
    }
  }

  setControlPoints(): Point[] {
    const positions: Point[] = [
      { x:  this.boxUpperLeft.x,                     y:  this.boxUpperLeft.y                       },
      { x: (this.boxUpperLeft.x + (this.width / 2)), y:  this.boxUpperLeft.y                       },
      { x: (this.boxUpperLeft.x + this.width),       y:  this.boxUpperLeft.y                       },
      { x:  this.boxUpperLeft.x,                     y: (this.boxUpperLeft.y + (this.height / 2))  },
      { x: (this.boxUpperLeft.x + this.width),       y: (this.boxUpperLeft.y + (this.height / 2))  },
      { x:  this.boxUpperLeft.x,                     y:  this.boxUpperLeft.y + (this.height)       },
      { x: (this.boxUpperLeft.x + (this.width / 2)), y:  this.boxUpperLeft.y + (this.height)       },
      { x: (this.boxUpperLeft.x + this.width),       y:  this.boxUpperLeft.y + (this.height)       },
    ];
    return positions;
  }
}
