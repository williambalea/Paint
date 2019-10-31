import { Injectable } from '@angular/core';
import { SelectorService } from '../selector/selector.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  selectedItems: SVGGraphicsElement[];
  memoryShapes: SVGGraphicsElement[];
  selectedItemsOffset: SVGGraphicsElement[];
  getElementMouseDown: boolean;
  controlCMode: boolean;
  controlXMode: boolean;
  controlVMode: boolean;

  constructor(private selectorService: SelectorService) {
    this.selectedItems = [];
    this.selectedItemsOffset = [];
    this.memoryShapes = [];

    this.getElementMouseDown = false;
    this.controlCMode = false;
    this.controlVMode = false;
    this.controlVMode = false;
  }

  getElement(): void {
    this.selectedItems = [];
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
        if (this.selectorService.selectedShapes[i].id !== 'canvas') {
            {
              this.selectedItems.push(this.selectorService.selectedShapes[i]);
            }
        }
    }
    console.log(this.selectedItems);
  }

  findSelected(): boolean {
    if (this.selectorService.selectedShapes.length !== 0 && this.dismissCanvas()) {
      return true;
    } else {
      return false;
    }
  }

  dismissCanvas(): boolean {
    let shapeCounter = false;
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
      if (this.selectorService.selectedShapes[i].id !== 'canvas') {
        shapeCounter = true;
      }
    }
    if (shapeCounter) {
      return true;
    } else {
      return false;
    }
  }
}
