import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EMPTY_STRING, NB, STRINGS } from 'src/constants';
import { ColorService } from '../services/color/color.service';
import { FileParametersServiceService } from '../services/file-parameters-service.service';
import { InputService } from '../services/input.service';
import { ScreenshotService } from '../services/shapes/screenshot.service';
import { ViewChildService } from '../services/view-child.service';
import { CanvasToBMP } from './canvasToBMP';

@Component({
  selector: 'app-export-modal',
  styleUrls: ['./export-modal.component.scss'],
  templateUrl: './export-modal.component.html',
})
export class ExportModalComponent implements OnInit, OnDestroy {
  bmpURL: SafeResourceUrl;
  formats: string[];
  selectedFormat: string;
  name: string;
  fileName: string;
  fileUrl: SafeResourceUrl;
  downloadLink: ElementRef;
  image: any;
  @ViewChild('allo', {static: false}) alloChild: ElementRef;

  constructor(private sanitizer: DomSanitizer,
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
    this.renderer.setAttribute(svg, 'viewBox', `0 0 ${this.viewChildService.canvas.nativeElement.width}
    ${this.viewChildService.canvas.nativeElement.height}`);
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'width', this.fileParameterService.canvasWidth.getValue().toString());
    this.renderer.setAttribute(svg, 'height', this.fileParameterService.canvasHeight.getValue().toString());
    this.renderer.setStyle(svg, 'backgroundColor', this.colorService.getBackgroundColor());
    this.renderer.appendChild(svg, this.viewChildService.canvas.nativeElement.cloneNode(true));
    this.renderer.appendChild(svg, this.viewChildService.defs.nativeElement);
    const blob = new Blob([svg.outerHTML], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.convertSvgToCanvas();
  }

  createBMPLink(): void {
    this.screenshotService.screenshotBase64(this.viewChildService.drawingBoard.nativeElement);
    const canvas = this.viewChildService.htmlCanvas.nativeElement as HTMLCanvasElement;
    const canvasToBMP: CanvasToBMP = new CanvasToBMP();
    const newBlob = new Blob([canvasToBMP.toArrayBuffer(canvas)], {type: `image/bmp`});
    this.bmpURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(newBlob));
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

  downloadImage(type: string): void {
    const canvas = this.viewChildService.htmlCanvas.nativeElement as HTMLCanvasElement;
    this.downloadLink.nativeElement.href = canvas.toDataURL(`image/${type}`);
    this.downloadLink.nativeElement.download = `file.${type}`;
    this.downloadLink.nativeElement.click();
  }
}
