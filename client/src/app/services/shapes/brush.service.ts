import { Injectable, Renderer2 } from '@angular/core';
import { Shape } from './shape';
import {  BRUSH, EMPTY_STRING, NB, COLORS, INIT_MOVE_BRUSH } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';


@Injectable({
  providedIn: 'root'
})
export class BrushService implements Shape {
  linepath : string;
  brushStrokeWidth: number;
  fillColor: string;
  filter: string;
  brushStyle: BRUSH;
  stroke: string;

  active: boolean;

  path: HTMLElement;

  constructor(private renderer: Renderer2, private colorService : ColorService, private inputService : InputService) { this.reset();}


  onMouseDown(event : MouseEvent): void {
   
    this.filter = `url(#${this.brushStyle})`;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
   
    this.path = this.renderer.createElement('path', 'svg');
    this.renderer.appendChild(document.getElementById('canvas'), this.path);
    
    this.linepath = `M${this.inputService.getMouse().x} ${this.inputService.getMouse().y} ${INIT_MOVE_BRUSH}`;
    this.renderer.setAttribute(this.path, 'd',this.linepath);
    this.active = true;
  }
  onMouseMove(event : MouseEvent): void {
    if (this.active) {
     
      this.linepath += `L${event.offsetX} ${event.offsetY} `;
      this.renderer.setAttribute(this.path, 'd',this.linepath);

      this.renderer.setStyle(this.path, 'stroke', 'black');
      this.renderer.setStyle(this.path, 'stroke-width', '7'); 
      this.renderer.setStyle(this.path, 'fill', 'none'); 
      this.renderer.setStyle(this.path, 'filter', this.filter.toString());
    }
  }
  onMouseUp(): void {
    this.reset();
  }

  reset() {
    this.linepath = EMPTY_STRING;
    this.filter = EMPTY_STRING;
    this.brushStrokeWidth = NB.Zero;
    this.stroke = EMPTY_STRING;
    this.fillColor = COLORS.blackRGBA;
    this.brushStyle = BRUSH.smooth;

    this.active = false;
  }
  changePrimaryColor(color: string): void {
    this.fillColor = color;
  }

  changeSecondaryColor(color: string): void {
      this.stroke = color;
  }
}
