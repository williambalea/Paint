import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EraserService {

  eraserRadius: number;
  eraseMouseDown: boolean;

  constructor(private renderer: Renderer2) {
    this.eraseMouseDown = false;
    this.eraserRadius = 5;
  }

  erase(target: EventTarget, element: HTMLElement): void {
    if (this.eraseMouseDown) {
      if (target !== element) {
        console.log('hi', target);
        this.renderer.removeChild(element, target);
      }
    }
  }
}
