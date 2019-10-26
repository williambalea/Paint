import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { ColorService } from 'src/app/services/color/color.service';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EraserService } from 'src/app/services/eraser/eraser.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { IncludingBoxService } from 'src/app/services/includingBox/including-box.service';
import { InputService } from 'src/app/services/input.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
import { ScreenshotService } from 'src/app/services/shapes/screenshot.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { EMPTY_STRING, KEY, NB, STRINGS, TOOL } from '../../../constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';
@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('g', { static: false }) canvas: ElementRef;
  @ViewChild('v', { static: false }) canvasOffset: ElementRef;
  @ViewChild('svg', { static: false }) drawingBoard: ElementRef;
  @ViewChild('htmlCanvas', { static: false }) htmlCanvas: ElementRef;
  @ViewChild('includingBox', { static: false }) includingBox: ElementRef;
  @Input() selectedTool: TOOL;
  @Input() selectedShape: Shape;
  tool: typeof TOOL;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  shape: SVGSVGElement;
  selectorAreaActive: boolean;
  elementV: HTMLElement;

  constructor(private fileParameters: FileParametersServiceService,
              private colorService: ColorService,
              private inputService: InputService,
              private renderer: Renderer2,
              private pipetteService: PipetteService,
              private selectorService: SelectorService,
              private communicationService: CommunicationsService,
              private gridService: GridService,
              private screenshotService: ScreenshotService,
              private unsubscribeService: UnsubscribeService,
              private includingBoxService: IncludingBoxService,
              private eventEmitterService: EventEmitterService,
              private eraserService: EraserService,
              private clipboardService: ClipboardService) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.selectorAreaActive = false;
    this.elementV = this.renderer.createElement('v', 'svg');
  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  ngAfterViewInit(): void {
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
    this.eventEmitterService.clearCanvasEmitter.subscribe(() => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.canvas.nativeElement.children.length; i++) {
        this.renderer.removeChild(this.canvas, this.canvas.nativeElement.children[i]);
      }
      this.inputService.isDrawed = false;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeService.onDestroy();
  }

  setCanvasParameters(): void {
    this.unsubscribeService.subscriptons.push(this.fileParameters.canvaswidth$
      .subscribe((canvasWidth) => this.canvasWidth = canvasWidth));
    this.unsubscribeService.subscriptons.push(this.fileParameters.canvasheight$
      .subscribe((canvasHeight) => this.canvasHeight = canvasHeight));
    this.unsubscribeService.subscriptons.push(this.fileParameters.resizeflag$
      .subscribe((resizeFlag) => this.resizeFlag = resizeFlag));
  }

  hideGrid(): void {
    this.renderer.removeChild(this.drawingBoard.nativeElement, this.gridService.elementG);
  }

  showGrid(): void {
    this.renderer.removeChild(this.drawingBoard.nativeElement, this.gridService.elementG);
    this.gridService.draw(this.gridService.gridSize);
    this.renderer.appendChild(this.drawingBoard.nativeElement, this.gridService.elementG);
  }

  // controlV(): void {
  //   for (const item of this.clipboardService.selectedItems) {
  //     this.renderer.appendChild(this.canvas.nativeElement, item);
  //   }
  // }

  // Test controlV() pour ajouter un decalage a la selection:
  controlV(): void {
    // for (const item of this.clipboardService.selectedItems) {
    //   this.renderer.appendChild(this.canvas.nativeElement, item);
    // }
    this.addOffSet();
  }

  addOffSet(): void {
    this.elementV = this.renderer.createElement('v', 'svg');
    for (let i = 0; i < this.clipboardService.selectedItems.length; i++) {
      this.renderer.setAttribute(this.clipboardService.selectedItems[i], 'x', '500');
      this.renderer.setAttribute(this.clipboardService.selectedItems[i], 'y', '500');
      this.renderer.setAttribute(this.clipboardService.selectedItems[i], 'height', '100');
      this.renderer.setAttribute(this.clipboardService.selectedItems[i], 'width', '100');
      this.renderer.setStyle(this.clipboardService.selectedItems[i], 'fill', 'red');
      this.renderer.appendChild(this.canvas.nativeElement, this.clipboardService.selectedItems[i]);
    }
  }

  controlX(): void {
    this.clipboardService.getElement();
    for (let i = 0; i < this.clipboardService.selectedItems.length; i++) {
      if (this.clipboardService.selectedItems[i].id !== 'canvas') {
        this.renderer.removeChild(this.canvas.nativeElement, this.clipboardService.selectedItems[i]);
      }
    }
    this.includingBoxService.clear();
  }

  controlA(): void {
    this.clipboardService.selectedItems = this.canvas.nativeElement;
    console.log(this.clipboardService.selectedItems);
  }

  draw(shape: any): void {
    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.pipette) {
      if (shape) {
        this.renderer.appendChild(this.canvas.nativeElement, shape);
      }
      this.inputService.isBlank = false;
      this.colorService.setMakingColorChanges(false);
    }
  }

  convertSVGtoJSON(): void {
    const nom = this.inputService.drawingName;
    const tag = this.inputService.drawingTags;
    const picture = this.screenshotService.screenshotBase64(this.drawingBoard.nativeElement);
    const element = this.canvas.nativeElement;
    const html = element.innerHTML;
    const data: SVGJSON = {
      name: nom,
      tags: tag,
      thumbnail: picture,
      html,
      color: this.colorService.getBackgroundColor(),
    };
    const json = JSON.stringify(data);
    this.communicationService.HTML = json;
    this.communicationService.postToServer(data).subscribe(() => {
      this.communicationService.enableSubmit = true;
    }, (error) => {
      window.alert(STRINGS.cantSaveToServer);
      this.communicationService.enableSubmit = true;
    });
  }

  notCanvasAndColorApplicator(event: Event): boolean {
    return event.target !== this.drawingBoard.nativeElement && this.selectedTool === TOOL.colorApplicator;
  }

  isComplexShape(targetTag: string): boolean {
    return (targetTag === 'rect' || targetTag === 'polygon' || targetTag === 'ellipse');
  }

  onLeftClick(event: Event): void {
    if (this.notCanvasAndColorApplicator(event)) {
      this.changeFillColor(event.target as HTMLElement);
    }
  }

  onRightClick(event: Event): void {
    if (this.notCanvasAndColorApplicator(event)) {
      const targetTag: string = (event.target as HTMLElement).tagName;
      if (this.isComplexShape(targetTag)) {
        this.renderer.setStyle(event.target, 'stroke', this.colorService.getStrokeColor());
      }
    }
  }

  changeFillColor(target: HTMLElement): void {
    const targetTag: string = target.tagName;
    if (this.isComplexShape(targetTag)) {
      this.renderer.setStyle(target, 'fill', this.colorService.getFillColor());
    } else if (targetTag === 'path') {
      this.renderer.setStyle(target, 'stroke', this.colorService.getFillColor());
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent): void {
    this.eraserService.erase(event.target as EventTarget, this.drawingBoard.nativeElement);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.selectedTool !== TOOL.colorApplicator) {
      this.inputService.setMouseOffset(event);
      this.selectedShape.onMouseMove();
    }
    if (this.selectedTool === TOOL.selector) {
      if (this.selectorAreaActive) {
        this.selectorService.intersection(this.shape, this.canvas);
        this.includingBoxService.update();
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.selectedTool !== TOOL.colorApplicator) {
      this.selectedShape.onMouseUp();
    }
    if (this.selectedTool === TOOL.selector) {
      this.renderer.removeChild(this.canvas.nativeElement, this.shape);
    }
    if (this.selectedTool === TOOL.eraser) {
      this.eraserService.erase(event.target as EventTarget, this.drawingBoard.nativeElement);
      this.eraserService.eraseMouseDown = false;
    }
    this.inputService.isDrawed = true;
    this.selectorAreaActive = false;
  }

  @HostListener('wheel', ['$event'])
  onwheel(event: WheelEvent): void {
    if (this.selectedTool === TOOL.stamp) {
      event.preventDefault();
      this.inputService.changeStampAngle(Math.sign(event.deltaY));
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = true;
      this.selectedShape.onMouseMove();
      this.selectedShape.onMouseUp();
      event.preventDefault();
    }
    if (event.key === KEY.alt) {
      this.inputService.altPressed = true;
      event.preventDefault();
    }
    if (event.key === KEY.escape) {
      this.inputService.escapePressed = true;
      this.renderer.removeChild(this.canvas.nativeElement, this.shape);
    }
    if (event.key === KEY.backspace) {
      this.inputService.backSpacePressed = true;
      this.selectedShape.onMouseMove();
    }
    if (event.key === KEY.control) {
      this.inputService.controlPressed = true;
    }
    if (event.key === KEY.c) {
      if (this.inputService.controlPressed === true) {
        this.inputService.cPressed = true;
        console.log('Control-C the clipboards content');
        this.clipboardService.getElement();
      }
    }
    if (event.key === KEY.x) {
      if (this.inputService.controlPressed === true) {
        this.inputService.xPressed = true;
        console.log('Control-X the clipboards content');
        this.clipboardService.getElement();
        this.controlX();
      }
    }
    if (event.key === KEY.v) {
      if (this.inputService.controlPressed === true) {
        this.inputService.vPressed = true;
        console.log('Control-V the clipboards content');
        this.controlV();
      }
    }
    if (event.key === KEY.a) {
      if (this.inputService.controlPressed === true) {
        this.inputService.aPressed = true;
        console.log('Control-A all the drawingBoard elements');
        this.controlA();
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = false;
      this.selectedShape.onMouseMove();
      this.selectedShape.onMouseUp();
    }
    if (event.key === KEY.escape) {
      this.selectedShape.onMouseUp();
      this.inputService.escapePressed = false;
    }
    if (event.key === KEY.backspace) {
      this.inputService.backSpacePressed = false;
      this.selectedShape.onMouseMove();
    }
    if (event.key === KEY.alt) {
      this.inputService.altPressed = false;
    }
    if (event.key === KEY.control) {
      this.inputService.controlPressed = false;
    }
    if (event.key === KEY.c) {
      this.inputService.cPressed = false;
    }
    if (event.key === KEY.x) {
      this.inputService.xPressed = false;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.inputService.mouseButton = event.button;
    if (event.button === 0) {
      this.selectorService.selectedShapes = [];
    }
    if (this.selectedTool === TOOL.pipette) {
      event.preventDefault();
      this.pipetteService.getColors(event, this.htmlCanvas, this.drawingBoard, this.canvasHeight, this.canvasWidth);
    }
    if (this.selectedTool === TOOL.eraser) {
      this.eraserService.eraseMouseDown = true;
    }
    this.shape = this.selectedShape.onMouseDown();
    this.draw(this.shape);
    this.inputService.isNotEmpty = true;
    this.selectorAreaActive = true;
    if (this.selectedTool === TOOL.selector) {
          if (this.selectorAreaActive) {
            if (event.button === NB.Zero) {
              this.selectorService.selectedShapes.push(event.target as SVGGraphicsElement);
            } else if (event.button === NB.Two) {
              const index = this.selectorService.selectedShapes.indexOf(event.target as SVGGraphicsElement);
              if (index !== -NB.One) {
                this.selectorService.selectedShapes.splice(index, NB.One);
              }
            }
            this.includingBoxService.update();
          }
        }
      }
}
