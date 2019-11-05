import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NB } from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { SelectorService } from '../selector/selector.service';
import { ViewChildService } from '../view-child.service';
import { Point } from '../../../../../common/interface/point';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  wIncrementMultiplier: number;
  wNewSelection: boolean;
  wCloningPosition: Point;

  renderer: Renderer2;
  selectedItems: SVGGraphicsElement[];
  maxX: number;
  maxY: number;

  getElementMouseDown: boolean;
  nbIncrements: number;

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
    this.getElementMouseDown = false;
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.maxX = this.includingBoxService.boxUpperLeft.x;
    this.maxY = this.includingBoxService.boxUpperLeft.y;

    this.wIncrementMultiplier = NB.One;
    this.wNewSelection = true;
    this.wCloningPosition = {x: 0, y: 0};
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
    if (x + (NB.Fifteen * this.nbIncrements) > this.fileParameterService.canvasWidth.getValue() + 350
        || y + (NB.Fifteen * this.nbIncrements) > this.fileParameterService.canvasHeight.getValue()) {
        return false;
    } else {
      return true;
    }
  }

  renderSVGElement(copiedNode: SVGGraphicsElement): void {
    this.renderer.setAttribute(copiedNode, 'transform', this.writeTranslate());
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
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

  controlDD(): void {
    let copiedNode: SVGGraphicsElement;
    for (const item of this.selectorService.selectedShapes) {
      copiedNode = item.cloneNode(true) as SVGGraphicsElement;
      this.maxX = (item as SVGGraphicsElement).getBoundingClientRect().left;
      this.maxY = (item as SVGGraphicsElement).getBoundingClientRect().top;
      console.log(this.maxX);
      console.log(this.maxY);
      console.log(item.getBoundingClientRect());
      if (this.verifyTranslationCoordinates(this.maxX, this.maxY)) {
        this.renderSVGElement(copiedNode);
      } else {
        this.nbIncrements = 0;
      }
    }
    this.nbIncrements++;
  }

  controlD(): void {
    if (this.wNewSelection) {
      this.wNewSelection = false;
      this.wIncrementMultiplier = NB.One;
    }
    for (const shape of this.selectorService.selectedShapes) {
      const shapeCopy = shape.cloneNode(true) as SVGGraphicsElement;
      let newPositionX = this.wIncrementMultiplier * 15;
      let newPositionY = this.wIncrementMultiplier * 15;

      if (newPositionX > this.fileParameterService.canvasWidth.getValue()
          || newPositionY > this.fileParameterService.canvasHeight.getValue()) {
            this.wIncrementMultiplier = NB.One;
            newPositionX = this.wIncrementMultiplier * 15 + this.wCloningPosition.x;
            newPositionY = this.wIncrementMultiplier * 15 + this.wCloningPosition.y;
          }

      console.log('shapeCopy poisitons', shapeCopy.getBoundingClientRect());
      console.log('new x', newPositionX);
      console.log('new y', newPositionY);
      shapeCopy.setAttribute('transform', `translate(${newPositionX}, ${newPositionY})`);
      this.renderer.appendChild(this.viewChildService.canvas.nativeElement, shapeCopy);
    }
    this.wIncrementMultiplier++;
  }

  controlV(): void {
    let copiedNode: SVGGraphicsElement;
    for (const item of this.selectedItems) {
      copiedNode = item.cloneNode(true) as SVGGraphicsElement;
      if (this.verifyTranslationCoordinates(0, 0)) { // recheck this please
        this.renderSVGElement(copiedNode);
      } else {
        this.nbIncrements = 0;
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
