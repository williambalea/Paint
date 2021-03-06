// Inspiré de https://github.com/LukasMarx/angular-color-picker
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { COLORS, NB, STRINGS } from '../../../../constants';

@Component({
  selector: 'app-color-palette',
  styleUrls: ['./color-palette.component.scss'],
  templateUrl: './color-palette.component.html',
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  @Input() hue: string;
  @Output() color: EventEmitter<string>;
  @ViewChild(STRINGS.canvas, { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  selectedPosition: { x: number; y: number };
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean;

  constructor() {
    this.selectedPosition = { x: NB.SeventyFive, y: NB.SeventyFive };
    this.color = new EventEmitter(true);
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  initialDrawCondition(): void {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext(STRINGS.twoD) as CanvasRenderingContext2D;
    }
  }

  selectPosition(): void {
    if (this.selectedPosition) {
      this.ctx.strokeStyle = STRINGS.white;
      this.ctx.fillStyle = STRINGS.white;
      this.ctx.beginPath();
      this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, NB.Ten, NB.Zero, NB.Two * Math.PI);
      this.ctx.lineWidth = NB.Five;
      this.ctx.stroke();
    }
  }

  setWhiteGrad(): void {
    const whiteGrad = this.ctx.createLinearGradient(NB.Zero, NB.Zero, this.canvas.nativeElement.width, NB.Zero);
    whiteGrad.addColorStop(NB.Zero, COLORS.whiteRGBA);
    whiteGrad.addColorStop(NB.One, COLORS.whiteRGBATransparent);
    this.ctx.fillStyle = whiteGrad;
  }

  setBlackGrad(): void {
    const blackGrad = this.ctx.createLinearGradient(NB.Zero, NB.Zero, NB.Zero, this.canvas.nativeElement.height);
    blackGrad.addColorStop(NB.Zero, COLORS.blackRGBATransparent);
    blackGrad.addColorStop(NB.One, COLORS.blackRGBA);
    this.ctx.fillStyle = blackGrad;
  }

  renderCanvasObject(): void {
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.fillStyle = this.hue || COLORS.whiteRGBA;
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    this.setWhiteGrad();
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    this.setBlackGrad();
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
  }

  draw(): void {
    this.initialDrawCondition();
    this.renderCanvasObject();
    this.selectPosition();
  }

  getMouseDown(): boolean {
    return this.mousedown;
  }

  setMouseDown(val: boolean): void {
    this.mousedown = val;
  }

  emitColorOnPosition(): void {
    const position = this.selectedPosition;
    if (position) {
      this.color.emit(this.getColorAtPosition(position.x, position.y));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hue) {
      this.draw();
      this.emitColorOnPosition();
    }
  }

  @HostListener('window:mouseup', [''])
  onMouseUp(): void {
    this.mousedown = false;
  }

  onMouseDown(event: MouseEvent): void {
    this.mousedown = true;
    this.selectedPosition = { x: event.offsetX, y: event.offsetY };
    this.draw();
    this.color.emit(this.getColorAtPosition(event.offsetX, event.offsetY));
  }

  onMouseMove(event: MouseEvent): void {
    if (this.mousedown) {
      this.selectedPosition = { x: event.offsetX, y: event.offsetY };
      this.draw();
      this.emitColor(event.offsetX, event.offsetY);
    }
  }

  emitColor(x: number, y: number): void {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number): string {
    const imageData = this.ctx.getImageData(x, y, NB.One, NB.One).data;
    return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
  }
}
