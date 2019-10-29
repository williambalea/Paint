import { Injectable, Renderer2 } from '@angular/core';
import { EMPTY_STRING, NB, STRINGS } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  x: number;
  y: number;
  xPos: string;
  font: string;
  fontSize: number;
  text: HTMLElement;
  tspan: HTMLElement;
  align: string;
  isBold: boolean;
  isItalic: boolean;
  isEnterPressed: boolean;
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
    this.tspan = this.renderer.createElement('tspan', 'svg');
    this.renderer.appendChild(this.text, this.tspan);

    this.textContent = EMPTY_STRING;
    this.xPos = this.inputService.getMouse().x.toString();
    this.renderer.setAttribute(this.text, 'x', this.xPos);
    this.renderer.setAttribute(this.text, 'y', (this.inputService.getMouse().y - this.fontSize / 2).toString());

    this.renderer.setAttribute(this.tspan, 'x', this.xPos);
    this.renderer.setAttribute(this.tspan, 'dy', NB.Zero.toString());

    this.update();
    return this.text;
  }

  update(): void {
    this.renderer.setAttribute(this.text, 'font-family', this.font);
    this.renderer.setAttribute(this.text, 'font-size', this.fontSize.toString());
    this.renderer.setAttribute(this.text, 'text-anchor', this.align);
    this.renderer.setAttribute(this.text, 'fill', this.colorService.getFillColor());
    //Bold
    let boldString: string;
    this.isBold ? boldString = STRINGS.bold : boldString = EMPTY_STRING;
    this.renderer.setAttribute(this.text, 'font-weight', boldString);
    //italic
    let italicString: string;
    this.isItalic ? italicString = STRINGS.italic : italicString = EMPTY_STRING;
    this.renderer.setAttribute(this.text, 'font-style', italicString);

    if(this.inputService.enterPressed) {
      this.lineJump();
      this.inputService.enterPressed = false;
    }

    this.renderer.setProperty(this.tspan, 'innerHTML', this.textContent);
  }

  lineJump(): void {
    this.tspan = this.renderer.createElement('tspan', 'svg');
    this.renderer.setAttribute(this.tspan, 'x', this.xPos);
    this.renderer.setAttribute(this.tspan, 'dy', this.fontSize.toString());
    this.renderer.appendChild(this.text, this.tspan);
    this.textContent = EMPTY_STRING;
  }

}
