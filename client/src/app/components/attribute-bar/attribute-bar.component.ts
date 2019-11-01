import { Component, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { LineService } from 'src/app/services/shapes/line.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { StampService } from 'src/app/services/shapes/stamp.service';
import { BRUSH, JUNCTIONSTYLE, LINE_PATTERN, LINECORNER, NB, STROKE_DASHARRAY_STYLE, TOOL } from '../../../constants';
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
  linecorner: typeof LINECORNER;
  junctionStyle: typeof JUNCTIONSTYLE;
  lineStyle: typeof LINE_PATTERN;
  dashStyle: typeof STROKE_DASHARRAY_STYLE;
  @Input() selectedTool: TOOL;
  gridSize: number;

  constructor(private colorService: ColorService,
              private rectangleService: RectangleService,
              private penService: PenService,
              private lineService: LineService,
              private brushService: BrushService,
              private gridService: GridService,
              private stampService: StampService,
              private inputService: InputService,
              private ellipseService: EllipseService,
              private polygonService: PolygonService,
              private eventEmitterService: EventEmitterService,
              private eraserService: EraserService,
              private clipboardService: ClipboardService) {
    this.tool = TOOL;
    this.brush = BRUSH;
    this.gridService.gridSize = NB.Fifty;
    this.linecorner = LINECORNER;
    this.lineStyle = LINE_PATTERN;
    this.junctionStyle = JUNCTIONSTYLE;
    this.dashStyle = STROKE_DASHARRAY_STYLE;
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

  controlC(): void {
    this.eventEmitterService.controlC();
  }

  controlX(): void {
    this.eventEmitterService.controlX();
  }

  controlV(): void {
    this.eventEmitterService.controlV();
  }

  controlD(): void {
    this.eventEmitterService.controlD();
  }

  controlA(): void {
    this.eventEmitterService.controlA();
  }

  delete(): void {
    this.eventEmitterService.delete();
  }

  lineJunctionChangeHandler(event: MatRadioChange): void {
    this.lineService.junctionStyle = event.value;
    this.lineService.changeJunction();
  }

  lineStypeRadioChangeHandler(event: MatRadioChange): void {
    this.lineService.dashArrayType = event.value;
    this.lineService.assignStrokeStyle();
  }

  getColorService(): ColorService {
    return this.colorService;
  }

  getPenService(): PenService {
    return this.penService;
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

  getEraserService(): EraserService {
    return this.eraserService;
  }

  getClipboardService(): ClipboardService {
    return this.clipboardService;
  }
}
