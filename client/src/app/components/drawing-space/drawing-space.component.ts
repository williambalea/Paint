import { AfterViewInit, Component,  ElementRef , HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { KEY, NB, POINTER_EVENT, STRINGS, TOOL } from '../../../constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
  providers: [GridService],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  tool: typeof TOOL;
  @Input()selectedTool: TOOL;
  @Input()selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  firstClick: boolean;
  pointerEvent: string;

  constructor( private fileParameters: FileParametersServiceService,
               private colorService: ColorService,
               private inputService: InputService,
               private renderer: Renderer2,
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
          this.renderer.appendChild(this.canvas.nativeElement, element);
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
    const svg: SVGSVGElement = document.querySelector('svg') as SVGSVGElement;
    const xml: string = new XMLSerializer().serializeToString(svg as Node);
    const svg64: string = btoa(xml);
    const b64start = 'data:image/svg+xml;base64,';
    return b64start + svg64;
  }

  usePipette(event: MouseEvent): void {
    const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
    const image: HTMLImageElement = document.querySelectorAll('img')[1] as HTMLImageElement;
    const image64: string = this.screenshotBase64();
    image.src = image64;
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
    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.pipette) {
      this.renderer.appendChild(this.canvas.nativeElement, shape);
      this.inputService.isBlank = false;
      this.colorService.setMakingColorChanges(false);
      this.pointerEvent = POINTER_EVENT.none;
    }

  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.selectedTool !== TOOL.colorApplicator) {

    this.inputService.setMouseOffset(event);
    this.selectedShape.onMouseMove();
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    if (this.selectedTool !== TOOL.colorApplicator) {

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
}
