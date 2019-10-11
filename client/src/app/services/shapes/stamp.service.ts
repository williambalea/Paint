import { Injectable, Renderer2 } from '@angular/core';
import { svgFileLocation } from 'src/assets/stamps/svgFileLocaltion';
import { EMPTY_STRING, NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { InputService } from '../input.service';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class StampService implements Shape {
  stamps: string[];
  selectedStamp: string;
  size: number;
  position: Point;
  stamp: HTMLElement;

  constructor(private renderer: Renderer2, private inputService: InputService) {
    this.stamps = svgFileLocation;
    this.selectedStamp = EMPTY_STRING;
    this.size = NB.Thirty;
    this.position = {x: 0, y: 0};
  }

  onMouseDown(): any {
    this.stamp = this.renderer.createElement('image', 'svg');
    this.draw();
    return this.stamp;
  }

  onMouseMove(): void {
    this.position.x = this.inputService.getMouse().x - this.size / 2;
    this.position.y = this.inputService.getMouse().y - this.size / 2;
  }

  onMouseUp(): void {
    return;
  }

  selectStamp(image: string): void {
    this.selectedStamp = image;
  }

  draw(): void {
    this.renderer.setAttribute(this.stamp, 'href', this.selectedStamp.toString());
    this.renderer.setAttribute(this.stamp, 'x', this.position.x.toString());
    this.renderer.setAttribute(this.stamp, 'y', this.position.y.toString());
    this.renderer.setAttribute(this.stamp, 'width', this.size.toString());
    this.renderer.setAttribute(this.stamp, 'height', this.size.toString());
    this.renderer.setAttribute(this.stamp, 'transform',
      `rotate(${this.inputService.stampAngle.toString()} ${this.inputService.getMouse().x} ${this.inputService.getMouse().y})`);
  }

}
