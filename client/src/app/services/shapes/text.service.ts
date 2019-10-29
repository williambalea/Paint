import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  x: number;
  y: number;
  font: string;
  fontSize: number;
  text: HTMLElement;
  align: string;
  isBold: boolean;
  isItalic: boolean;
  textContent: string;

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
    this.textContent = EMPTY_STRING;
    this.font = 'Arial';
    this.align = 'start';
    this.fontSize = NB.Sixteen;
    this.isBold = false;
    this.isItalic = false;
  }

  setAlign(align: string): void {
    this.align = align;
    this.update();
  }

  toggleBold(): void {
    this.isBold = !this.isBold;
    this.update();
  }

  toggleItalic(): void {
    this.isItalic = !this.isItalic;
    this.update();
  }

  onMouseDown(): any {
    this.text = this.renderer.createElement('text', 'svg');
    this.textContent = EMPTY_STRING;
    this.renderer.setAttribute(this.text, 'x', this.inputService.getMouse().x.toString());
    this.renderer.setAttribute(this.text, 'y', (this.inputService.getMouse().y - this.fontSize / 2).toString());
    this.update();
    return this.text;
  }

  update(): void {
    this.renderer.setAttribute(this.text, 'font-family', this.font);
    this.renderer.setAttribute(this.text, 'font-size', this.fontSize.toString());
    this.renderer.setAttribute(this.text, 'text-anchor', this.align);
    this.renderer.setAttribute(this.text, 'fill', this.colorService.getFillColor());
    if (this.isBold) {
      this.renderer.setAttribute(this.text, 'font-weight', 'bold');
    } else {
      this.renderer.setAttribute(this.text, 'font-weight', '');
    }
    if (this.isItalic) {
      this.renderer.setAttribute(this.text, 'font-style', 'italic');
    }
    this.renderer.setProperty(this.text, 'innerHTML', this.textContent);
  }

}
