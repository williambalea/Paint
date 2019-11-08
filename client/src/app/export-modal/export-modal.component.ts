import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY_STRING } from 'src/constants';
import { ColorService } from '../services/color/color.service';
import { ExportService } from '../services/export.service';
import { FileParametersServiceService } from '../services/file-parameters-service.service';
import { InputService } from '../services/input.service';
import { ViewChildService } from '../services/view-child.service';

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
              private colorService: ColorService,
              private viewChildService: ViewChildService,
              private fileParameterService: FileParametersServiceService) {
    this.formats = ['jpeg', 'png', 'bmp', 'svg'];
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
    this.renderer.setAttribute(svg, 'width', this.fileParameterService.canvasWidth.getValue().toString());
    this.renderer.setAttribute(svg, 'height', this.fileParameterService.canvasHeight.getValue().toString());
    this.renderer.setStyle(svg, 'backgroundColor', this.colorService.getBackgroundColor());
    this.renderer.appendChild(svg, this.exportService.canvas.nativeElement.cloneNode(true));
    this.renderer.appendChild(svg, this.viewChildService.defs.nativeElement);
    const blob = new Blob([svg.outerHTML], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  click() {
    if (this.selectedFormat !== 'svg') {
      this.exportService.download(this.selectedFormat, this.fileName);
    }
  }

}
