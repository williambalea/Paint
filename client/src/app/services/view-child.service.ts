import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewChildService {
  drawingBoard: ElementRef;
  canvas: ElementRef;
  downloadImage: ElementRef;
  downloadLink: ElementRef;

  // TODO: Do ElementRef needs to be initialized? -WB
  constructor() { }
}
