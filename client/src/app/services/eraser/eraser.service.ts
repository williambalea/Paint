import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { InputService } from '../input.service';

@Injectable({
  providedIn: 'root',
})
export class EraserService {

  eraserRadius: number;
  eraseMouseDown: boolean;
  drawingBoard: ElementRef;
  cursor: SVGGraphicsElement;
  size: number;
  divider: number;
  canvas: ElementRef;

  constructor(private renderer: Renderer2, private inputService: InputService ) {
    this.eraseMouseDown = false;
    this.eraserRadius = 5;
    this.size = 100;
    this.cursor = this.renderer.createElement('rect', 'svg');
    this.divider = 2;
  }

  createEraser(x: number, y: number): void {
    this.renderer.setAttribute(this.cursor, 'fill', 'white');
    this.renderer.setAttribute(this.cursor, 'stroke', 'black');
    this.renderer.setAttribute(this.cursor, 'stroke-width', '1');
    this.renderer.setAttribute(this.cursor, 'width', this.size.toString());
    this.renderer.setAttribute(this.cursor, 'height', this.size.toString());
    this.renderer.setAttribute(this.cursor, 'x', x.toString());
    this.renderer.setAttribute(this.cursor, 'y', y.toString());
    this.renderer.appendChild(this.drawingBoard.nativeElement, this.cursor);
  }
  updatePosition(cursor: SVGGraphicsElement): void {
    this.createEraser(1, 2);
    this.renderer.setAttribute(cursor, 'x', (this.inputService.getMouse().x - (this.size) / this.divider).toString());
    this.renderer.setAttribute(cursor, 'y', (this.inputService.getMouse().y - (this.size) / this.divider).toString());
    this.intersect();
  }

  // erase(target: EventTarget, element: HTMLElement): void {
  //   if (this.eraseMouseDown) {
  //     if (target !== element) {
  //       this.renderer.removeChild(element, target);
  //     }
  //   }
  // }

  intersect(): void {
    const cursorBox = this.cursor.getBoundingClientRect();
    for (const child of this.canvas.nativeElement.children) {
        const childBox = child.getBoundingClientRect();
        let isIntersection: boolean;
        isIntersection = (!(childBox.left > cursorBox.right || childBox.right < cursorBox.left
          || childBox.top > cursorBox.bottom || childBox.bottom < cursorBox.top));
        if (isIntersection && this.eraseMouseDown) {
            this.renderer.removeChild(this.drawingBoard.nativeElement, child);
          }

    }}

}
