import { Injectable, Renderer2 } from '@angular/core';
import { Shape } from './shape';
import { NB, EMPTY_STRING } from 'src/constants';
import { Point } from '../../../../../common/interface/point';

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

  constructor(private renderer: Renderer2,
              //private inputService: InputService
              )
              {
                this.strokeWidth = NB.Seven;
                this.fill = EMPTY_STRING;
                this.stroke = EMPTY_STRING;
                this.pointString = EMPTY_STRING;
                this.points = [{x:100,y:10} ,{x:40,y:198 } , {x:190,y:78 },{x:10,y:78},{x:160,y:198}];
              }

  onMouseDown() : any  {
    this.polygon = this.renderer.createElement('polygon', 'svg');
    this.draw();
    return this.polygon;
  }
  onMouseMove(): void {
    console.log('onMouseMove');

  }
  onMouseUp(): void {
    console.log('onMouseUp');
  }

  draw() {
   
    for (let i in this.points){
    console.log(`${this.points[i].x}`);
    this.pointString += (`${this.points[i].x}` +' ' + `${this.points[i].y}` +' ');
  
    }
    if (typeof this.pointString === "string"){
      console.log('test');
      console.log(this.pointString);
    }
    this.renderer.setAttribute(this.polygon, 'points',this.pointString);
    this.renderer.setStyle(this.polygon, 'fill', this.fill);
    this.renderer.setStyle(this.polygon, 'stroke', this.stroke);
    this.renderer.setStyle(this.polygon, 'stroke-width', this.strokeWidth.toString());
  }

}
