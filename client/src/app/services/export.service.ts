import { Injectable, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  drawingBoard: ElementRef;
  downloadImage: ElementRef;
  downloadLink: ElementRef;
  constructor() {}

  download(format : string, filename: string) {
 
    html2canvas(this.drawingBoard.nativeElement).then(downloadImage => {
      this.downloadLink.nativeElement.href = downloadImage.toDataURL('image/'+format);
      this.downloadLink.nativeElement.download = filename +'.'+format;
      this.downloadLink.nativeElement.click();
    });
    }
}
