import { ElementRef, Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { ViewChildService } from './view-child.service';
@Injectable({
  providedIn: 'root',
})
export class ExportService {
  canvas: ElementRef;
  drawingBoard: ElementRef;
  downloadImage: ElementRef;
  downloadLink: ElementRef;

  constructor(private viewChildService: ViewChildService) {
    this.canvas = this.viewChildService.canvas;
    this.drawingBoard = this.viewChildService.drawingBoard;
    this.downloadImage = this.viewChildService.downloadImage;
    this.downloadLink = this.viewChildService.downloadLink;
  }

  download(format: string) {
    html2canvas(this.drawingBoard.nativeElement).then((downloadImage) => {
      this.downloadLink.nativeElement.href = downloadImage.toDataURL('image/' + format);
      this.downloadLink.nativeElement.download = 'file.' + format;
      this.downloadLink.nativeElement.click();
    });
    }
}
