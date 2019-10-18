import { Injectable, Renderer2 } from '@angular/core';
import { NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { SelectorService } from '../selector/selector.service';

@Injectable({
  providedIn: 'root',
})
export class IncludingBoxService {
  upperLeft: Point;
  width: number;
  height: number;
  boxGElement: HTMLElement;
  box: HTMLElement;

  constructor(private selectorService: SelectorService,
              private renderer: Renderer2) {
    // this.box = {x: Number.MAX_VALUE, y: Number.MAX_VALUE};
    // this.width = NB.Zero;
    // this.height = NB.Zero;
    this.upperLeft = {x: 100, y: 100};
    this.width = 300;
    this.height = 300;
  }

  update(): void {
    this.selectorService.selectedShapes.forEach((value: SVGGraphicsElement) => {
      const shapeBoundary: SVGRect = value.getBBox();
      if (shapeBoundary.x < this.upperLeft.x) {
        this.upperLeft.x = shapeBoundary.x;
      }
      if (shapeBoundary.y < this.upperLeft.y) {
        this.upperLeft.y = shapeBoundary.y;
      }
      // TODO
    });
    this.draw();
  }

  draw(): void {
    this.boxGElement = this.renderer.createElement('g', 'svg');
    this.appendRectangleBox();
    this.appendControlPoints();
  }

  appendRectangleBox(): void {
    this.box = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(this.box, 'x', this.upperLeft.x.toString());
    this.renderer.setAttribute(this.box, 'y', this.upperLeft.y.toString());
    this.renderer.setAttribute(this.box, 'width', this.width.toString());
    this.renderer.setAttribute(this.box, 'height', this.height.toString());
    this.renderer.setStyle(this.box, 'stroke-width', '1');
    this.renderer.setStyle(this.box, 'stroke', 'navy');
    this.renderer.setStyle(this.box, 'fill', 'none');
    this.renderer.appendChild(this.boxGElement, this.box);
  }

  appendControlPoints(): void {
    const positions: Point[] = this.setControlPoints();
    for (let i = 0; i < NB.Nine; i++) {
      const point = this.renderer.createElement('circle', 'svg');
      this.renderer.setAttribute(point, 'cx', positions[i].x.toString());
      this.renderer.setAttribute(point, 'cy', positions[i].y.toString());
      this.renderer.setAttribute(point, 'rx', NB.Four.toString());
      this.renderer.setAttribute(point, 'ry', NB.Four.toString());
      this.renderer.setAttribute(point, 'id', `control${i}`);
      this.renderer.setStyle(point, 'fill', 'none');
      this.renderer.setStyle(point, 'stroke', 'navy');
      this.renderer.setStyle(point, 'stroke-width', '1');
      this.renderer.appendChild(this.boxGElement, point);
    }
  }

  setControlPoints(): Point[] {
    const positions: Point[] = [
      { x:  this.upperLeft.x,                     y:  this.upperLeft.y                       },
      { x: (this.upperLeft.x + (this.width / 2)), y:  this.upperLeft.y                       },
      { x: (this.upperLeft.x + this.width),       y:  this.upperLeft.y                       },
      { x:  this.upperLeft.x,                     y: (this.upperLeft.y + (this.height / 2))  },
      { x: (this.upperLeft.x + this.width),       y: (this.upperLeft.y + (this.height / 2))  },
      { x:  this.upperLeft.x,                     y:  this.upperLeft.y + (this.height)       },
      { x: (this.upperLeft.x + (this.width / 2)), y:  this.upperLeft.y + (this.height)       },
      { x: (this.upperLeft.x + this.width),       y:  this.upperLeft.y + (this.height)       },
    ];
    return positions;
  }
}
