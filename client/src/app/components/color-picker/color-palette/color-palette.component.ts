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
import { NB } from '../../../../constants';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  @Input() hue: string;
  @Output() color: EventEmitter<string> = new EventEmitter(true);
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean;
  selectedPosition: { x: number; y: number };

  ngAfterViewInit(): void {
    this.draw();
  }

  draw(): void {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.fillStyle = this.hue || 'rgba(255,255,255,1)';
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    const whiteGrad = this.ctx.createLinearGradient(NB.Zero, NB.Zero, width, NB.Zero);
    whiteGrad.addColorStop(NB.Zero, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(NB.One, 'rgba(255,255,255,0)');
    this.ctx.fillStyle = whiteGrad;
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    const blackGrad = this.ctx.createLinearGradient(NB.Zero, NB.Zero, NB.Zero, height);
    blackGrad.addColorStop(NB.Zero, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(NB.One, 'rgba(0,0,0,1)');
    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(NB.Zero, NB.Zero, width, height);
    if (this.selectedPosition) {
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, NB.Ten, NB.Zero, NB.Two * Math.PI);
        this.ctx.lineWidth = NB.Five;
        this.ctx.stroke();
    }
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
