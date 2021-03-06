import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY_STRING } from 'src/constants';
import { ColorService } from '../services/color/color.service';
import { FileParametersServiceService } from '../services/file-parameters-service.service';
import { InputService } from '../services/input.service';
import { ViewChildService } from '../services/view-child.service';

@Component({
  selector: 'app-download-modal',
  styleUrls: ['./download-modal.component.scss'],
  templateUrl: './download-modal.component.html',
})
export class DownloadModalComponent implements OnInit, OnDestroy {
  formats: string[];
  selectedFormat: string;
  name: string;
  fileName: string;
  fileUrl: any;

  constructor(private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService,
              private viewChildService: ViewChildService,
              private fileParameterService: FileParametersServiceService) {
    this.selectedFormat = 'svg';
    this.name = EMPTY_STRING;
    this.fileName = EMPTY_STRING;
    this.inputService.gridShortcutsActive = false;
  }

  ngOnDestroy() {
    this.inputService.gridShortcutsActive = true;
  }

  ngOnInit() {
    const svg = this.renderer.createElement('svg');
    this.setAttributeSVG(svg);
    this.renderer.setStyle(svg, 'backgroundColor', this.colorService.getBackgroundColor());
    this.renderer.setAttribute(svg, 'width', this.fileParameterService.canvasWidth.getValue().toString());
    this.renderer.setAttribute(svg, 'height', this.fileParameterService.canvasHeight.getValue().toString());
    this.renderer.appendChild(svg, this.viewChildService.canvas.nativeElement.cloneNode(true));
    this.renderer.appendChild(svg, this.viewChildService.defs.nativeElement);
    const blob = new Blob([svg.outerHTML], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  setAttributeSVG(svg: SVGGraphicsElement): void {
    this.renderer.setAttribute(svg, 'viewBox', `0 0 ${this.viewChildService.canvas.nativeElement.width}
    ${this.viewChildService.canvas.nativeElement.height}`);
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
  }
}
