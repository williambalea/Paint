import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY_STRING } from 'src/constants';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss'],
})
export class DownloadModalComponent implements OnInit {
  formats: string[];
  selectedFormat: string;
  name: string;
  fileName: string;
  fileUrl: any;

  constructor(private exportService: ExportService, private sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.selectedFormat = 'svg';
    this.name = EMPTY_STRING;
    this.fileName = EMPTY_STRING;
  }

  ngOnInit() {
    console.log(this.exportService.downloadLink);
    const svg = this.renderer.createElement('svg');
    this.setAttributeSVG(svg);
    this.renderer.appendChild(svg, this.exportService.canvas.nativeElement.cloneNode(true));
    const blob = new Blob([svg.outerHTML], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  setAttributeSVG(svg: SVGGraphicsElement): void {
    this.renderer.setAttribute(svg, 'viewBox', `0 0 ${this.exportService.canvas.nativeElement.width}
    ${this.exportService.canvas.nativeElement.height}`);
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
  }
}
