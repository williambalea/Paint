import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import * as svgIntersections from 'svg-intersections';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { EMPTY_STRING, KEY, NB, POINTER_EVENT, STRINGS, TOOL } from '../../../constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';


@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('g', { static: false }) canvas: ElementRef<SVGSVGElement>;
  @ViewChild('svg', { static: false }) drawingBoard: ElementRef<SVGSVGElement>;
  @ViewChild('htmlCanvas', { static: false }) htmlCanvas: ElementRef;
  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  @Input() selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  pointerEvent: string;
  isConfirmed: boolean;
  shape: SVGSVGElement;
  testActive = false;
  selectedShapes: any[];

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
    this.selectedShapes = [];
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

  intersection(): void {
    const intersect = svgIntersections.intersect;
    const shape = svgIntersections.shape;
    const elementsCount: number = this.canvas.nativeElement.children.length;
    let currentShape: any;
    for ( let i = 0; i < elementsCount; i++ ) {
      if (this.shape === this.canvas.nativeElement.children[i]) {
        break;
      }
      switch (this.canvas.nativeElement.children[i].tagName) {
        case 'rect':
          currentShape = shape('rect', {
            x: this.canvas.nativeElement.children[i].getAttribute('x'),
            y: this.canvas.nativeElement.children[i].getAttribute('y'),
            width: this.canvas.nativeElement.children[i].getAttribute('width'),
            height: this.canvas.nativeElement.children[i].getAttribute('height'),
          });
          break;
        case 'ellipse':
          currentShape = shape('ellipse', {
            cx: this.canvas.nativeElement.children[i].getAttribute('cx'),
            cy: this.canvas.nativeElement.children[i].getAttribute('cy'),
            rx: this.canvas.nativeElement.children[i].getAttribute('rx'),
            ry: this.canvas.nativeElement.children[i].getAttribute('ry'),
          });
          break;
        case 'path':
          currentShape = shape('path', {
            d: this.canvas.nativeElement.children[i].getAttribute('d'),
          });
          break;
        case 'polygon':
          currentShape = shape('polygon', {
            points: this.canvas.nativeElement.children[i].getAttribute('points'),
          });
          break;
        case 'image':
          currentShape = shape('rect', {
            x: this.canvas.nativeElement.children[i].getAttribute('x'),
            y: this.canvas.nativeElement.children[i].getAttribute('y'),
            width: this.canvas.nativeElement.children[i].getAttribute('width'),
            height: this.canvas.nativeElement.children[i].getAttribute('height'),
          });
          break;
      }
      const intersections = intersect (
        shape('rect', {
          x: this.shape.x.animVal.value,
          y: this.shape.y.animVal.value,
          width: this.shape.width.animVal.value,
          height: this.shape.height.animVal.value }),
          currentShape,
      );
      if (intersections.points.length !== 0) {
        if (!this.selectedShapes.includes(this.canvas.nativeElement.children[i])) {
          this.selectedShapes.push(this.canvas.nativeElement.children[i]);
          console.log(this.selectedShapes);
        }
      }
    }
  }

  ngOnInit(): void {
    this.setCanvasParameters();
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
      this.renderer.setStyle(this.drawingBoard.nativeElement, 'background-color', this.inputService.drawingColor);
      this.canvas.nativeElement.insertAdjacentHTML('beforeend', this.inputService.drawingHtml);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeService.onDestroy();
  }

  hideGrid() {
    this.renderer.removeChild(this.drawingBoard.nativeElement, this.gridService.elementG);
  }

  showGrid(): void {
    this.renderer.removeChild(this.drawingBoard.nativeElement, this.gridService.elementG);
    this.gridService.draw(this.gridService.gridSize);
    this.renderer.appendChild(this.drawingBoard.nativeElement, this.gridService.elementG);
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
    const b64start = 'data:image/svg+xml;base64,';
    const svg: SVGSVGElement = this.drawingBoard.nativeElement;
    const xml: string = new XMLSerializer().serializeToString(svg as Node);
    const svg64: string = btoa(xml);
    return b64start + svg64;
  }

  usePipette(event: MouseEvent): void {
    const canvas: HTMLCanvasElement = this.htmlCanvas.nativeElement;
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
    const images64: string = this.screenshotBase64();
    const image = new Image();
    image.src = images64;
    image.onload = () => {
      (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
      const data: Uint8ClampedArray = (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).
        getImageData(event.offsetX, event.offsetY, 1, 1).data;
      if (event.button === 0) {
        this.colorService.setFillColor('rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')');
      }
      if (event.button === 2) {
        this.colorService.setStrokeColor('rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')');
      }
    };
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.selectedShapes = [];
    if (this.selectedTool === TOOL.pipette) {
      event.preventDefault();
      this.usePipette(event);
    }
    this.shape = this.selectedShape.onMouseDown();
    this.draw(this.shape);
    this.inputService.isNotEmpty = true;
    this.testActive = true;
  }

  draw(shape: any): void {
    if (this.selectedTool !== TOOL.colorApplicator &&
      this.selectedTool !== TOOL.pipette) {
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
    if (this.selectedTool !== TOOL.colorApplicator) {
      this.inputService.setMouseOffset(event);
      this.selectedShape.onMouseMove();
    }
    if (this.selectedTool === TOOL.selector) {
      if (this.testActive) {
        this.intersection();
      }
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    if (this.selectedTool !== TOOL.colorApplicator) {

      this.selectedShape.onMouseUp();
      this.pointerEvent = POINTER_EVENT.visiblePainted;
    }
    if (this.selectedTool === TOOL.selector) {
      this.renderer.removeChild(this.canvas.nativeElement, this.shape);
    }

    this.testActive = false;
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
          color: this.colorService.getBackgroundColor()
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
