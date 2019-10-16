import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { KEY, NB, POINTER_EVENT, STRINGS, TOOL, EMPTY_STRING } from '../../../constants';

import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
  providers: [GridService],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('drawingBoard', { static: false }) drawingBoard: ElementRef;
  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  @Input() selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  firstClick: boolean;
  pointerEvent: string;

  constructor(private fileParameters: FileParametersServiceService,
              private colorService: ColorService,
              private inputService: InputService,
              private renderer: Renderer2,
              private communicationService: CommunicationsService,
              private gridService: GridService,
              private unsubscribeService: UnsubscribeService,
              private eventEmitterService: EventEmitterService) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.firstClick = true;
    this.pointerEvent = POINTER_EVENT.visiblePainted;
  }

  setCanvasParameters(): void {
    this.unsubscribeService.subscriptons.push(this.fileParameters.canvaswidth$
      .subscribe((canvasWidth) => this.canvasWidth = canvasWidth));

    this.unsubscribeService.subscriptons.push(this.fileParameters.canvasheight$
      .subscribe((canvasHeight) => this.canvasHeight = canvasHeight));

    this.unsubscribeService.subscriptons.push(this.fileParameters.resizeflag$
      .subscribe((resizeFlag) => this.resizeFlag = resizeFlag));
  }

  ngOnInit(): void {
    this.setCanvasParameters();
    this.gridService.setGridParameters();

  }
  ngAfterViewInit() {
    this.eventEmitterService.showGridEmitter.subscribe(() => {
      this.showGrid();
    });

    this.eventEmitterService.hideGridEmitter.subscribe(() => {
      this.hideGrid();
    });

    this.eventEmitterService.sendSVGToServerEmitter.subscribe(() => {
      this.convertSVGtoJSON();
    });

    this.eventEmitterService.appendToDrawingSpaceEmitter.subscribe(() => {
      // avant
      // this.renderer.setProperty(this.canvas.nativeElement, 'innerHTML', this.inputService.drawingHtml);
      // --avant

      this.canvas.nativeElement.innerHTML = EMPTY_STRING;
      this.canvas.nativeElement.insertAdjacentHTML('beforeend', this.inputService.drawingHtml);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeService.onDestroy();
  }

  hideGrid() {
    this.gridService.buildGrid();
    this.gridService.draw().forEach((element: HTMLElement) => {
      this.renderer.removeChild(this.canvas.nativeElement, element);
    });
  }

  showGrid(): void {
    this.gridService.buildGrid();
    this.gridService.draw().forEach((element: HTMLElement) => {
      this.renderer.appendChild(this.drawingBoard.nativeElement, element);
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = true;
      this.selectedShape.onMouseMove();
      event.preventDefault();
    }

    if (event.key === KEY.alt) {
      this.inputService.altPressed = true;
      event.preventDefault();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = false;
      this.selectedShape.onMouseMove();
    }

    if (event.key === KEY.alt) {
      this.inputService.altPressed = false;
    }
  }

  changeFillColor(shape: any): void {
    if (this.selectedTool === TOOL.colorApplicator) {
      this.renderer.setStyle(shape, 'fill', this.colorService.getFillColor());
    }
  }

  changeStrokeColor(shape: any, color: string): void {
    if (this.selectedTool === TOOL.colorApplicator) {
      this.renderer.setStyle(shape, 'stroke', color);
    }
  }

  setElementColor(event: MouseEvent, primaryColor: string, secondaryColor?: string): void {
    if (event.button === 0) {
      this.colorService.setFillColor(primaryColor);
    }
    if (event.button === 2 && secondaryColor) {
      this.colorService.setStrokeColor(secondaryColor);
    }
  }

  screenshotBase64(): string {
    const svgElementsCount: number = document.querySelectorAll('svg').length;
    const b64start = 'data:image/svg+xml;base64,';
    const images: string[] = [];
    for (let i = 0; i < svgElementsCount; i++) {
      const svg: SVGSVGElement = document.querySelectorAll('svg')[i] as SVGSVGElement;
      const xml: string = new XMLSerializer().serializeToString(svg as Node);
      const svg64: string = btoa(xml);
      images.push(b64start + svg64);
    }
    return images[1];
  }

  getSvgLayersImage(): string {
    const svgElementsCount: number = document.querySelectorAll('svg').length;
    const b64start = 'data:image/svg+xml;base64,';
    const images: string[] = [];
    for (let i = 0; i < svgElementsCount; i++) {
      const svg: SVGSVGElement = document.querySelectorAll('svg')[i] as SVGSVGElement;
      const xml: string = new XMLSerializer().serializeToString(svg as Node);
      const svg64: string = btoa(xml);
      images.push(b64start + svg64);
    }
    return images[0];
  }

  usePipette(event: MouseEvent): void {
    const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
    const image: HTMLImageElement = document.querySelectorAll('img')[1] as HTMLImageElement;
    const images64: string = this.getSvgLayersImage();
    image.src = images64;
    (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, 0, 0);
    const data: Uint8ClampedArray = (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).
      getImageData(event.offsetX, event.offsetY, 1, 1).data;
    if (event.button === 0 && !this.firstClick) {
      this.colorService.setFillColor('rgba(' + data[0].toString() + ',' + data[1].toString() + ',' + data[2] + ',' + data[3] + ')');
    }
    if (event.button === 2 && !this.firstClick) {
      this.colorService.setStrokeColor('rgba(' + data[0].toString() + ',' + data[1].toString() + ',' + data[2] + ',' + data[3] + ')');
    }
    this.firstClick = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.selectedTool === TOOL.pipette) {
      event.preventDefault();
      this.usePipette(event);
    }
    const shape: any = this.selectedShape.onMouseDown();
    this.setEventListeners(shape);
    this.draw(shape);
  }

  usingComplexShape(): boolean {
    return this.selectedTool === TOOL.rectangle || this.selectedTool === TOOL.ellipse || this.selectedTool === TOOL.polygon;
  }

  usingSimpleShape(): boolean {
    return this.selectedTool === TOOL.brush || this.selectedTool === TOOL.pen;
  }

  setEventListeners(shape: any): void {
    if (this.usingComplexShape()) {
      this.renderer.listen(shape, 'click', () => {
        this.changeFillColor(shape);
        console.log(shape);
      });
      this.renderer.listen(shape, 'contextmenu', () => {
        this.changeStrokeColor(shape, this.colorService.getStrokeColor());
      });
    }

    if (this.usingSimpleShape()) {
      this.renderer.listen(shape, 'click', () => {
        this.changeStrokeColor(shape, this.colorService.getFillColor());
      });
    }
  }

  draw(shape: any): void {
    if (this.selectedTool !== TOOL.colorApplicator &&
        this.selectedTool !== TOOL.pipette &&
        this.selectedTool !== TOOL.selector) {
      if (shape) {
        this.renderer.appendChild(this.canvas.nativeElement, shape);
      }
      this.inputService.isBlank = false;
      this.colorService.setMakingColorChanges(false);
      this.pointerEvent = POINTER_EVENT.none;
    }

  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.selector) {

      this.inputService.setMouseOffset(event);
      this.selectedShape.onMouseMove();
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.selector) {

      this.selectedShape.onMouseUp();
      this.pointerEvent = POINTER_EVENT.visiblePainted;
    }

  }

  @HostListener('wheel', ['$event'])
  onwheel(event: WheelEvent): void {
    if (this.selectedTool === TOOL.stamp) {
      event.preventDefault();
      this.inputService.changeStampAngle(Math.sign(event.deltaY));
    }
  }

  convertSVGtoJSON(): void {
        const nom = this.inputService.drawingName;
        const tag = this.inputService.drawingTags;
        const picture = this.screenshotBase64();
        console.log(picture);
        const element = this.canvas.nativeElement;
        const html = element.innerHTML;
        const data: SVGJSON = {
          name : nom,
          tags: tag,
          thumbnail : picture,
          html,
        };

        const json = JSON.stringify(data);

        this.communicationService.HTML = json;
        this.communicationService.postToServer(data).subscribe((response: any ) => { });
  }

}
