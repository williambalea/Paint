import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { EMPTY_STRING, KEY, NB, POINTER_EVENT, STRINGS, TOOL } from '../../../constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
  providers: [GridService],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('g', { static: false }) canvas: ElementRef;
  @ViewChild('svg', { static: false }) drawingBoard: ElementRef;
  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  @Input() selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  pointerEvent: string;
  isConfirmed: boolean;

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
    const svg: SVGSVGElement = document.querySelectorAll('svg')[svgElementsCount - 1] as SVGSVGElement;
    const xml: string = new XMLSerializer().serializeToString(svg as Node);
    const svg64: string = btoa(xml);
    return b64start + svg64;
  }

  usePipette(event: MouseEvent): void {
    const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
    const image: HTMLImageElement = document.querySelectorAll('img')[1] as HTMLImageElement;
    const images64: string = this.screenshotBase64();
    image.src = images64;
    (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, 0, 0);
    const data: Uint8ClampedArray = (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).
    getImageData(event.offsetX, event.offsetY, 1, 1).data;
    if (event.button === 0) {
      this.colorService.setFillColor('rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')');
    }
    if (event.button === 2) {
      this.colorService.setStrokeColor('rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.selectedTool === TOOL.pipette) {
      event.preventDefault();
      this.usePipette(event);
    }
    const shape: any = this.selectedShape.onMouseDown();
    this.draw(shape);
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
        this.communicationService.postToServer(data).subscribe();
  }

  leftClickOnElement(event: Event): void {
    if (event.target !== this.drawingBoard.nativeElement && this.selectedTool === TOOL.colorApplicator) {
      this.changeFillColor(event.target as HTMLElement);
    }
  }

  rightClickOnElement(event: Event): void {
    if (event.target !== this.drawingBoard.nativeElement && this.selectedTool === TOOL.colorApplicator) {
      const targetTag: string = (event.target as HTMLElement).tagName;
      if (targetTag === 'rect' || targetTag === 'polygon' || targetTag === 'ellipse') {
        this.renderer.setStyle(event.target, 'stroke', this.colorService.getStrokeColor());
      }
    }
  }

  changeFillColor(target: HTMLElement): void {
    const targetTag: string = target.tagName;
    if (targetTag === 'rect' || targetTag === 'polygon' || targetTag === 'ellipse') {
        this.renderer.setStyle(target, 'fill', this.colorService.getFillColor());
      } else if (targetTag === 'path') {
        this.renderer.setStyle(target, 'stroke', this.colorService.getFillColor());
      }
  }

}
