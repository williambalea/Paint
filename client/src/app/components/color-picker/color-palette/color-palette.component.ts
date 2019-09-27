// Inspiré de https://github.com/LukasMarx/angular-color-picker
import { AfterViewInit,
        Component,
        ElementRef,
        EventEmitter,
        HostListener,
        Input,
        OnChanges,
        Output,
        SimpleChanges,
        ViewChild
} from '@angular/core';
import { COLORS, NB, STRINGS } from '../../../../constants';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  @Input() hue: string;
  @Output() color: EventEmitter<string> = new EventEmitter(true);
  @ViewChild(STRINGS.canvas, {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean;
  selectedPosition: { x: number; y: number };

  ngAfterViewInit(): void {
    this.draw();
  }

  draw(): void {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext(STRINGS.twoD) as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.fillStyle = this.hue || COLORS.whiteRGBA;
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    this.ctx.fillStyle = this.drawGradient(width);
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    const blackGrad = this.ctx.createLinearGradient(NB.Zero, NB.Zero, NB.Zero, height);
    blackGrad.addColorStop(NB.Zero, COLORS.whiteRGBATransparent);
    blackGrad.addColorStop(NB.One, COLORS.blackRGBA);
    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    if (this.selectedPosition) {
        this.ctx.strokeStyle = STRINGS.white;
        this.ctx.fillStyle = STRINGS.white;
        this.ctx.beginPath();
        this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, NB.Ten, NB.Zero, NB.Two * Math.PI);
        this.ctx.lineWidth = NB.Five;
        this.ctx.stroke();
    }
  }

  drawGradient(width: number): CanvasGradient {
    const whiteGrad = this.ctx.createLinearGradient(NB.Zero, NB.Zero, width, NB.Zero);
    whiteGrad.addColorStop(NB.Zero, COLORS.whiteRGBA);
    whiteGrad.addColorStop(NB.One,  COLORS.whiteRGBATransparent);
    return whiteGrad;
  }

  getMouseDown(): boolean {
    return this.mousedown;
  }

  setMouseDown(val: boolean) {
    this.mousedown = val;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hue) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y));
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
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
    return 'rgba(' + imageData[NB.Zero] + ',' + imageData[NB.One] + ',' + imageData[NB.Two] + ',1)';
  }
}
