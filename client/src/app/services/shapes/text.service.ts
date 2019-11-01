import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { EMPTY_STRING, NB, STRINGS } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { ViewChildService } from '../view-child.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  renderer: Renderer2;

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

  constructor(private rendererFactory: RendererFactory2,
              private viewChildService: ViewChildService,
              private inputService: InputService,
              private colorService: ColorService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.textContent = EMPTY_STRING;
    this.font = 'Arial';
    this.align = 'middle';
    this.fontSize = NB.TwentyFour;
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

  onMouseDown(): void {
    this.createTextElements();
    this.setTextAttributes();
    this.update();
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, this.text);
  }

  createTextElements(): void {
    this.text = this.renderer.createElement('text', 'svg');
    this.tspan = this.renderer.createElement('tspan', 'svg');
    this.renderer.appendChild(this.text, this.tspan);
  }

  setTextAttributes(): void {
    this.textContent = EMPTY_STRING;
    this.xPos = this.inputService.getMouse().x.toString();
    this.renderer.setAttribute(this.text, 'x', this.xPos);
    this.renderer.setAttribute(this.text, 'y', (this.inputService.getMouse().y - this.fontSize / 2).toString());
    this.renderer.setAttribute(this.tspan, 'x', this.xPos);
    this.renderer.setAttribute(this.tspan, 'dy', NB.Zero.toString());
  }

  update(): void {
    this.updateTextAttributes();
    this.setBoldString();
    this.setItalicString();
  }

  updateTextAttributes(): void {
    this.renderer.setAttribute(this.text, 'font-family', this.font);
    this.renderer.setAttribute(this.text, 'font-size', this.fontSize.toString());
    this.renderer.setAttribute(this.text, 'text-anchor', this.align);
    this.renderer.setAttribute(this.text, 'fill', this.colorService.getFillColor());
    this.text.childNodes.forEach((element) => {
      this.renderer.setAttribute(element, 'dy', this.fontSize.toString());
    });
  }

  setBoldString(): void {
    let boldString: string;
    this.isBold ? boldString = STRINGS.bold : boldString = EMPTY_STRING;
    this.renderer.setAttribute(this.text, 'font-weight', boldString);
  }

  setItalicString(): void {
    let italicString: string;
    this.isItalic ? italicString = STRINGS.italic : italicString = EMPTY_STRING;
    this.renderer.setAttribute(this.text, 'font-style', italicString);
    this.renderer.setProperty(this.tspan, 'innerHTML', this.textContent);
  }

  lineJump(): void {
    this.tspan = this.renderer.createElement('tspan', 'svg');
    this.renderer.setAttribute(this.tspan, 'x', this.xPos);
    this.renderer.setAttribute(this.tspan, 'dy', this.fontSize.toString());
    this.renderer.appendChild(this.text, this.tspan);
    this.textContent = EMPTY_STRING;
    this.inputService.enterPressed = false;
  }

  lineJumpBack(): void {
    this.text.removeChild(this.text.lastChild as ChildNode);
    this.tspan = this.text.lastChild as HTMLElement;
    this.textContent = this.tspan.innerHTML;
  }

}
