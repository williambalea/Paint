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

  getElement(target: EventTarget, element: HTMLElement): void {
    {
      if (target !== element) { // s'assurer qu'il n'y ait pas de duplicate selection?
        console.log('Put this element in clipboard!', target);
        this.selectedItems.push(element);
      }
    }
  }

  removeElement(target: EventTarget, element: HTMLElement): void {
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (target !== element) {
        this.renderer.removeChild(this.selectedItems[i], target);
      }
    }
  }

  mock(): void {
    console.log(this.selectedItems[0]);
    console.log(this.selectedItems[1]);
    console.log(this.selectedItems[2]);
    console.log(this.selectedItems[3]);
  }

  addElement(): HTMLElement[] {
    // for (let i = 0; i < this.selectedItems.length; i++) {
    //   this.renderer.appendChild(this.drawingBoard, this.selectedItems[i]);
    // }
    return this.selectedItems;
  }
}
