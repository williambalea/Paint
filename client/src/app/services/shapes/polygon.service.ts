import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB, OUTLINE_TYPE } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class PolygonService implements Shape {

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

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
                this.strokeWidth = NB.Seven;
                this.fill = EMPTY_STRING;
                this.stroke = EMPTY_STRING;
                this.pointString = EMPTY_STRING;
                this.active = false;
                this.initialPoint = {x: NB.Zero, y: -(NB.One)};
                this.sideNumber = NB.Five;
                this.polygonType = OUTLINE_TYPE.borderedAndFilled;
                this.fillEnable = true;
                this.strokeEnable = true;
              }

  assignPolygonType() {
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
      this.fill = this.removeColor(this.fill);
    }
    if (!this.strokeEnable) {
      this.stroke = this.removeColor(this.stroke);
    }
  }

  removeColor(fill: string): string {
    const individualParams: string[] = fill.substr(NB.Five, fill.length - NB.One).split(',', NB.Four);
    return `rgba(${individualParams[NB.Zero]},${individualParams[NB.One]},${individualParams[NB.Two]},0)`;
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

  setOrigin() {
    this.origin = { x : this.inputService.getMouse().x, y: this.inputService.getMouse().y};
  }

  draw() {
    this.renderer.setAttribute(this.polygon, 'points', this.pointString);
    this.renderer.setStyle(this.polygon, 'fill', this.fill);
    this.renderer.setStyle(this.polygon, 'stroke', this.stroke);
    this.renderer.setStyle(this.polygon, 'stroke-width', this.strokeWidth.toString());
    this.initialPoint = {x: NB.Zero, y: -(NB.One)};
  }

  onMouseDown(): any  {
    this.active = true;
    this.fill = this.colorService.getFillColor();
    this.stroke = this.colorService.getStrokeColor();
    this.setOrigin() ;
    this.setPolygonType();
    this.polygon = this.renderer.createElement('polygon', 'svg');
    return this.polygon;
  }

  onMouseMove(): void {
    if (this.active) {
      this.generateVertices(
                            Math.abs(this.inputService.getMouse().x - this.origin.x),
                            Math.abs(this.inputService.getMouse().y - this.origin.y ),
                            this.sideNumber,
                            Math.abs(this.inputService.getMouse().x - this.origin.x) / 2,
                            Math.abs(this.inputService.getMouse().y - this.origin.y) / 2,
                            );
      this.draw();
    }
  }

  onMouseUp(): void {
    this.pointString = EMPTY_STRING;
    this.active = false;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

  generateVertices(i: number, j: number, n: number, x: number , y: number ): void {
    let angle: number = NB.ThreeHundredSixty / n;

    this.initialPoint.x =   this.initialPoint.x + Math.min(this.origin.x, this.inputService.getMouse().x) + x;
    this.initialPoint.y =  this.initialPoint.y * j / NB.Two +  Math.min(this.origin.y, this.inputService.getMouse().y) + y;
    this.pointString = (`${this.initialPoint.x}` + ' ' + `${this.initialPoint.y}`);

    for (let k = 0 ; k < n - 1 ; k++) {
      const newPointX: number = (-Math.sin(angle * Math.PI / NB.OneHundredEighty) * i /
       NB.Two + Math.min(this.origin.x, this.inputService.getMouse().x)) + x;
      const newPointY: number = ( -Math.cos(angle * Math.PI / NB.OneHundredEighty) * j /
       NB.Two + Math.min(this.origin.y, this.inputService.getMouse().y)) + y;
      this.pointString += (' ' + `${newPointX}`);
      this.pointString += (' ' + `${newPointY}`);
      angle += NB.ThreeHundredSixty / n;
    }
  }

}
