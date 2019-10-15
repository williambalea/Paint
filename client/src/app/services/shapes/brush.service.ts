import { Injectable, Renderer2 } from '@angular/core';
import { COLORS, EMPTY_STRING, INIT_MOVE_BRUSH, NB } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class BrushService implements Shape {
  linepath: string;
  brushStrokeWidth: number;
  fillColor: string;
  filter: string;
  stroke: string;
  active: boolean;
  path: HTMLElement;

  constructor(private renderer: Renderer2, private colorService: ColorService, private inputService: InputService) {
    this.brushStrokeWidth = NB.Seven;
    this.filter = `url(#smooth)`;
    this.reset(); }

  onMouseDown(): any {
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
    this.path = this.renderer.createElement('path', 'svg');
    this.linepath += `M${this.inputService.getMouse().x} ${this.inputService.getMouse().y} ${INIT_MOVE_BRUSH}`;
    this.draw();
    this.active = true;
    return this.path;
  }
  onMouseMove(): void {
    if (this.active) {
      this.linepath += `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y} `;
      this.draw();
    }
  }
  onMouseUp(): void {
    this.reset();
  }

  reset() {
    this.linepath = EMPTY_STRING;
    this.stroke = EMPTY_STRING;
    this.fillColor = COLORS.blackRGBA;
    this.active = false;
  }
  changePrimaryColor(color: string): void {
    this.fillColor = color;
  }

  changeSecondaryColor(color: string): void {
      this.stroke = color;
  }

  changeFilter(newFilter: string): void {
    this.filter = `url(#${newFilter})`;
  }

  draw() {
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'stroke-linejoin', 'round');
    this.renderer.setStyle(this.path, 'stroke', this.colorService.getFillColor());
    this.renderer.setStyle(this.path, 'stroke-width', this.brushStrokeWidth.toString());
    this.renderer.setStyle(this.path, 'fill', 'none');
    this.renderer.setStyle(this.path, 'filter', this.filter.toString());
  }
}