import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB } from 'src/constants';
import { InputService } from '../input.service';
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

  constructor(private renderer: Renderer2, private inputService: InputService) {
    this.reset();
  }

  reset(): void {
    this.path = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.strokeWidth = NB.Zero;
    this.pathEnable = false;
  }
  onMouseDown(): void {
    this.path = this.renderer.createElement('path', 'svg');
    this.renderer.appendChild(document.getElementById('canvas'), this.path);
    this.linepath = `M${this.inputService.getMouse().x} ${this.inputService.getMouse().y} `;
    this.renderer.setAttribute(this.path, 'd', this.linepath);

    this.pathEnable = true;
    this.onMouseMove();
  }

  onMouseMove(): void {
    if (this.pathEnable) {
      this.linepath += `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y} `;
      this.renderer.setAttribute(this.path, 'd', this.linepath);
    }
  }
  onMouseUp(): void {
      this.pathEnable = false;
  }
}
