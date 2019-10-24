import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  selectedItems: HTMLElement[];
  getElementMouseDown: boolean;
  controlCMode: boolean;
  controlXMode: boolean;
  controlVMode: boolean;

  constructor(private renderer: Renderer2) {
    this.selectedItems = [];
    this.getElementMouseDown = false;
    this.controlCMode = false;
    this.controlVMode = false;
    this.controlVMode = false;
  }

  getElement(target: EventTarget, element: HTMLElement) {
    {
      if (target !== element) {
        console.log('Put this element in clipboard!', target);
        this.selectedItems.push(element);
      }
    }
  }

  removeElement(target: EventTarget) {
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.renderer.removeChild(this.selectedItems[i], target);
    }
  }

  mock() {
    console.log(this.selectedItems[0]);
  }

  addElement(element: HTMLElement) {
    // for (let i = 0; i < this.selectedItems.length; i++) {
    //   this.renderer.appendChild(this.drawingBoard, this.selectedItems[i]);
    // }
    this.renderer.appendChild(this.selectedItems[0], element);
  }
}
