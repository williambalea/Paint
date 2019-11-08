import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY_STRING, NB, STRINGS } from 'src/constants';
import { ColorService } from '../services/color/color.service';
import { ExportService } from '../services/export.service';
import { FileParametersServiceService } from '../services/file-parameters-service.service';
import { InputService } from '../services/input.service';
import { ScreenshotService } from '../services/shapes/screenshot.service';
import { ViewChildService } from '../services/view-child.service';
import { CanvasToBMP } from './canvasToBMP';

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
  fileUrl; // TODO type -WB
  fileUrl2;
  downloadLink: ElementRef;
  image: any;

  constructor(private exportService: ExportService,
              private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private screenshotService: ScreenshotService,
              private inputService: InputService,
              private colorService: ColorService,
              private viewChildService: ViewChildService,
              private fileParameterService: FileParametersServiceService) {
    this.formats = ['jpeg', 'png', 'bmp', 'svg'];
    this.selectedFormat = EMPTY_STRING;
    this.name = EMPTY_STRING;
    this.fileName = EMPTY_STRING;
    this.inputService.gridShortcutsActive = false;
    this.downloadLink = this.viewChildService.downloadLink;
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
    this.convertSvgToCanvas();
    const canvasToBMP: CanvasToBMP = new CanvasToBMP();
    const blobUrl = canvasToBMP.toDataURL(this.viewChildService.htmlCanvas.nativeElement);
    this.fileUrl2 = blobUrl;
    console.log(this.fileUrl2);
  }

  convertSvgToCanvas() {
    const canvas: HTMLCanvasElement = this.viewChildService.htmlCanvas.nativeElement;
    canvas.height = this.fileParameterService.canvasHeight.getValue();
    canvas.width = this.fileParameterService.canvasWidth.getValue();
    const images64: string = this.screenshotService.screenshotBase64(this.viewChildService.drawingBoard.nativeElement);
    const image = new Image();
    image.src = images64;
    image.onload = () => {
      (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, NB.Zero, NB.Zero, canvas.width, canvas.height);
    };
  }

  click() {
    if (this.selectedFormat !== 'svg' && this.selectedFormat !== 'bmp') {
      this.exportService.download(this.selectedFormat);
    } else if (this.selectedFormat === 'bmp') {
      this.convertSvgToCanvas();
      const canvasToBMP: CanvasToBMP = new CanvasToBMP();
      console.log(canvasToBMP.toDataURL(this.viewChildService.htmlCanvas.nativeElement));
      const blobUrl = canvasToBMP.toDataURL(this.viewChildService.htmlCanvas.nativeElement);
      this.fileUrl2 = blobUrl;
      console.log(this.fileUrl2);
      // this.downloadLink.nativeElement.href = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      // this.downloadLink.nativeElement.download = 'file.' + 'bmp';
      // this.downloadLink.nativeElement.click();
    }
  }

}
