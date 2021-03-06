import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NB, ACTIONS, EMPTY_STRING } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { FileParametersServiceService } from '../file-parameters-service.service';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { SelectorService } from '../selector/selector.service';
import { ViewChildService } from '../view-child.service';
import { UndoRedoService } from '../undo-redo.service';
import { UndoRedoAction } from '../undoRedoAction';
import { InputService } from '../input.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  newSelection: boolean;
  cloningPosition: Point;

  renderer: Renderer2;
  selectedItems: SVGGraphicsElement[];

  getElementMouseDown: boolean;

  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private selectorService: SelectorService,
              private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2,
              private includingBoxService: IncludingBoxService,
              private undoRedoService: UndoRedoService,
              private inputService: InputService,
              private fileParameterService: FileParametersServiceService) {
    this.selectedItems = [];

    this.getElementMouseDown = false;
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.newSelection = true;
    this.cloningPosition = {x: 0, y: 0};
  }

  findSelected(): boolean {
    if (this.selectorService.selectedShapes.length !== 0 && this.dismissCanvas()) {
      return true;
    } else {
      return false;
    }
  }
  clipboardEmpty(): boolean {
    if (this.selectedItems.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  dismissCanvas(): boolean {
    let shapeCounter = false;
    for (const item of this.selectorService.selectedShapes) {
      if (item.id !== 'canvas') {
        shapeCounter = true;
      }
    }
    if (shapeCounter) {
      return true;
    } else {
      return false;
    }
  }

  controlC(): void {
    this.selectedItems = [];
    for (const item of this.selectorService.selectedShapes) {
        if (item.id !== 'canvas') {
            {
              this.selectedItems.push(item);
            }
        }
    }
  }

  controlX(): void {
    this.controlC();
    for (const item of this.selectedItems) {
      if (item.id !== 'canvas') {
        this.renderer.removeChild(this.viewChildService.canvas.nativeElement, item);
      }
    }
    this.selectorService.selectedShapes = [];
    this.includingBoxService.clear();
  }

  controlA(): void {
    this.selectedItems = [];
    this.selectedItems = this.viewChildService.canvas.nativeElement.children as SVGGraphicsElement[];
    const array = Array.from(this.selectedItems);
    this.selectedItems = array;
    this.selectorService.selectedShapes = array;
    this.includingBoxService.update();

    this.cloningPosition = {
      x: this.includingBoxService.boxUpperLeft.x - 1,
      y: this.includingBoxService.boxUpperLeft.y - 1 ,
    };
    this.newSelection = true;
  }

  duplicate(shapes: SVGGraphicsElement[]): void {
    if (this.newSelection) {
      this.newSelection = false;
      this.inputService.incrementMultiplier = NB.One;
    }
    for (const shape of shapes) {
      const shapeCopy = shape.cloneNode(true) as SVGGraphicsElement;
      let newPositionX = this.inputService.incrementMultiplier * 15;
      let newPositionY = this.inputService.incrementMultiplier * 15;

      const overflowX = this.viewChildService.canvas.nativeElement.lastChild.getBoundingClientRect().left - 353;
      const overflowY = this.viewChildService.canvas.nativeElement.lastChild.getBoundingClientRect().top;

      if (overflowX + 15 > this.fileParameterService.canvasWidth.getValue()
          || overflowY + 15 > this.fileParameterService.canvasHeight.getValue()) {
            this.inputService.incrementMultiplier = NB.Zero;
            newPositionX = this.inputService.incrementMultiplier * 15;
            newPositionY = this.inputService.incrementMultiplier * 15;
          }

      let oldTransform = shapeCopy.getAttribute('transform');
      if (!oldTransform) {
        oldTransform = EMPTY_STRING;
      }
      shapeCopy.setAttribute('transform', `translate(${newPositionX}, ${newPositionY})` + oldTransform);

      this.renderer.appendChild(this.viewChildService.canvas.nativeElement, shapeCopy);
      const undoRedoAction: UndoRedoAction = {
        action: ACTIONS.append,
        increment : this.inputService.incrementMultiplier,
        shape: shapeCopy,
      };
      this.undoRedoService.addAction(undoRedoAction);
    }
    this.inputService.incrementMultiplier++;
  }

  controlV(): void {
    this.undoRedoService.poppedActions = [];
    this.duplicate(this.selectedItems);
  }
  controlD(): void {
    this.undoRedoService.poppedActions = [];
    this.duplicate(this.selectorService.selectedShapes);
  }

  delete(): void {
    for (const item of this.selectorService.selectedShapes) {
      if (item.id !== 'canvas') {
        this.renderer.removeChild(this.viewChildService.canvas.nativeElement, item);
      }
    }
    this.selectorService.selectedShapes = [];
    this.includingBoxService.clear();
  }
}
