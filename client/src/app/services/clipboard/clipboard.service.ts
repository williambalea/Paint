import { Injectable, Renderer2 } from '@angular/core';
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

  constructor(private renderer: Renderer2, private selectorService: SelectorService) {
    this.selectedItems = [];
    this.getElementMouseDown = false;
    this.controlCMode = false;
    this.controlVMode = false;
    this.controlVMode = false;
  }

  // Utilisons le data du selectorService:

  getElement(): void {
      // if (target !== element) { // s'assurer qu'il n'y ait pas de duplicate selection?
        for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
            if (this.selectorService.selectedShapes[i].id !== 'canvas') {
              this.selectedItems.push(this.selectorService.selectedShapes[i]);
            }
        }
        console.log('Put this element in clipboard!', this.selectedItems);
      }

  removeElement(target: EventTarget): void {
    console.log('Put this element in clipboard!', this.selectedItems);
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (this.selectedItems[i].id !== 'canvas') {
        this.renderer.removeChild(target, this.selectedItems[i]);
      }
    }
  }

  // addElement(target: EventTarget): void {
  //   console.log(this.selectedItems);
  //   console.log(target);
  //   for (let i = 0; i < this.selectedItems.length; i++) {
  //     if(this.selectedItems[i].id !== 'canvas') {
  //     this.renderer.appendChild(this.inputService.canvasTarget.nativeElement, this.selectedItems[i]);
  //     }
  //   }
  }

  /* Methodes a travers un select, sans utiliser le array du selector
  getElement(target: EventTarget, element: HTMLElement): void {
    {
      if (target !== element) { // s'assurer qu'il n'y ait pas de duplicate selection?
        console.log('Put this element in clipboard!', target);
        this.selectedItems.push(target as HTMLElement);
      }
    }
  }

  removeElement(target: EventTarget, element: HTMLElement): void {
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (target !== element) {
          this.renderer.removeChild(target, this.selectedItems[i]);
      }
    }
  }

  addElement(parent: HTMLElement): void {
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.renderer.appendChild(parent, this.selectedItems[i]);
    }

  }
  */
