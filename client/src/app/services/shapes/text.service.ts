import { Injectable, Renderer2 } from '@angular/core';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class TextService implements Shape {
  x: number;
  y: number;
  text: HTMLElement;

  constructor(private renderer: Renderer2 ) {
   }

  onMouseDown(): any {
    this.text = this.renderer.createElement('text', 'svg');
  }

  onMouseMove(): void {
    return;
  }

  onMouseUp(): void {
    return;
  }

}
