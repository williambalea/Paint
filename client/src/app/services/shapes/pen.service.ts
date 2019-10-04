import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB } from 'src/constants';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class PenService implements Shape {
  linepath: string;
  path: string;
  stroke: string;
  strokeWidth: number;
  pathEnable: boolean;

  constructor(private renderer: Renderer2) {
    this.reset();
  }

  reset(): void {
    this.path = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.strokeWidth = NB.Zero;
    this.pathEnable = false;
  }
  // onMouseDown(event: MouseEvent): void{
  //   this.path = this.renderer.createElement('path', 'svg');
  //   this.renderer.appendChild(document.getElementById('canvas'), this.path);
  //   this.linepath = `M${event.offsetX} ${event.offsetY} `;
  //   this.renderer.setAttribute(this.path, 'd', this.linepath);

  //   this.pathEnable = true;
  //   this.onMouseMove(event);
  // }
  // onMouseMove(event: MouseEvent): void {
  //   if (this.pathEnable) {
  //     this.linepath += `L${event.offsetX} ${event.offsetY} `;
  //     this.renderer.setAttribute(this.path, 'd', this.linepath);
  //   }
  // }
  onMouseUp(): void {
      this.pathEnable = false;
  }
}
