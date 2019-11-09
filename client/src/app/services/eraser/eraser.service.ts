import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ACTIONS, EMPTY_STRING, NB, SVGinnerWidth } from 'src/constants';
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
  canvas: ElementRef;
  shapesToErase: SVGGraphicsElement[];

  constructor(private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2,
              private inputService: InputService,
              private undoRedoService: UndoRedoService,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.eraseMouseDown = false;
    this.eraserRadius = NB.Five;
    this.size = NB.OneHundred;
    this.cursor = this.renderer.createElement('rect', 'svg');
    this.shapesToErase = [];
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
    this.renderer.setAttribute(cursor, 'x', (this.inputService.getMouse().x - (this.size) / NB.Two).toString());
    this.renderer.setAttribute(cursor, 'y', (this.inputService.getMouse().y - (this.size) / NB.Two).toString());
    this.intersect();
  }

  addToPreview(shape: SVGGraphicsElement): void {
    if (!this.shapesToErase.includes(shape)) {
      const redContour = this.setAttributePreview(shape);
      this.shapesToErase.push(shape);
      this.renderer.appendChild(this.viewChildService.eraserCountour.nativeElement, redContour);
    }
  }

  setForElementWithStroke(shape: SVGGraphicsElement): SVGGraphicsElement {
    const copy = shape.cloneNode(true) as SVGGraphicsElement;
    const strokeWidth = Number(shape.getAttribute('stroke-width') as string);
    const newStrokeWidth = strokeWidth + NB.Three;
    copy.setAttribute('fill', 'none');
    copy.setAttribute('stroke', 'red');
    copy.setAttribute('stroke-opacity', '1');
    copy.setAttribute('stroke-width', newStrokeWidth.toString());
    if (shape.getAttribute('stroke-opacity') === '0') {
      copy.setAttribute('stroke-width', '5');
    }
    return copy;
  }

  setForElementWithoutStroke(shape: SVGGraphicsElement): SVGGraphicsElement {
    const rect = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(rect, 'x', (shape.getBoundingClientRect().left - SVGinnerWidth - 1).toString());
    this.renderer.setAttribute(rect, 'y', (shape.getBoundingClientRect().top - 1).toString());
    this.renderer.setAttribute(rect, 'width', (shape.getBoundingClientRect().width).toString());
    this.renderer.setAttribute(rect, 'height', (shape.getBoundingClientRect().height).toString());
    this.renderer.setAttribute(rect, 'fill', 'none');
    this.renderer.setAttribute(rect, 'stroke', 'red');
    this.renderer.setAttribute(rect, 'stroke-width', '5');
    return rect;
  }

  setAttributePreview(shape: SVGGraphicsElement): SVGGraphicsElement {
    return shape.getAttributeNames().includes('stroke') ?
      this.setForElementWithStroke(shape) :
      this.setForElementWithoutStroke(shape);
  }

  eraseShapes(): void {
    const undoRedoShapes: SVGGraphicsElement[] = [];
    for (const shape of this.shapesToErase) {
      undoRedoShapes.push(shape);
      this.renderer.removeChild(this.viewChildService.canvas.nativeElement, shape);
    }
    this.viewChildService.eraserCountour.nativeElement.innerHTML = EMPTY_STRING;
    const undoRedoAction: UndoRedoAction = {
      action: ACTIONS.removeMany,
      shapes: undoRedoShapes,
    };
    this.undoRedoService.addAction(undoRedoAction);
  }

  reset(): void {
    this.shapesToErase = [];
    this.viewChildService.eraserCountour.nativeElement.innerHTML = EMPTY_STRING;
  }

  calculateIntersection(firstShape: ClientRect, secondShape: ClientRect): boolean {
    return !(
      firstShape.left   > secondShape.right  ||
      firstShape.right  < secondShape.left   ||
      firstShape.top    > secondShape.bottom ||
      firstShape.bottom < secondShape.top
    );
  }

  intersect(): void {
    const cursorBox: ClientRect = this.cursor.getBoundingClientRect();
    const children = this.canvas.nativeElement.children as HTMLCollection;
    this.reset();

    for (let i = children.length - 1 ; i >= 0; i--) {
      const childBox: ClientRect = children[i].getBoundingClientRect();
      let isIntersection = this.calculateIntersection(childBox, cursorBox);

      for (const beneathShape of this.shapesToErase) {
        const shapeBox: ClientRect = beneathShape.getBoundingClientRect();
        if (this.calculateIntersection(shapeBox, childBox)) {
          isIntersection = false;
        }
      }

      if (isIntersection) {
        this.addToPreview(children[i] as SVGGraphicsElement);
      }
    }

  }
}
