import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { EMPTY_STRING, INIT_MOVE_PEN, NB } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class PenService implements Shape {
  renderer: Renderer2;

  linepath: string;
  stroke: string;
  strokeWidth: number;
  maxStrokeWidth: number;
  minStrokeWidth: number;
  active: boolean;
  path: HTMLElement;
  private interval: any;
  private mouseSpeed: number;
  lastMouseMoveTime: number;

  canvas: ElementRef;

  constructor(private rendererFactory: RendererFactory2,
              private inputService: InputService,
              private viewChildService: ViewChildService,
              private colorService: ColorService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.maxStrokeWidth = NB.Twenty;
    this.minStrokeWidth = NB.Ten;
    this.mouseSpeed = NB.Zero;
    this.lastMouseMoveTime = NB.Zero;
    this.reset();
  }

  getSpeed(event: MouseEvent): void {
    this.mouseSpeed = (Math.sqrt(Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2))
    / (event.timeStamp - this.lastMouseMoveTime));
    this.lastMouseMoveTime = event.timeStamp;
  }

  reset(): void {
    this.stroke = EMPTY_STRING;
    this.linepath = EMPTY_STRING;
    this.active = false;
  }

  createPenGroup(): void {
    const penWrapper = this.renderer.createElement('g', 'svg');
    this.renderer.appendChild(this.canvas.nativeElement, penWrapper);
    this.interval = setInterval( () => {
      this.createPath();
      this.renderer.appendChild(penWrapper, this.path);
    }, 10);
  }

  onMouseDown(): any {
    this.canvas = this.viewChildService.canvas;
    this.active = true;
    this.createPenGroup();
    return this.path;
  }

  createPath(): void {
      this.stroke = this.colorService.getFillColor();
      this.path = this.renderer.createElement('path', 'svg');
      this.setStylePath();
      this.linepath = `M${this.inputService.getMouse().x} ${this.inputService.getMouse().y} ${INIT_MOVE_PEN}`;
      this.renderer.setAttribute(this.path, 'd', this.linepath);
      this.renderer.setProperty(this.path, 'id', 'pen');
  }

  setStylePath(): void {
    this.renderer.setStyle(this.path, 'stroke', this.stroke.toString());
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'stroke-linejoin', 'round');
  }

  onMouseMove(): void {
    if (this.active) {
      this.strokeWidth = (-(this.maxStrokeWidth - this.minStrokeWidth) / 2) * this.mouseSpeed + this.maxStrokeWidth;
      this.validateStrokeWidthMin();
      this.validateStrokeWidthMax();
      this.renderer.setStyle(this.path, 'stroke-width', this.strokeWidth.toString());
      this.draw();
    }
  }

  validateStrokeWidthMin(): void {
    if (this.strokeWidth < this.minStrokeWidth) {
      this.strokeWidth = this.minStrokeWidth;
    }
  }

  validateStrokeWidthMax(): void {
    if (this.strokeWidth > this.maxStrokeWidth) {
      this.strokeWidth = this.maxStrokeWidth;
    }
  }

  onMouseUp(): void {
    this.reset();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
    clearInterval(this.interval);
  }

  draw(): void {
    this.linepath += `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y} `;
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.renderer.setStyle(this.path, 'fill', 'blue');
  }
}
