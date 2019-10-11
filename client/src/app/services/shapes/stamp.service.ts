import { Injectable, Renderer2 } from '@angular/core';
import { svgFileLocation } from 'src/assets/stamps/svgFileLocaltion';
import { EMPTY_STRING } from 'src/constants';
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
  active: boolean;
  position: Point;
  stamp: HTMLElement;

  constructor(private renderer: Renderer2, private inputService: InputService) {
    this.stamps = svgFileLocation;
    this.selectedStamp = EMPTY_STRING;
    this.size = 30;
    this.active = false;
  }

  onMouseDown(): any {
    this.active = true;
    this.stamp = this.renderer.createElement('image', 'svg');
    this.draw();
    return this.stamp;
  }

  onMouseMove(): void {
    this.position = this.inputService.getMouse();
  }

  onMouseUp(): void {
    this.active = false;
  }

  selectStamp(image: string): void {
    this.selectedStamp = image;
    console.log(image);
  }

  draw(): void {
    this.renderer.setAttribute(this.stamp, 'xlink:href', this.selectedStamp.toString());
    this.renderer.setAttribute(this.stamp, 'x', this.position.x.toString());
    this.renderer.setAttribute(this.stamp, 'y', this.position.y.toString());
    this.renderer.setAttribute(this.stamp, 'width', this.size.toString());
    this.renderer.setAttribute(this.stamp, 'height', this.size.toString());
  }
}
