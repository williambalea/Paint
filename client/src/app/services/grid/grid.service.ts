import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NB, SVGinnerWidth } from 'src/constants';
import { ViewChildService } from '../view-child.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  width: number;
  elementG: HTMLElement;
  height: number;
  gridSize: number;
  opacity: number;
  renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2,
              private viewChildService: ViewChildService) {
    this.width = window.innerWidth - SVGinnerWidth;
    this.height = window.innerHeight;
    this.gridSize = NB.OneHundred;
    this.opacity = NB.Fifty;
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.elementG = this.renderer.createElement('g', 'svg');
  }

  hideGrid(): void {
    this.renderer.removeChild(this.viewChildService.drawingBoard.nativeElement, this.elementG);
  }

  showGrid(): void {
    this.renderer.removeChild(this.viewChildService.drawingBoard.nativeElement, this.elementG);
    this.draw(this.gridSize);
    this.renderer.appendChild(this.viewChildService.drawingBoard.nativeElement, this.elementG);
  }

  setNextGridSize(): void {
    const restOfDivision: number = this.gridSize % 5;
    if (restOfDivision !== 0) {
      this.gridSize += 5 - restOfDivision;
    } else {
      this.gridSize += 5;
    }
    if (this.gridSize > 200 ) {
      this.gridSize = 200;
    }
  }

  setLastGridSize(): void {
    const restOfDivision: number = this.gridSize % 5;
    if (restOfDivision !== 0) {
      this.gridSize -= restOfDivision;
    } else {
      this.gridSize -= 5;
    }
    if (this.gridSize < 40 ) {
      this.gridSize = 40;
    }
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
      this.renderer.setAttribute(line, 'stroke', 'red');
      this.renderer.setAttribute(line, 'stroke-opacity', (this.opacity / NB.OneHundred).toString());
      this.renderer.appendChild(this.elementG, line);
    }
    for (let i = 0; i < this.height; i++) {
      const line: any = this.renderer.createElement('line', 'svg');
      this.renderer.setAttribute(line, 'x1', NB.Zero.toString());
      this.renderer.setAttribute(line, 'x2', this.width.toString());
      this.renderer.setAttribute(line, 'y1', (i * this.gridSize).toString());
      this.renderer.setAttribute(line, 'y2', (i * this.gridSize).toString());
      this.renderer.setAttribute(line, 'stroke', 'red');
      this.renderer.setAttribute(line, 'stroke-opacity', (this.opacity / NB.OneHundred).toString());
      this.renderer.appendChild(this.elementG, line);
    }
  }
}
