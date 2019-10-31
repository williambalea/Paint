import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { IncludingBoxService } from 'src/app/services/includingBox/including-box.service';
import { InputService } from 'src/app/services/input.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
import { NoShapeService } from 'src/app/services/shapes/no-shape.service';
import { ScreenshotService } from 'src/app/services/shapes/screenshot.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { UndoRedoAction} from 'src/app/services/undoRedoAction';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { ACTIONS, EMPTY_STRING, KEY, NB, STRINGS, TOOL } from '../../../constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';
import { ExportService } from 'src/app/services/export.service';
import { UploadService } from 'src/app/services/upload.service';



@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('g', { static: false }) canvas: ElementRef;
  @ViewChild('svg', { static: false }) drawingBoard: ElementRef;
  @ViewChild('htmlCanvas', { static: false }) htmlCanvas: ElementRef;
  @ViewChild('includingBox', { static: false }) includingBox: ElementRef;
  @ViewChild('downloadImage',{ static: false }) downloadImage: ElementRef;
  @ViewChild('downloadLink', { static: false }) downloadLink: ElementRef;

  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  @Input() selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  shape: SVGSVGElement;
  selectorAreaActive: boolean;

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
              private undoRedoService: UndoRedoService,
              private noShapeService: NoShapeService,
              private exportService: ExportService,
              private uploadService : UploadService
              ) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.selectorAreaActive = false;

  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  ngAfterViewInit(): void {
    this.exportService.canvas = this.canvas;
    this.exportService.drawingBoard = this.drawingBoard;
    this.exportService.downloadImage = this.downloadImage;
    this.exportService.downloadLink = this.downloadLink;

    this.eventEmitterService.uploadEmitter.subscribe(() => {
      this.click();
      this.inputService.isDrawed = true;
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
 click() :void {
  for (const child of this.canvas.nativeElement.children) {
    this.renderer.removeChild(this.canvas, child);
  }
  this.canvas.nativeElement.insertAdjacentHTML('beforeend', this.uploadService.fileContent);
  // this.renderer.appendChild(this.canvas.nativeElement,'<g _ngcontent-jxo-c5=""><rect _ngcontent-jxo-c0="" fill="rgba(0,0,0,1)" x="126" y="139" width="260" height="146" style="stroke: rgb(255, 255, 255); stroke-width: 7px;"></rect></g>');
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
      const changeFill: UndoRedoAction = {
        action : ACTIONS.changeColor,
        shape : (event.target as SVGGraphicsElement),
        oldColor : (event.target as SVGGraphicsElement).getAttribute('fill') as string,
      };
      if (this.undoRedoService.undoIsStarted) {
        this.undoRedoService.poppedActions = [];
      }
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
      this.renderer.setStyle(target, 'stroke', this.colorService.getFillColor());
    }
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
