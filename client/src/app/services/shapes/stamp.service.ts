import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { svgFileDataBase64, svgFileLocation } from 'src/assets/stamps/svgFileLocation';
import { EMPTY_STRING, NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class StampService implements Shape {
  renderer: Renderer2;

  stamps: string[];
  selectedStamp: string;
  size: number;
  position: Point;
  stamp: HTMLElement;
  selectStampIndex: number;

  constructor(private rendererFactory: RendererFactory2,
              private viewChildService: ViewChildService,
              private inputService: InputService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.stamps = svgFileLocation;
    this.selectedStamp = EMPTY_STRING;
    this.size = NB.Thirty;
    this.position = {x: 0, y: 0};
  }

  onMouseDown(): any {
    if (this.selectStampIndex !== undefined) {
      this.stamp = this.renderer.createElement('image', 'svg');
      this.draw();
      this.renderer.appendChild(this.viewChildService.canvas.nativeElement, this.stamp);
      return this.stamp;
    }
  }

  onMouseMove(): void {
    this.position.x = this.inputService.getMouse().x - this.size / NB.Two;
    this.position.y = this.inputService.getMouse().y - this.size / NB.Two;
  }

  onMouseUp(): void {
    return;
  }

  selectStamp(image: string, i: number): void {
    this.selectedStamp = image;
    this.selectStampIndex = i;
  }

  draw(): void {
    this.renderer.setAttribute(this.stamp, 'href', `data:image/svg+xml;base64,${svgFileDataBase64[this.selectStampIndex]}`);
    this.renderer.setAttribute(this.stamp, 'x', this.position.x.toString());
    this.renderer.setAttribute(this.stamp, 'y', this.position.y.toString());
    this.renderer.setAttribute(this.stamp, 'width', this.size.toString());
    this.renderer.setAttribute(this.stamp, 'height', this.size.toString());
    this.renderer.setAttribute(this.stamp, 'transform',
      `rotate(${this.inputService.stampAngle.toString()} ${this.inputService.getMouse().x} ${this.inputService.getMouse().y})`);
  }

}
