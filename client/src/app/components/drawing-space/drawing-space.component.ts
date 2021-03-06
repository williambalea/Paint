import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { ColorService } from 'src/app/services/color/color.service';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { CursorService } from 'src/app/services/cursor.service';
import { EraserService } from 'src/app/services/eraser/eraser.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { IncludingBoxService } from 'src/app/services/includingBox/including-box.service';
import { InputService } from 'src/app/services/input.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
import { NoShapeService } from 'src/app/services/shapes/no-shape.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { ScreenshotService } from 'src/app/services/shapes/screenshot.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { UndoRedoAction } from 'src/app/services/undoRedoAction';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { UploadService } from 'src/app/services/upload.service';
import { ViewChildService } from 'src/app/services/view-child.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { ACTIONS, EMPTY_STRING, KEY, NB, STRINGS, TOOL } from '../../../constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';

@Component({
  selector: 'app-drawing-space',
  styleUrls: ['./drawing-space.component.scss'],
  templateUrl: './drawing-space.component.html',
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('g', { static: true }) canvas: ElementRef;
  @ViewChild('svg', { static: false }) drawingBoard: ElementRef;
  @ViewChild('htmlCanvas', { static: false }) htmlCanvas: ElementRef;
  @ViewChild('downloadImage', { static: false }) downloadImage: ElementRef;
  @ViewChild('downloadLink', { static: false }) downloadLink: ElementRef;
  @ViewChild('defs', {static: false}) defs: ElementRef;
  @ViewChild('eraserCountour', {static: false}) eraserCountour: ElementRef;
  @ViewChild('includingBox', {static: false}) includingBox: ElementRef;
  @ViewChild('canvasDiv', {static: false}) canvasDiv: ElementRef;

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
  interval; // TODO: type? -WB
  shape: SVGSVGElement;
  fileUrl: string;

  constructor(private fileParameters: FileParametersServiceService,
              public colorService: ColorService,
              private inputService: InputService,
              private renderer: Renderer2,
              private textService: TextService,
              private pipetteService: PipetteService,
              private selectorService: SelectorService,
              private communicationService: CommunicationsService,
              private penService: PenService,
              public cursorService: CursorService,
              private screenshotService: ScreenshotService,
              private unsubscribeService: UnsubscribeService,
              public includingBoxService: IncludingBoxService,
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
    this.viewChildService.defs = this.defs;
    this.viewChildService.htmlCanvas = this.htmlCanvas;
    this.viewChildService.eraserCountour = this.eraserCountour;
    this.viewChildService.includingBox = this.includingBox;
    this.viewChildService.canvasDiv = this.canvasDiv;
  }

  ngAfterViewInit(): void {
    this.initializeViewChildren();

    this.eventEmitterService.uploadEmitter.subscribe(() => {
      this.click();
      this.inputService.isDrawed = true;
      this.uploadService.enableUploadButton = false;
      this.uploadService.fileContent = EMPTY_STRING;
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
  }

  // TODO: What is that name function??? -WB
  click(): void {
    for (const child of this.canvas.nativeElement.children) {
      this.renderer.removeChild(this.canvas, child);
    }
    this.canvas.nativeElement.insertAdjacentHTML('beforeend', this.uploadService.g);
    this.renderer.setAttribute(this.drawingBoard.nativeElement, 'width', this.uploadService.width);
    this.renderer.setAttribute(this.drawingBoard.nativeElement, 'height', this.uploadService.height);
    this.renderer.setStyle(this.drawingBoard.nativeElement, 'background-color', this.uploadService.backgroundColor);
    this.uploadService.backgroundColor = EMPTY_STRING;
    this.uploadService.height = EMPTY_STRING;
    this.uploadService.width = EMPTY_STRING;
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
      color: this.colorService.getBackgroundColor(),
      html,
      name: nom,
      tags: tag,
      thumbnail: picture,
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
      let shape = event.target as SVGGraphicsElement;
      if (shape.id === 'pen') {
        shape = shape.parentElement as unknown as SVGGraphicsElement;
      }

      const oldColor: string = (shape.tagName === 'path' || shape.tagName === 'g') ?
        shape.getAttribute('stroke') as string :
        shape.getAttribute('fill') as string;

      const changeFill: UndoRedoAction = { action: ACTIONS.changeColor, shape, oldColor };
      this.changeFillColor(event.target as HTMLElement);
      this.undoRedoService.addAction(changeFill);
      this.undoRedoService.undoIsStarted = false;
    }
  }

  onRightClick(event: Event): void {
    if (this.notCanvasAndColorApplicator(event)) {
      const targetTag: string = (event.target as HTMLElement).tagName;
      if (this.isComplexShape(targetTag)) {
        this.renderer.setAttribute(event.target, 'stroke', this.colorService.getStrokeColor());
      }
    }
  }

  changeFillColor(target: HTMLElement): void {
    const targetTag: string = target.tagName;
    if (this.isComplexShape(targetTag)) {
      this.renderer.setAttribute(target, 'fill', this.colorService.getFillColor());
    } else if (targetTag === 'path') {
      if ((target as HTMLElement).id === 'pen') {
        const penElements = ((target as HTMLElement).parentElement as unknown as SVGGraphicsElement);
        this.renderer.setAttribute(penElements, 'stroke', this.colorService.getFillColor());
      } else {
        this.renderer.setAttribute(target, 'stroke', this.colorService.getFillColor());
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
      const target = event.target as SVGGraphicsElement;
      if (this.selectorAreaActive) {
        if (event.button === NB.Zero) {
          if ((event.target as HTMLElement).id === 'pen') {
            this.selectorService.selectedShapes.push((event.target as HTMLElement).parentElement as unknown as SVGGraphicsElement);
          } else if ((event.target as HTMLElement).tagName === 'tspan') {
            this.selectorService.selectedShapes.push((event.target as HTMLElement).parentElement as unknown as SVGGraphicsElement);
          } else if ((event.target as HTMLElement) === this.drawingBoard.nativeElement) {
            this.selectorService.selectedShapes = [];
          } else {
            this.selectorService.selectedShapes.push(event.target as SVGGraphicsElement);
          }
        } else if (event.button === NB.Two) {
          const index = this.selectorService.selectedShapes.indexOf(event.target as SVGGraphicsElement);
          if (index !== -NB.One) {
            this.selectorService.selectedShapes.splice(index, NB.One);
          } else if (target.tagName !== 'svg') {
            this.selectorService.selectedShapes.push(target);
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
      this.inputService.setMouseOffset(event, this.drawingBoard.nativeElement, this.selectedTool);
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
      if (this.eraserService.eraseMouseDown) {
        this.eraserService.eraseShapes();
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.selectedTool === TOOL.pen) {
      this.penService.onMouseUp();
    }
    if (this.selectedTool !== TOOL.colorApplicator) {
      this.selectedShape.onMouseUp();
    }
    if (this.selectedTool === TOOL.selector) {
      this.renderer.removeChild(this.canvas.nativeElement, this.shape);
      this.clipboardService.cloningPosition = {
        x: this.includingBoxService.boxUpperLeft.x - 1,
        y: this.includingBoxService.boxUpperLeft.y - 1,
      };
      this.clipboardService.newSelection = true;
    }
    if (this.selectedTool === TOOL.eraser) {
      this.eraserService.eraseMouseDown = false;
      this.eraserService.eraseShapes();
      setInterval(() => {
        this.eraserService.intersect();
      }, Math.pow(1, Number.MIN_SAFE_INTEGER));
      this.eraserService.sendToUndoRedo();
    }

    this.inputService.isDrawed = true;
    this.selectorAreaActive = false;
    if (this.selectedShape !== this.noShapeService) {
      const undoRedoAction: UndoRedoAction = {
        action: ACTIONS.append,
        shape: this.shape,
      };

      if (this.undoRedoService.undoIsStarted) {
        this.undoRedoService.poppedActions = [];
      }
      if (this.selectedTool !== TOOL.line && this.selectedTool !== TOOL.selector) {
        const shapeIsNotNull: boolean = this.shape.getBBox().width !== 0;
        shapeIsNotNull ? this.undoRedoService.addAction(undoRedoAction) : this.renderer.removeChild(this.canvas, this.shape);
      }
    }
    this.undoRedoService.undoIsStarted = false;
    clearInterval(this.interval);
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
    if (this.selectedTool !== TOOL.eraser) {
      this.eraserService.cursor.remove();
    } else {
      this.eraserService.updatePosition(this.eraserService.cursor);
    }
    if (this.selectedTool === TOOL.text && this.textService.isWriting) {
      event.preventDefault();
      if (event.key.length === 1 && this.textService.isWriting) {
        this.textService.textContent += event.key;
        this.textService.update();
        this.textService.enterLineMultiplier = NB.One;
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
      event.preventDefault();
      this.inputService.shiftPressed = true;
      if (this.selectedTool === TOOL.line) {
        this.selectedShape.onMouseMove();
        this.selectedShape.onMouseUp();
      }
    }
    if (event.key === KEY.alt) {
      this.inputService.altPressed = true;
      event.preventDefault();
    }
    if (event.key === KEY.escape) {
      this.inputService.escapePressed = true;
      if (this.selectedTool === TOOL.line) {
        if (!this.shape) {
          return;
        }
        this.renderer.removeChild(this.canvas.nativeElement, this.shape, true);
        (this.shape as any) = undefined;
      }
    }
    if (event.key === KEY.backspace) {
      this.inputService.backSpacePressed = true;
      this.selectedShape.onMouseMove();
    }
    if (event.key === KEY.control) {
      this.inputService.controlPressed = true;
    }
    if (event.key === KEY.c) {
      if (this.inputService.controlPressed && this.selectorService.selectedShapes.length > 0) {
        this.clipboardService.controlC();
      }
    }
    if (event.key === KEY.x && this.selectorService.selectedShapes.length > 0) {
      if (this.inputService.controlPressed) {
        this.clipboardService.controlX();
        this.includingBoxService.update();
      }
    }
    if (event.key === KEY.a) {
      if (this.inputService.controlPressed) {
        event.preventDefault();
        this.eventEmitterService.assignSelectedTool();
        this.clipboardService.controlA();
        this.includingBoxService.update();
      }
    }
    if (event.key === KEY.delete) {
      this.clipboardService.delete();
      this.includingBoxService.update();
    }
    if (event.key === KEY.d) {
      if (this.inputService.controlPressed) {
        event.preventDefault();
      }
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
    if (event.key === KEY.d) {
      if (this.inputService.controlPressed) {
        this.clipboardService.controlD();
      }
    }
    if (event.key === KEY.v) {
      if (this.inputService.controlPressed) {
        this.clipboardService.controlV();
      }
    }
  }
}
