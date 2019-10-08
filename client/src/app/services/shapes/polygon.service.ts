import { Injectable, Renderer2 } from '@angular/core';
import { Shape } from './shape';
import { NB, EMPTY_STRING, RECTANGLE_TYPE } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { InputService } from '../input.service';
import { ColorService } from '../color/color.service';

@Injectable({
  providedIn: 'root'
})
export class PolygonService implements Shape{
 
  test : boolean 
  polygon: HTMLElement;
  fill: string;
  stroke: string;
  strokeWidth: number;
  pointString: string;
  sides : number;
  origin: Point;
  p0 : Point;
  active: boolean;
  sideNumber : number;
  polygonType: string;
  strokeEnable: boolean;
  fillEnable: boolean;
  

 

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService
              )
              {
                this.sides = NB.Three;
                this.strokeWidth = NB.Seven;
                this.fill = EMPTY_STRING;
                this.stroke = EMPTY_STRING;
                this.pointString = EMPTY_STRING;
                this.active = false;
                this.p0 = {x:0,y:-1};
                this.test = true;
                this.sideNumber = 3;
                this.polygonType = RECTANGLE_TYPE.borderedAndFilled;
                this.fillEnable = true;
                this.strokeEnable = true;
            
              }

  assignPolygonType() {
    switch (this.polygonType) {
      case RECTANGLE_TYPE.bordered:
        this.assignBorderedPolygon();
        break;
      case RECTANGLE_TYPE.filled:
        this.assignFilledPolygon();
        break;
      case RECTANGLE_TYPE.borderedAndFilled:
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

  setRectangleType(): void {
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

  setSidesNumber (sides : number){
    this.sideNumber = sides;
  }

  onMouseDown() : any  {
    this.active = true;
    this.fill = this.colorService.getFillColor();
    this.stroke = this.colorService.getStrokeColor();
    this.polygon = this.renderer.createElement('polygon', 'svg');
    this.setOrigin() ;
    this.setRectangleType();
    return this.polygon;
  }
  setOrigin() {
    this.origin = { x : this.inputService.getMouse().x, y: this.inputService.getMouse().y};
  }

  onMouseMove(): void {
    if (this.active) {
      this.generateVertices(Math.abs(this.inputService.getMouse().x-this.origin.x),Math.abs(this.inputService.getMouse().y-this.origin.y ), this.sideNumber,Math.abs(this.inputService.getMouse().x-this.origin.x)/2,Math.abs(this.inputService.getMouse().y-this.origin.y )/2 );
      this.draw();
    }

  }
  onMouseUp(): void {
    this.p0 = {x:0,y:-1};
    this.pointString= EMPTY_STRING;
    this.active = false;
    this.test = true;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

  generateVertices(i : number, j : number, n : number, x:number , y :number ) : void {
   
   
    let angle : number = 360/n;
   
    this.p0.x =   this.p0.x +(this.origin.x)+x;
    this.p0.y =  this.p0.y*j+(this.origin.y)+y; 
    this.pointString = (`${this.p0.x}` +' ' + `${this.p0.y}`);

    for (let k : number = 0 ; k<n-1 ; k++){
      let newPointX : number = (-Math.sin(angle * Math.PI /180) *i+ this.origin.x)+x;
      let newPointY : number = ( -Math.cos(angle * Math.PI /180)*j+ this.origin.y)+y; 
 
      this.pointString += (' ' + `${newPointX }`);
      this.pointString += (' ' + `${newPointY}`);
    
      angle+= 360/n;
      
      if (k === n-2) {
        {this.test = false;}
      }
    }
  }

  draw() {
    this.renderer.setAttribute(this.polygon, 'points',this.pointString);
    this.renderer.setStyle(this.polygon, 'fill', this.fill);
    this.renderer.setStyle(this.polygon, 'stroke', this.stroke);
    this.renderer.setStyle(this.polygon, 'stroke-width', this.strokeWidth.toString());
    this.p0 = {x:0,y:-1};
  }

}
