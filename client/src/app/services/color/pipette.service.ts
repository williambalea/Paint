import { ElementRef, Injectable } from '@angular/core';
import { NB, STRINGS } from 'src/constants';
import { InputService } from '../input.service';
import { ScreenshotService } from '../shapes/screenshot.service';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root',
})
export class PipetteService {

  constructor(private colorService: ColorService,
              private inputService: InputService,
              private screenshotService: ScreenshotService) { }

  private setUserColors(event: MouseEvent, data: Uint8ClampedArray): void {
    if (event.button === NB.Zero) {
      this.colorService.setFillColor('rgba(' + data[NB.Zero] + ',' + data[NB.One] + ',' + data[NB.Two] + ',' + data[NB.Three] + ')');
    }
    if (event.button === NB.Two) {
      this.colorService.setStrokeColor('rgba(' + data[NB.Zero] + ',' + data[NB.One] + ',' + data[NB.Two] + ',' + data[NB.Three] + ')');
    }
  }

  getColors(event: MouseEvent, htmlCanvas: ElementRef, drawingBoard: ElementRef, height: number, width: number): void {
    const canvas: HTMLCanvasElement = htmlCanvas.nativeElement;
    canvas.height = height;
    canvas.width = width;
    const images64: string = this.screenshotService.screenshotBase64(drawingBoard.nativeElement);
    const image = new Image();
    image.src = images64;
    image.onload = () => {
      (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, NB.Zero, NB.Zero, width, height);
      const data: Uint8ClampedArray = (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).
        getImageData(this.inputService.getMouse().x, this.inputService.getMouse().y, NB.One, NB.One).data;
      this.setUserColors(event, data);
    };
  }
}
