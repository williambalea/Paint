import { Injectable, Renderer2 } from '@angular/core';

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
    {
      if (target !== element) {
        console.log('Put this element in clipboard!', target);
        this.selectedItems.push(element);
        this.renderer.removeChild(element, target);
      }
    }
  }

  mock() {
    console.log('hi');
  }

  // addElement() {
  //   for (let i = 0; i < this.selectedItems.length; i++) {
  //     this.renderer.appendChild(this.drawingBoard, this.selectedItems[i]);
  //   }
  // }
}
