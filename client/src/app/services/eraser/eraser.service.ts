import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';

@Injectable({
  providedIn: 'root',
})
export class EraserService {
  renderer: Renderer2;

  eraserRadius: number;
  eraseMouseDown: boolean;
  drawingBoard: ElementRef;
  cursor: SVGGraphicsElement;
  size: number;
  divider: number;
  canvas: ElementRef;
  preview: SVGGraphicsElement[];
  g: SVGGraphicsElement;

  constructor(private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2,
              private inputService: InputService ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.eraseMouseDown = false;
    this.eraserRadius = 5;
    this.size = 100;
    this.cursor = this.renderer.createElement('rect', 'svg');
    this.divider = 2;
    this.preview = [];
  }

  initializeViewChildren(): void {
    this.drawingBoard = this.viewChildService.drawingBoard;
    this.canvas = this.viewChildService.canvas;
    this.g = this.renderer.createElement('g', 'svg');
    this.renderer.appendChild(this.drawingBoard.nativeElement, this.g);
  }

  createEraser(x: number, y: number): void {
    this.initializeViewChildren();

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
  addToPreview(shape : SVGGraphicsElement) : void {
    if (!this.preview.includes(shape)){
      
      const redContour = this.renderer.createElement('rect','svg');
      this.renderer.setAttribute(redContour,'x', (shape.getBBox().x).toString());
      this.renderer.setAttribute(redContour,'y', (shape.getBBox().y).toString());
      this.renderer.setAttribute(redContour,'width', (shape.getBBox().width).toString());
      this.renderer.setAttribute(redContour,'height', (shape.getBBox().height).toString());
      this.renderer.setAttribute(redContour,'fill', 'none');
      this.renderer.setAttribute(redContour,'stroke', 'red');
      this.renderer.setAttribute(redContour,'stroke-width', '1');
      this.preview.push(redContour);
      this.renderer.appendChild(this.g,redContour);
    }
  }

  clear() : void { 
    for ( const i of this.preview){
      this.renderer.removeChild(this.g, i);
    }
  }
 

  intersect(): void {
    const cursorBox = this.cursor.getBoundingClientRect();
    this.clear();
    this.preview = [];
    for (const child of this.canvas.nativeElement.children) {
        const childBox = child.getBoundingClientRect();
        let isIntersection: boolean;
        isIntersection = (!(childBox.left > cursorBox.right || childBox.right < cursorBox.left
          || childBox.top > cursorBox.bottom || childBox.bottom < cursorBox.top));
        if (isIntersection){
          this.addToPreview(child);
          
         if(this.eraseMouseDown) {
            this.renderer.removeChild(this.drawingBoard.nativeElement, child);
          }
        }

    }
    console.log('preview', this.preview);
  }
    

}
