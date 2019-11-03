import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY_STRING } from 'src/constants';
import { ColorService } from '../services/color/color.service';
import { ExportService } from '../services/export.service';
import { InputService } from '../services/input.service';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent implements OnInit, OnDestroy {
  formats: string[];
  selectedFormat: string;
  name: string;
  fileName: string;
  fileUrl;

  constructor(private exportService: ExportService,
              private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
    this.formats = ['jpg', 'png', 'bmp', 'svg'];
    this.selectedFormat = EMPTY_STRING;
    this.name = EMPTY_STRING;
    this.fileName = EMPTY_STRING;
    this.inputService.gridShortcutsActive = false;
  }

  ngOnDestroy() {
    this.inputService.gridShortcutsActive = true;
  }

  ngOnInit() {
    const svg = this.renderer.createElement('svg');
    this.renderer.setAttribute(svg, 'viewBox', `0 0 ${this.exportService.canvas.nativeElement.width}
    ${this.exportService.canvas.nativeElement.height}`);
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setStyle(svg, 'backgroundColor', this.colorService.getBackgroundColor());
    this.renderer.appendChild(svg, this.exportService.canvas.nativeElement.cloneNode(true));
    const blob = new Blob([svg.outerHTML], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  click() {
    if (window.confirm('please confirm export operation')) {
      if (this.selectedFormat !== 'svg') {
      this.exportService.download(this.selectedFormat, this.fileName);
      }
    }
  }

}
