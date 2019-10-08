import { Injectable, Renderer2 } from '@angular/core';
import { Shape } from './shape';
import { NB, EMPTY_STRING } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { InputService } from '../input.service';


//import { InputService } from '../input.service';

@Injectable({
  providedIn: 'root'
})
export class PolygonService implements Shape{

  polygon: HTMLElement;
  fill: string;
  stroke: string;
  strokeWidth: number;
  points : Point[];
  pointString: string;
  sides : number;
  origin: Point;
  p1  :Point;
  p2 :Point;
  p0 : Point;
  active: boolean;
  mouse: Point;
  width: number;
  height: number;
  p3: any;
  p4: any;
  p5: any;
  p6: any;
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
                this.p3 = {x:0,y:0};
                this.p1 = {x:0,y:0};
                this.p2 = {x:0,y:0};
                this.p0 = {x:0,y:-1};
                this.p4 = {x:0,y:0};
                this.p5 = {x:0,y:0};
                this.p6 = {x:0,y:0};
              }

  onMouseDown() : any  {
    this.active = true;
    this.points = [{x:this.inputService.getMouse().x,y:this.inputService.getMouse().y}];
    this.polygon = this.renderer.createElement('polygon', 'svg');
    this.setOrigin() ;
    console.log('origine1', this.origin.x);
  // this.generateVertices();
 
  
    return this.polygon;
  }
  setOrigin() {
    this.origin = { x : this.inputService.getMouse().x, y: this.inputService.getMouse().y};
    this.points.push(this.origin);
  }
  onMouseMove(): void {
   
    if (this.active) {
  
      //this.inputService.getMouse().x-this.origin.x;
      //this.generateVertices(100,100);
      this.generateVertices(Math.abs(this.inputService.getMouse().x-this.origin.x),Math.abs(this.inputService.getMouse().y-this.origin.y ));
      this.draw();
    console.log('onMouseMove', this.inputService.getMouse().x-this.origin.x);
  
  
    }

  }
  onMouseUp(): void {
    console.log('onMouseUp');
 
    this.points = [];
    this.p6 = {x:0,y:0};
    this.p5 = {x:0,y:0};
    this.p4 = {x:0,y:0};
    this.p3 = {x:0,y:0};
    this.p1 = {x:0,y:0};
    this.p2 = {x:0,y:0};
    this.p0 = {x:0,y:-1};
    this.pointString= EMPTY_STRING;
    this.active = false;
  }

  generateVertices(i : number, j : number) : void {
    
  
    

    this.p1.x = (-Math.sin(51.42 * Math.PI /180) *i+ this.origin.x);
    this.p1.y = ( -Math.cos(51.42 * Math.PI /180)*j+ this.origin.y); 

    this.p2.x = (-Math.sin(102.84 * Math.PI /180)*i+ this.origin.x);
    this.p2.y = (- Math.cos(102.84* Math.PI /180)*j+ this.origin.y); 

    this.p3.x = (-Math.sin(154.2 * Math.PI /180)*i+ this.origin.x);
    this.p3.y = (- Math.cos(154.2 * Math.PI /180)*j+ this.origin.y); 

    this.p4.x = (-Math.sin(205.6 * Math.PI /180)*i+ this.origin.x);
    this.p4.y = (- Math.cos(205.6 * Math.PI /180)*j+ this.origin.y); 

    this.p5.x = (-Math.sin(257.1 * Math.PI /180)*i+ this.origin.x);
    this.p5.y = (- Math.cos(257.1 * Math.PI /180)*j+ this.origin.y); 

    this.p6.x = (-Math.sin(308.5 * Math.PI /180)*i+ this.origin.x);
    this.p6.y = (- Math.cos(308.5 * Math.PI /180)*j+ this.origin.y); 
   
    this.p0.x =   this.p0.x +(this.origin.x);
    this.p0.y =  this.p0.y*j+(this.origin.y); 
    
  }

  draw() {
   
    
    
    this.pointString = (`${this.p0.x}` +' ' + `${this.p0.y}`+' '+`${this.p1.x}` +' ' + `${this.p1.y}`+' '+`${this.p2.x}` +' ' + `${this.p2.y}`+' '+`${this.p3.x}` +' ' + `${this.p3.y}` +' '+`${this.p4.x}` +' ' + `${this.p4.y}` +' '+`${this.p5.x}` +' ' + `${this.p5.y}` +' '+`${this.p6.x}` +' ' + `${this.p6.y}`    );
    
    this.renderer.setAttribute(this.polygon, 'points',this.pointString);
    this.renderer.setStyle(this.polygon, 'fill', this.fill);
    this.renderer.setStyle(this.polygon, 'stroke', this.stroke);
    this.renderer.setStyle(this.polygon, 'stroke-width', this.strokeWidth.toString());
    this.points = [];
    this.p1 = {x:0,y:0};
    this.p2 = {x:0,y:0};
    this.p0 = {x:0,y:-1};
    this.pointString= EMPTY_STRING;
    
  }

}
