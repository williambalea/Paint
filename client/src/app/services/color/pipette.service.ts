import { ElementRef, Injectable } from '@angular/core';
import { STRINGS } from 'src/constants';
import { ScreenshotService } from '../shapes/screenshot.service';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root',
})
export class PipetteService {

  constructor(private colorService: ColorService,
              private screenshotService: ScreenshotService) { }

  getColors(event: MouseEvent, htmlCanvas: ElementRef, drawingBoard: ElementRef, height: number, width: number): void {
    const canvas: HTMLCanvasElement = htmlCanvas.nativeElement;
    canvas.height = height;
    canvas.width = width;
    const images64: string = this.screenshotService.screenshotBase64(drawingBoard.nativeElement);
    const image = new Image();
    image.src = images64;
    image.onload = () => {
      (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, 0, 0, width, height);
      const data: Uint8ClampedArray = (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).
        getImageData(event.offsetX, event.offsetY, 1, 1).data;
      if (event.button === 0) {
        this.colorService.setFillColor('rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')');
      }
      if (event.button === 2) {
        this.colorService.setStrokeColor('rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')');
      }
    };
  }
}
