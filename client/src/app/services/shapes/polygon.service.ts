import { Injectable, Renderer2 } from '@angular/core';
import { Shape } from './shape';
import { NB, EMPTY_STRING } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { InputService } from '../input.service';

@Injectable({
  providedIn: 'root'
})
export class PolygonService implements Shape{
  test : boolean 
  polygon: HTMLElement;
  fill: string;
  stroke: string;
  strokeWidth: number;
  points : Point[];
  pointString: string;
  sides : number;
  origin: Point;
  p0 : Point;
  active: boolean;
  sideNumber : number;

 

  constructor(private renderer: Renderer2,
              private inputService: InputService
              )
              {
                this.sides = NB.Three;
                this.strokeWidth = NB.Seven;
                this.fill = EMPTY_STRING;
                this.stroke = EMPTY_STRING;
                this.pointString = EMPTY_STRING;
                this.points = [];
                this.active = false;
                this.p0 = {x:0,y:-1};
                this.test = true;
                this.sideNumber = 3;
              }

  setSidesNumber (sides : number){
    this.sideNumber = sides;
  }

  onMouseDown() : any  {
    this.active = true;
    this.points = [{x:this.inputService.getMouse().x,y:this.inputService.getMouse().y}];
    this.polygon = this.renderer.createElement('polygon', 'svg');
    this.setOrigin() ;
    return this.polygon;
  }
  setOrigin() {
    this.origin = { x : this.inputService.getMouse().x, y: this.inputService.getMouse().y};
    this.points.push(this.origin);
  }

  onMouseMove(): void {
    if (this.active) {
      this.generateVertices(Math.abs(this.inputService.getMouse().x-this.origin.x),Math.abs(this.inputService.getMouse().y-this.origin.y ), this.sideNumber );
      this.draw();
    }

  }
  onMouseUp(): void {
    this.p0 = {x:0,y:-1};
    this.pointString= EMPTY_STRING;
    this.active = false;
    this.test = true;
  }

  generateVertices(i : number, j : number, n : number ) : void {
   
   
    let angle : number = 360/n;
   
    this.p0.x =   this.p0.x +(this.origin.x);
    this.p0.y =  this.p0.y*j+(this.origin.y); 
    this.pointString = (`${this.p0.x}` +' ' + `${this.p0.y}`);

    for (let k : number = 0 ; k<n-1 ; k++){
      let newPointX : number = (-Math.sin(angle * Math.PI /180) *i+ this.origin.x);
      let newPointY : number = ( -Math.cos(angle * Math.PI /180)*j+ this.origin.y); 
 
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
