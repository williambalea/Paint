import { Injectable, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  drawingBoard: ElementRef;
  downloadImage: ElementRef;
  downloadLink: ElementRef;
  constructor() { }

  download(format : string) {
 
    html2canvas(this.drawingBoard.nativeElement).then(downloadImage => {
      this.downloadImage.nativeElement.src = downloadImage.toDataURL();
      this.downloadLink.nativeElement.href = downloadImage.toDataURL('test/'+format);
      this.downloadLink.nativeElement.download = 'test.'+format;
      this.downloadLink.nativeElement.click();
    });
    }
}
