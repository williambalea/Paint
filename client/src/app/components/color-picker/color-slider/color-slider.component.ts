import {  AfterViewInit,
          Component,
          ElementRef,
          EventEmitter,
          HostListener,
          Output,
          ViewChild
} from '@angular/core';
import { NB } from '../../../../constants';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
})
export class ColorSliderComponent implements AfterViewInit {

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @Output() color: EventEmitter<string> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean;
  private selectedHeight: number;

  ngAfterViewInit(): void {
    this.draw();
  }

  initialDrawCondition(){
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
  }

  selectPosition(){
    if (this.selectedHeight) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = NB.Five;
      this.ctx.rect(NB.Zero, this.selectedHeight - NB.Five, this.canvas.nativeElement.width, NB.Ten);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  setGradient(){
    const gradient = this.ctx.createLinearGradient(NB.Zero, NB.Zero, NB.Zero, this.canvas.nativeElement.height);
    gradient.addColorStop(NB.Zero, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(NB.ZeroPointSeventeen, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(NB.ZeroPointThirtyFour, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(NB.ZeroPointFiftyOne, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(NB.ZeroPointSixtyEight, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(NB.ZeroPointEightyFive, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(NB.One, 'rgba(255, 0, 0, 1)');
    return gradient;
  }

  draw(): void {
    this.initialDrawCondition();
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(NB.Zero, NB.Zero, width, height);
    this.ctx.beginPath();
    this.ctx.rect(NB.Zero, NB.Zero, width, height);
    this.ctx.fillStyle = this.setGradient();
    this.ctx.fill();
    this.ctx.closePath();
    this.selectPosition();

  }

  getMouseDown(): boolean {
    return this.mousedown;
  }

  setMouseDown(val: boolean): void {
    this.mousedown = val;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.mousedown = false;
  }

  onMouseDown(event: MouseEvent): void {
    this.mousedown = true;
    this.selectedHeight = event.offsetY;
    this.draw();
    this.emitColor(event.offsetX, event.offsetY);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.mousedown) {
      this.selectedHeight = event.offsetY;
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
