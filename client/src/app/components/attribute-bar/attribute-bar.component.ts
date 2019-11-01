import { Component, HostListener, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { LineService } from 'src/app/services/shapes/line.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { PencilService } from 'src/app/services/shapes/pencil.service';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { StampService } from 'src/app/services/shapes/stamp.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { BRUSH, FONTALIGN, FONTS, FONTSIZES, JUNCTIONSTYLE, KEY,
LINE_PATTERN, LINECORNER, NB, STROKE_DASHARRAY_STYLE, TOOL } from '../../../constants';
import { GridService } from '../../services/grid/grid.service';
import { EraserService } from './../../services/eraser/eraser.service';
import { EllipseService } from './../../services/shapes/ellipse.service';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  brush: typeof BRUSH;
  fontAlign: typeof FONTALIGN;
  linecorner: typeof LINECORNER;
  junctionStyle: typeof JUNCTIONSTYLE;
  lineStyle: typeof LINE_PATTERN;
  dashStyle: typeof STROKE_DASHARRAY_STYLE;
  @Input() selectedTool: TOOL;
  gridSize: number;
  fonts: string[];
  fontSizes: number[];
  usingGrid: boolean;

  constructor(private colorService: ColorService,
              private textService: TextService,
              private rectangleService: RectangleService,
              private pencilService: PencilService,
              private penService: PenService,
              private lineService: LineService,
              private brushService: BrushService,
              private gridService: GridService,
              private stampService: StampService,
              private inputService: InputService,
              private ellipseService: EllipseService,
              private polygonService: PolygonService,
              private eventEmitterService: EventEmitterService,
              private undoRedoService: UndoRedoService,
              private eraserService: EraserService,
              private clipboardService: ClipboardService) {
    this.tool = TOOL;
    this.brush = BRUSH;
    this.gridService.gridSize = NB.Fifty;
    this.linecorner = LINECORNER;
    this.lineStyle = LINE_PATTERN;
    this.junctionStyle = JUNCTIONSTYLE;
    this.dashStyle = STROKE_DASHARRAY_STYLE;
    this.fonts = FONTS;
    this.fontSizes = FONTSIZES;
    this.usingGrid = false;
  }

  onGridToggle(): void {
    this.toggleGrid();
  }

  radioChangeHandler(event: MatRadioChange): void {
    if (this.selectedTool === TOOL.rectangle) {
      this.rectangleService.rectangleType = event.value;
      this.rectangleService.assignRectangleType();
    } else if (this.selectedTool === TOOL.ellipse) {
      this.ellipseService.ellipseType = event.value;
      this.ellipseService.assignEllipseType();
    } else if (this.selectedTool === TOOL.polygon) {
      this.polygonService.polygonType = event.value;
      this.polygonService.assignPolygonType();
    }
  }

  brushRadioChangeHandler(event: MatRadioChange): void {
    this.brushService.changeFilter(event.value);
  }

  showGrid(): void {
    this.eventEmitterService.showGrid();
  }

  hideGrid(): void {
    this.eventEmitterService.hideGrid();
  }

  lineJunctionChangeHandler(event: MatRadioChange): void {
    this.lineService.junctionStyle = event.value;
    this.lineService.changeJunction();
  }

  lineStypeRadioChangeHandler(event: MatRadioChange): void {
    this.lineService.dashArrayType = event.value;
    this.lineService.assignStrokeStyle();
  }

  toggleGrid(): void {
    this.usingGrid = !this.usingGrid;
    this.usingGrid ? this.showGrid() : this.hideGrid();
  }

  applyGrid(): void {
    this.usingGrid = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
      switch (event.key) {
        case KEY.g:
          this.toggleGrid();
          break;
        case KEY.plus:
            this.applyGrid();
            this.gridService.setNextGridSize();
            this.showGrid();
            break;
        case KEY.minus:
            this.applyGrid();
            this.gridService.setLastGridSize();
            this.showGrid();
            break;
        default:
      }
  }

  getColorService(): ColorService {
    return this.colorService;
  }

  getPencilService(): PencilService {
    return this.pencilService;
  }

  getBrushService(): BrushService {
    return this.brushService;
  }

  getLineService(): LineService {
    return this.lineService;
  }

  getStampService(): StampService {
    return this.stampService;
  }

  getInputService(): InputService {
    return this.inputService;
  }

  getGridService(): GridService {
    return this.gridService;
  }

  getUndoRedoService(): UndoRedoService {
    return this.undoRedoService;
  }

  getTextService(): TextService {
    return this.textService;
  }

  getEraserService(): EraserService {
    return this.eraserService;
  }

  getClipboardService(): ClipboardService {
    return this.clipboardService;
  }

  getPenService(): PenService {
    return this.penService;
  }
}
