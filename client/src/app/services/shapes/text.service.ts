import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ACTIONS, EMPTY_STRING, NB, STRINGS } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { UndoRedoService } from '../undo-redo.service';
import { UndoRedoAction } from '../undoRedoAction';
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
  isWriting: boolean;
  enterLineMultiplier: number;
  textBox: SVGGraphicsElement;

  constructor(private rendererFactory: RendererFactory2,
              private viewChildService: ViewChildService,
              private inputService: InputService,
              private undoRedoService: UndoRedoService,
              private colorService: ColorService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.textContent = EMPTY_STRING;
    this.font = 'Arial';
    this.align = 'middle';
    this.fontSize = NB.TwentyFour;
    this.isBold = false;
    this.isItalic = false;
    this.isWriting = false;
    this.enterLineMultiplier = NB.One;
    this.createTextBox();
  }

  createTextBox(): void {
    this.textBox = this.renderer.createElement('rect', 'svg');
    this.textBox.setAttribute('stroke-dasharray', '3');
    this.textBox.setAttribute('stroke', 'navy');
    this.textBox.setAttribute('stroke-width', '1');
    this.textBox.setAttribute('fill', 'none');
    this.textBox.setAttribute('width', '5');
    this.textBox.setAttribute('height', this.fontSize.toString());
  }

  updateTextBox(): void {
    const bbox = (this.text as unknown as SVGGraphicsElement).getBBox();
    this.textBox.setAttribute('x', bbox.x.toString());
    this.textBox.setAttribute('y', bbox.y.toString());
    this.textBox.setAttribute('width', bbox.width.toString());
    this.textBox.setAttribute('height', bbox.height.toString());
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
    this.isWriting = !this.isWriting;
    if (this.isWriting) {
      this.createTextElements();
      this.setTextAttributes();
      this.update();
      this.renderer.appendChild(this.viewChildService.canvas.nativeElement, this.text);
      const undoRedoAction: UndoRedoAction = {
        action: ACTIONS.append,
        shape: this.text as unknown as SVGGraphicsElement,
      };
      this.undoRedoService.addAction(undoRedoAction);

      this.textBox.setAttribute('x', (this.inputService.getMouse().x - NB.Three).toString());
      this.textBox.setAttribute('y', (this.inputService.getMouse().y - (this.fontSize + NB.Eight)).toString());
      this.textBox.setAttribute('width', NB.Eight.toString());
      this.textBox.setAttribute('height', this.fontSize.toString());
      this.renderer.appendChild(this.viewChildService.canvas.nativeElement, this.textBox);
    } else {
      this.renderer.removeChild(this.viewChildService.canvas.nativeElement, this.textBox);
    }
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
    this.updateTextBox();
  }

  updateTextAttributes(): void {
    this.renderer.setAttribute(this.text, 'font-family', this.font);
    this.renderer.setAttribute(this.text, 'font-size', this.fontSize.toString());
    this.renderer.setAttribute(this.text, 'text-anchor', this.align);
    this.renderer.setAttribute(this.text, 'fill', this.colorService.getFillColor());
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
    this.renderer.setAttribute(this.tspan, 'dy', (this.fontSize * this.enterLineMultiplier).toString());
    this.renderer.appendChild(this.text, this.tspan);

    const tempHeight = (this.textBox as SVGGraphicsElement).getBBox().height + this.fontSize;
    this.renderer.setAttribute(this.textBox, 'height', tempHeight.toString());

    this.textContent = EMPTY_STRING;
    this.inputService.enterPressed = false;
    this.enterLineMultiplier ++;
  }

  lineJumpBack(): void {
    this.text.removeChild(this.text.lastChild as ChildNode);
    this.tspan = this.text.lastChild as HTMLElement;
    this.textContent = this.tspan.innerHTML;
  }

}
