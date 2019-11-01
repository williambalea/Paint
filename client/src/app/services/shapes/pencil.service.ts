import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, INIT_MOVE_PEN, NB } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})

export class PencilService implements Shape {
  linepath: string;
  stroke: string;
  strokeWidth: number;
  active: boolean;

  path: HTMLElement;

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
    this.strokeWidth = NB.Seven;
    this.reset();
  }

  reset(): void {
    this.stroke = EMPTY_STRING;
    this.active = false;
  }

  onMouseDown(): any {
    this.active = true;
    this.stroke = this.colorService.getFillColor();
    this.path = this.renderer.createElement('path', 'svg');
    this.renderer.setStyle(this.path, 'stroke', this.stroke.toString());
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'stroke-linejoin', 'round');
    this.renderer.setStyle(this.path, 'stroke-width', this.strokeWidth.toString());
    this.linepath = `M${this.inputService.getMouse().x} ${this.inputService.getMouse().y} ${INIT_MOVE_PEN}`;
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    return this.path;
  }

  onMouseMove(): void {
    if (this.active) {
      this.draw();
    }
  }
  onMouseUp(): void {
    this.reset();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());

  }

  draw(): void {
    this.linepath += `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y} `;
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.renderer.setStyle(this.path, 'fill', 'none');
  }
}