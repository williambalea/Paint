import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewChildService {
  drawingBoard: ElementRef;
  canvas: ElementRef;
  defs: ElementRef;
  downloadImage: ElementRef;
  downloadLink: ElementRef;
  eraserCountour: ElementRef;
  includingBox: ElementRef;
}
