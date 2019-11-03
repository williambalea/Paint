import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { ColorService } from 'src/app/services/color/color.service';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { CursorService } from 'src/app/services/cursor.service';
import { EraserService } from 'src/app/services/eraser/eraser.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { IncludingBoxService } from 'src/app/services/includingBox/including-box.service';
import { InputService } from 'src/app/services/input.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
import { NoShapeService } from 'src/app/services/shapes/no-shape.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { ScreenshotService } from 'src/app/services/shapes/screenshot.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { UndoRedoAction} from 'src/app/services/undoRedoAction';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { UploadService } from 'src/app/services/upload.service';
import { ViewChildService } from 'src/app/services/view-child.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { ACTIONS, EMPTY_STRING, KEY, NB, STRINGS, TOOL } from '../../../constants';
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
  @ViewChild('downloadImage', { static: false }) downloadImage: ElementRef;
  @ViewChild('downloadLink', { static: false }) downloadLink: ElementRef;

  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  @Input() selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  // shape: SVGSVGElement;
  selectorAreaActive: boolean;
  g: SVGGraphicsElement;
  interval;
  shape: SVGSVGElement;

  constructor(private fileParameters: FileParametersServiceService,
              private colorService: ColorService,
              private inputService: InputService,
              private renderer: Renderer2,
              private textService: TextService,
              private pipetteService: PipetteService,
              private selectorService: SelectorService,
              private communicationService: CommunicationsService,
              private gridService: GridService,
              private penService: PenService,
              protected cursorService: CursorService,
              private screenshotService: ScreenshotService,
              private unsubscribeService: UnsubscribeService,
              private includingBoxService: IncludingBoxService,
              private eventEmitterService: EventEmitterService,
              private undoRedoService: UndoRedoService,
              private noShapeService: NoShapeService,
              private uploadService: UploadService,
              private eraserService: EraserService,
              private viewChildService: ViewChildService,
              private clipboardService: ClipboardService) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.selectorAreaActive = false;
  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  initializeViewChildren(): void {
    this.viewChildService.drawingBoard = this.drawingBoard;
    this.viewChildService.canvas = this.canvas;
    this.viewChildService.downloadImage = this.downloadImage;
    this.viewChildService.downloadLink = this.downloadLink;
  }

  ngAfterViewInit(): void {
    this.initializeViewChildren();

    this.eventEmitterService.uploadEmitter.subscribe(() => {
      this.click();
      this.inputService.isDrawed = true;
      this.uploadService.enableUploadButton = false;
      this.uploadService.fileContent = EMPTY_STRING;
    });

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
      for (const child of this.canvas.nativeElement.children) {
        this.renderer.removeChild(this.canvas, child);
      }
      this.inputService.isDrawed = false;
    });

    this.undoRedoService.canvas = this.canvas;
  }

  // TODO: What is that name function??? -WB
 click(): void {
  for (const child of this.canvas.nativeElement.children) {
    this.renderer.removeChild(this.canvas, child);
  }
  this.canvas.nativeElement.insertAdjacentHTML('beforeend', this.uploadService.fileContent);
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

  draw(shape: SVGSVGElement): void {
    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.pipette) {
      if (shape && this.selectedTool !== TOOL.pen) {
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
    this.undoRedoService.poppedActions = [];
    if (this.notCanvasAndColorApplicator(event)) {
      const changeFill: UndoRedoAction = {
        action : ACTIONS.changeColor,
        shape : (event.target as SVGGraphicsElement),
        oldColor : (event.target as SVGGraphicsElement).getAttribute('fill') as string,
      };
      this.changeFillColor(event.target as HTMLElement);
      this.undoRedoService.addAction(changeFill);
      // this.undoRedoService.color= (event.target as SVGGraphicsElement).getAttribute('fill') as string;
      // undoRedoAction.nextColor = (event.target as SVGGraphicsElement).getAttribute('fill') as string;
      this.undoRedoService.undoIsStarted = false;
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
      this.renderer.setAttribute(target, 'fill', this.colorService.getFillColor());
    } else if (targetTag === 'path') {
      if ((target as HTMLElement).id.includes('pen')) {
        const penElements = ((target as HTMLElement).parentNode as HTMLElement).children;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < penElements.length; i++) {
          this.renderer.setStyle(penElements.item(i), 'stroke', this.colorService.getFillColor());
        }
      } else {
        this.renderer.setStyle(target, 'stroke', this.colorService.getFillColor());
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.inputService.mouseButton = event.button;
    this.inputService.isNotEmpty = true;
    this.selectorAreaActive = true;

    if (event.button === 0) {
      this.selectorService.selectedShapes = [];
    }
    if (this.selectedTool === TOOL.pipette) {
      event.preventDefault();
      this.pipetteService.getColors(event, this.htmlCanvas, this.drawingBoard, this.canvasHeight, this.canvasWidth);
    }

    if (this.selectedTool === TOOL.eraser) {
      this.eraserService.eraseMouseDown = true;
      this.eraserService.intersect();
    }

    if (this.selectedTool === TOOL.text) {
      this.textService.onMouseDown();
    }

    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.pipette) {
      this.shape = this.selectedShape.onMouseDown();
      this.inputService.isBlank = false;
      this.colorService.setMakingColorChanges(false);
    }
    if (this.selectedTool === TOOL.selector) {
      if (this.selectorAreaActive) {
        if (event.button === NB.Zero) {
          if ((event.target as HTMLElement).id.includes('pen')) {
            this.selectorService.selectedShapes.push((event.target as HTMLElement).parentElement as unknown as SVGGraphicsElement);
          } else {
            this.selectorService.selectedShapes.push(event.target as SVGGraphicsElement);
          }
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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.penService.getSpeed(event);

    if (this.selectedTool !== TOOL.colorApplicator) {
      this.inputService.setMouseOffset(event, this.drawingBoard.nativeElement);
      this.selectedShape.onMouseMove();
    }
    if (this.selectedTool === TOOL.selector) {
      if (this.selectorAreaActive) {
        event.preventDefault();
        this.selectorService.intersection(this.shape, this.canvas);
        this.includingBoxService.update();
      }
    }
    if (this.selectedTool === TOOL.eraser) {
      this.eraserService.updatePosition(this.eraserService.cursor);
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
      // this.eraserService.erase(event.target as EventTarget, this.drawingBoard.nativeElement);
      this.eraserService.eraseMouseDown = false;
    }

    if (this.selectedTool === TOOL.pen) {
      this.penService.onMouseUp();
    }
    this.inputService.isDrawed = true;
    this.selectorAreaActive = false;
    if (this.selectedShape !== this.noShapeService) {
      const undoRedoAction: UndoRedoAction = {
        action : ACTIONS.append,
        shape : this.shape,
      };

      if (this.undoRedoService.undoIsStarted) {
      this.undoRedoService.poppedActions = [];
    }
      const shapeIsNotNull: boolean = this.shape.getBBox().width !== 0;
      shapeIsNotNull ? this.undoRedoService.addAction(undoRedoAction) : this.renderer.removeChild(this.canvas, this.shape);
    }
    this.undoRedoService.undoIsStarted = false;
    clearInterval(this.interval);
    this.penService.pathGroupIndex++;
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
    if (this.selectedTool === TOOL.text) {
      event.preventDefault();
      if (event.key.length === 1) {
        this.textService.textContent += event.key;
        this.textService.update();
        return;
      } else if (event.key === KEY.backspace) {
        if (this.textService.textContent.length === 0 && this.textService.text.childElementCount > 1) {
          this.textService.lineJumpBack();
        }
        const lastCharPos = this.textService.textContent.length;
        const cuttedContent = this.textService.textContent.substring(NB.Zero, lastCharPos - 1);
        this.textService.textContent = cuttedContent;
        this.textService.update();
      }
      if (event.key === KEY.enter) {
        this.textService.lineJump();
        }
    }
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
        this.clipboardService.controlC();
      }
    }
    if (event.key === KEY.x) {
      if (this.inputService.controlPressed === true) {
        this.clipboardService.controlC();
        this.clipboardService.controlX();
      }
    }
    if (event.key === KEY.v) {
      if (this.inputService.controlPressed === true) {
        this.eventEmitterService.assignSelectedTool();
        this.clipboardService.controlV();
        this.clipboardService.nbIncrements++;
      }
    }
    if (event.key === KEY.a) {
      event.preventDefault();
      if (this.inputService.controlPressed === true) {
        this.eventEmitterService.assignSelectedTool();
        this.clipboardService.controlA();
      }
    }
    if (event.key === KEY.d) {
      event.preventDefault();
      if (this.inputService.controlPressed === true) {
        this.clipboardService.controlD();
      }
    }
    if (event.key === KEY.delete) {
      this.clipboardService.delete();
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    if (this.selectedTool === TOOL.eraser) {
      this.renderer.removeChild(this.drawingBoard.nativeElement, this.eraserService.cursor);
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
  }
}
