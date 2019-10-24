import { Injectable, Renderer2, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  selectedItems: HTMLElement[];
  getElementMouseDown: boolean;

  constructor(private renderer: Renderer2) {
    this.selectedItems = [];
    this.getElementMouseDown = false;
  }

  getElement(target: EventTarget, element: HTMLElement) {
    if (this.getElementMouseDown) {
      if (target !== element) {
        console.log('hi', target);
        this.selectedItems.push(element);
        this.renderer.removeChild(element, target);
      }
    }
  }

  // addElement() {
  //   for (let i = 0; i < this.selectedItems.length; i++) {
  //     this.renderer.appendChild(this.drawingBoard, this.selectedItems[i]);
  //   }
  // }
}
