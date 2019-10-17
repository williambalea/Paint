import { Injectable, Renderer2 } from '@angular/core';
import { RectangleService } from '../shapes/rectangle.service';
import { Shape } from '../shapes/shape';

@Injectable({
  providedIn: 'root',
})
export class SelectorService implements Shape {
  rectangle: HTMLElement;
  active: Boolean;

  constructor(private rectangleService: RectangleService,
              private renderer: Renderer2) {
                this.active = false;
              }

  onMouseDown(): any {
    this.rectangle = this.rectangleService.onMouseDown();
    this.renderer.setStyle(this.rectangle, 'fill', 'none');
    this.renderer.setStyle(this.rectangle, 'stroke-dasharray', '3');
    this.renderer.setStyle(this.rectangle, 'stroke', 'navy');
    this.renderer.setStyle(this.rectangle, 'stroke-width', '2');
    return this.rectangle;
  }
  onMouseMove(): void {
    this.rectangleService.onMouseMove();
  }
  onMouseUp(): void {
    this.rectangle = this.renderer.createElement('rect', 'svg');
  }

}
