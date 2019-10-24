import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  selectedItems: HTMLElement[];
  getElementMouseDown: boolean;

  constructor() {
    this.selectedItems = [];
    this.getElementMouseDown = false;
  }

  // getElement(target: EventTarget, element: HTMLElement) {
  //   if (this.getElementMouseDown) {
  //     if (target !== element) {
  //       console.log('hi', target);
  //       this.selectedItems.push(element);
  //       this.renderer.removeChild(element, target);
  //     }
  //   }
  
  mock() {
    console.log('hi');
  }

  // addElement() {
  //   for (let i = 0; i < this.selectedItems.length; i++) {
  //     this.renderer.appendChild(this.drawingBoard, this.selectedItems[i]);
  //   }
  // }
}
