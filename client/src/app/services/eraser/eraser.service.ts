import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ACTIONS, SVGinnerWidth } from 'src/constants';
import { InputService } from '../input.service';
import { UndoRedoService } from '../undo-redo.service';
import { UndoRedoAction } from '../undoRedoAction';
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
  mouseMove: boolean;

  constructor(private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2,
              private inputService: InputService,
              private undoRedoService: UndoRedoService,
              ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.eraseMouseDown = false;
    this.eraserRadius = 5;
    this.size = 100;
    this.cursor = this.renderer.createElement('rect', 'svg');
    this.divider = 2;
    this.preview = [];
    this.mouseMove = false;
  }

  initializeViewChildren(): void {
    this.drawingBoard = this.viewChildService.drawingBoard;
    this.canvas = this.viewChildService.canvas;
  }

  createEraser(x: number, y: number): void {
    this.initializeViewChildren();
    this.setAttributeCursor(x, y);
    this.renderer.appendChild(this.drawingBoard.nativeElement, this.cursor);
  }

  setAttributeCursor(x: number, y: number): void {
    this.renderer.setAttribute(this.cursor, 'fill', 'white');
    this.renderer.setAttribute(this.cursor, 'stroke', 'black');
    this.renderer.setAttribute(this.cursor, 'stroke-width', '1');
    this.renderer.setAttribute(this.cursor, 'width', this.size.toString());
    this.renderer.setAttribute(this.cursor, 'height', this.size.toString());
    this.renderer.setAttribute(this.cursor, 'x', x.toString());
    this.renderer.setAttribute(this.cursor, 'y', y.toString());
  }

  updatePosition(cursor: SVGGraphicsElement): void {
    this.createEraser(1, 2);
    this.renderer.setAttribute(cursor, 'x', (this.inputService.getMouse().x - (this.size) / this.divider).toString());
    this.renderer.setAttribute(cursor, 'y', (this.inputService.getMouse().y - (this.size) / this.divider).toString());
    this.intersect();

  }

  addToPreview(shape: SVGGraphicsElement): void {
    if (!this.preview.includes(shape)) {
      const redContour = this.setAttributePreview(shape);
      this.preview.push(redContour);
      this.renderer.appendChild(this.viewChildService.eraserCountour.nativeElement, redContour);
    }
  }

  setAttributePreview(shape: SVGGraphicsElement): SVGGraphicsElement {
    if (shape.getAttributeNames().includes('stroke')) {
      const copy = shape.cloneNode(true) as SVGGraphicsElement;
      copy.setAttribute('fill', 'none');
      copy.setAttribute('stroke', 'red');
      copy.setAttribute('stroke-opacity', '1');
      console.log(shape.getAttribute('stroke-opacity'));
      console.log(shape.getAttribute('stroke-opacity') === '0');
      if (shape.getAttribute('stroke-opacity') === '0') {
        console.log('opacité 0');
        copy.setAttribute('stroke-width', '1');
      }
      return copy;
    } else {
      const rect = this.renderer.createElement('rect', 'svg');
      this.renderer.setAttribute(rect, 'x', (shape.getBoundingClientRect().left - SVGinnerWidth - 1).toString());
      this.renderer.setAttribute(rect, 'y', (shape.getBoundingClientRect().top - 1).toString());
      this.renderer.setAttribute(rect, 'width', (shape.getBoundingClientRect().width).toString());
      this.renderer.setAttribute(rect, 'height', (shape.getBoundingClientRect().height).toString());
      this.renderer.setAttribute(rect, 'fill', 'none');
      this.renderer.setAttribute(rect, 'stroke', 'red');
      this.renderer.setAttribute(rect, 'stroke-width', '1');
      return rect;
    }
  }

  clear(): void {
    for ( const i of this.preview) {
      this.renderer.removeChild(this.viewChildService.eraserCountour, i);
    }
  }
  clearOnce(): void {
      this.renderer.removeChild(this.viewChildService.eraserCountour, this.preview[0]);
  }

  validateErase(child: SVGGraphicsElement): void {
    const undoRedoAction: UndoRedoAction = {
      action: ACTIONS.remove,
      shape: child,
    };
    if (this.eraseMouseDown && this.mouseMove) {
      this.undoRedoService.addAction(undoRedoAction);
      this.renderer.removeChild(this.drawingBoard.nativeElement, child);
    } else if (this.eraseMouseDown && !this.mouseMove) {
      this.undoRedoService.addAction(undoRedoAction);
      this.renderer.removeChild(this.drawingBoard.nativeElement, child);
      this.eraseMouseDown = false;
    }
  }

  validateIntersection(isIntersection: boolean, child: SVGGraphicsElement): void {
    if (isIntersection) {
      this.addToPreview(child);
      this.validateErase(child);
    }
  }

  intersect(): void {
    const cursorBox = this.cursor.getBoundingClientRect();
    this.clear();
    this.preview = [];
    for ( let i: number = this.canvas.nativeElement.children.length  ; i-- ; i > 0) {
       const childBox = this.canvas.nativeElement.children[i].getBoundingClientRect();
       let isIntersection: boolean;
       isIntersection = (!(childBox.left > cursorBox.right || childBox.right < cursorBox.left
          || childBox.top > cursorBox.bottom || childBox.bottom < cursorBox.top));
       this.validateIntersection(isIntersection, this.canvas.nativeElement.children[i]);
    }
  }
}
