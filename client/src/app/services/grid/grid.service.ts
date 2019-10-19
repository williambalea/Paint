import { Injectable, Renderer2 } from '@angular/core';
import { NB, SVGinnerWidth } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  width: number;
  elementG: HTMLElement;
  height: number;
  gridSize: number;
  opacity: number;

  constructor(private renderer: Renderer2) {
    this.width = window.innerWidth - SVGinnerWidth;
    this.height = window.innerHeight;
    this.gridSize = NB.OneHundred;
    this.opacity = NB.Fifty;
    this.elementG = this.renderer.createElement('g', 'svg');
  }

  setGridSize(data: number): void {
    this.gridSize = data;
  }

  draw(value: number): void {
    this.elementG = this.renderer.createElement('g', 'svg');
    this.gridSize = value;
    for (let i = 0; i < this.width; i++) {
      const line: any = this.renderer.createElement('line', 'svg');
      this.renderer.setAttribute(line, 'x1', (i * this.gridSize).toString());
      this.renderer.setAttribute(line, 'x2', (i * this.gridSize).toString());
      this.renderer.setAttribute(line, 'y1', NB.Zero.toString());
      this.renderer.setAttribute(line, 'y2', this.height.toString());
      this.renderer.setStyle(line, 'stroke', 'red');
      this.renderer.setStyle(line, 'stroke-opacity', this.opacity / NB.OneHundred);
      this.renderer.appendChild(this.elementG, line);
    }
    for (let i = 0; i < this.height; i++) {
      const line: any = this.renderer.createElement('line', 'svg');
      this.renderer.setAttribute(line, 'x1', NB.Zero.toString());
      this.renderer.setAttribute(line, 'x2', this.width.toString());
      this.renderer.setAttribute(line, 'y1', (i * this.gridSize).toString());
      this.renderer.setAttribute(line, 'y2', (i * this.gridSize).toString());
      this.renderer.setStyle(line, 'stroke', 'red');
      this.renderer.setStyle(line, 'stroke-opacity', this.opacity / NB.OneHundred);
      this.renderer.appendChild(this.elementG, line);
    }
  }
}
