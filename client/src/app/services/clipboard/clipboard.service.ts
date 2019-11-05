import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NB } from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { SelectorService } from '../selector/selector.service';
import { ViewChildService } from '../view-child.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  renderer: Renderer2;
  selectedItems: SVGGraphicsElement[];

  getElementMouseDown: boolean;
  nbIncrements: number;
  nbIncrementsReset: number;

  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private selectorService: SelectorService,
              private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2,
              private includingBoxService: IncludingBoxService,
              private fileParameterService: FileParametersServiceService) {
    this.selectedItems = [];

    this.nbIncrements = 1;
    this.nbIncrementsReset = 0;
    this.getElementMouseDown = false;
    this.renderer = this.rendererFactory.createRenderer(null, null);
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

  writeTranslate(): string {
    let shiftX: number;
    let shiftY: number;
    if (this.nbIncrements > 0) {
      shiftX = this.nbIncrements * NB.Fifteen;
      shiftY = this.nbIncrements * NB.Fifteen;
    } else {
      shiftX = NB.Fifteen;
      shiftY = NB.Fifteen;
    }
    return 'translate(' + shiftX + ', ' + shiftY + ')';
  }

  verifyTranslationCoordinates(x: number, y: number): boolean {
    if (x + (NB.Fifteen * this.nbIncrements) > this.fileParameterService.canvasWidth.getValue()
        || y + (NB.Fifteen * this.nbIncrements) > this.fileParameterService.canvasHeight.getValue()) {
      this.nbIncrements = 0;
      return false;
    } else {
      return true;
    }
  }

  renderSVGElement(copiedNode: Node): void {
    this.renderer.setAttribute(copiedNode, 'transform', this.writeTranslate());
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
    console.log('copy', (copiedNode as SVGGraphicsElement).getBoundingClientRect());
  }

  controlC(): void {
    this.selectedItems = [];
    this.nbIncrements = 0;
    for (const item of this.selectorService.selectedShapes) {
        if (item.id !== 'canvas') {
            {
              this.selectedItems.push(item);
            }
        }
    }
    console.log(this.selectedItems);
    this.nbIncrements++;
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
  }

  controlD(): void {
    let copiedNode: SVGGraphicsElement;
    for (const item of this.selectorService.selectedShapes) {
      copiedNode = item.cloneNode(true) as SVGGraphicsElement;
      if (this.verifyTranslationCoordinates(item.getBoundingClientRect().left, item.getBoundingClientRect().top)) {
        this.renderSVGElement(copiedNode);
      } else {
        this.nbIncrements = 0;
        this.nbIncrementsReset++;
      }
    }
    this.nbIncrements++;
  }
  controlV(): void {
    let copiedNode: SVGGraphicsElement;
    for (const item of this.selectedItems) {
      copiedNode = item.cloneNode(true) as SVGGraphicsElement;

      if (this.verifyTranslationCoordinates(item.getBoundingClientRect().left, item.getBoundingClientRect().top)) {
        this.renderSVGElement(copiedNode);
      } else {
        this.nbIncrements = 0;
        this.nbIncrementsReset++;
      }
      this.nbIncrements++;
      }
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
