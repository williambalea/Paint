import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { EMPTY_STRING, NB, OUTLINE_TYPE } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class PolygonService implements Shape {
  renderer: Renderer2;

  polygon: HTMLElement;
  sideNumber: number;
  polygonType: string;
  origin: Point;
  initialPoint: Point;
  pointString: string;
  active: boolean;
  fill: string;
  fillEnable: boolean;
  stroke: string;
  strokeWidth: number;
  strokeEnable: boolean;

  constructor(private rendererFactory: RendererFactory2,
              private inputService: InputService,
              private viewChildService: ViewChildService,
              private colorService: ColorService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.strokeWidth = NB.Seven;
    this.fill = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.pointString = EMPTY_STRING;
    this.active = false;
    this.initialPoint = { x: NB.Zero, y: -(NB.One) };
    this.sideNumber = NB.Five;
    this.polygonType = OUTLINE_TYPE.borderedAndFilled;
    this.fillEnable = true;
    this.strokeEnable = true;
    this.origin = {x: 1, y: 1};
  }

  assignPolygonType(): void {
    switch (this.polygonType) {
      case OUTLINE_TYPE.bordered:
        this.assignBorderedPolygon();
        break;
      case OUTLINE_TYPE.filled:
        this.assignFilledPolygon();
        break;
      case OUTLINE_TYPE.borderedAndFilled:
        this.assignBorderedAndFilledPolygon();
        break;
      default:
    }
  }

  changePrimaryColor(color: string): void {
    this.fill = color;
  }

  changeSecondaryColor(color: string): void {
    this.stroke = color;
  }

  setPolygonType(): void {
    if (!this.fillEnable) {
      this.renderer.setAttribute(this.polygon, 'fill', 'none');
    }
    if (!this.strokeEnable) {
      this.renderer.setAttribute(this.polygon, 'stroke-opacity', '0');
    }
  }

  assignBorderedAndFilledPolygon(): void {
    this.strokeEnable = true;
    this.fillEnable = true;
  }

  assignFilledPolygon(): void {
    this.strokeEnable = false;
    this.fillEnable = true;
  }

  assignBorderedPolygon(): void {
    this.strokeEnable = true;
    this.fillEnable = false;
  }

  setOrigin(): void {
    this.origin = { x: this.inputService.getMouse().x, y: this.inputService.getMouse().y };
  }

  draw(): void {
    this.setAttributesPolygon();
    this.setStylePolygon();
    this.setPolygonType();
    this.initialPoint = { x: NB.Zero, y: -(NB.One) };
  }

  setAttributesPolygon(): void {
    this.renderer.setAttribute(this.polygon, 'points', this.pointString);
    this.renderer.setAttribute(this.polygon, 'fill', this.fill);
  }

  setStylePolygon(): void {
    this.renderer.setAttribute(this.polygon, 'stroke', this.stroke);
    this.renderer.setAttribute(this.polygon, 'stroke-width', this.strokeWidth.toString());
  }

  onMouseDown(): any {
    this.active = true;
    this.fill = this.colorService.getFillColor();
    this.stroke = this.colorService.getStrokeColor();
    this.setOrigin();
    this.polygon = this.renderer.createElement('polygon', 'svg');
    this.setPolygonType();
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, this.polygon);
    return this.polygon;
  }

  onMouseMove(): void {
    if (this.active) {
      this.generateVertices(
        Math.abs(this.inputService.getMouse().x - this.origin.x),
        Math.abs(this.inputService.getMouse().y - this.origin.y),
        this.sideNumber,
        Math.abs(this.inputService.getMouse().x - this.origin.x) / NB.Two,
        Math.abs(this.inputService.getMouse().y - this.origin.y) / NB.Two,
      );
      this.draw();
    }
  }

  onMouseUp(): void {
    this.pointString = EMPTY_STRING;
    this.active = false;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

  initialisePoints(i: number, j: number, n: number, x: number, y: number) {
    this.initialPoint.x = this.initialPoint.x + Math.min(this.origin.x, this.inputService.getMouse().x) + x;
    this.initialPoint.y = this.initialPoint.y * j / NB.Two + Math.min(this.origin.y, this.inputService.getMouse().y) + y;
    this.pointString = (`${this.initialPoint.x}` + ' ' + `${this.initialPoint.y}`);
  }

  generateVertices(i: number, j: number, n: number, x: number, y: number): void {
    let angle: number = NB.ThreeHundredSixty / n;
    this.initialisePoints(i, j, n, x, y);
    for (let k = 0; k < n - 1; k++) {
      const newPointX: number = (-Math.sin(angle * Math.PI / NB.OneHundredEighty) * i /
        NB.Two + Math.min(this.origin.x, this.inputService.getMouse().x)) + x;
      const newPointY: number = (-Math.cos(angle * Math.PI / NB.OneHundredEighty) * j /
        NB.Two + Math.min(this.origin.y, this.inputService.getMouse().y)) + y;
      this.pointString += (' ' + `${newPointX}`);
      this.pointString += (' ' + `${newPointY}`);
      angle += NB.ThreeHundredSixty / n;
    }
  }

}
