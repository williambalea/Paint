import { Injectable, Renderer2 } from '@angular/core';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { SelectorService } from '../selector/selector.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  selectedItems: SVGGraphicsElement[];
  getElementMouseDown: boolean;
  controlCMode: boolean;
  controlXMode: boolean;
  controlVMode: boolean;

  constructor(private renderer: Renderer2, private selectorService: SelectorService, private includingBoxService: IncludingBoxService) {
    this.selectedItems = [];
    this.getElementMouseDown = false;
    this.controlCMode = false;
    this.controlVMode = false;
    this.controlVMode = false;
  }

  getElement(): void {
  // if (target !== element) { // s'assurer qu'il n'y ait pas de duplicate selection?
    this.selectedItems = [];
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
        if (this.selectorService.selectedShapes[i].id !== 'canvas') {
          this.selectedItems.push(this.selectorService.selectedShapes[i]);
        }
    }
    console.log('HIHIHIHIHIt this element in clipboard!', this.selectedItems);
  }

  // removeElement(target: EventTarget): void {
  //   console.log('Put this element in clipboard!', this.selectedItems);
  //   this.selectedItems = [];
  //   for (let i = 0; i < this.selectedItems.length; i++) {
  //     if (this.selectedItems[i].id !== 'canvas') {
  //       this.renderer.removeChild(target, this.selectedItems[i]);
  //     }
  //   }
  //   this.includingBoxService.clear();
  // }
}