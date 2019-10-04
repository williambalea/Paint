import { Component,  HostListener , Input, OnInit} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { InputService } from 'src/app/services/input.service';
import { INIT_MOVE_BRUSH, INIT_MOVE_PEN, KEY, NB, POINTER_EVENT, TOOL } from '../../../constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';
import { ShapesService } from '../../services/shapes/shapes.service';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {
  tool: typeof TOOL;
  @Input()selectedTool: TOOL;
  @Input()selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  pointerEvent: string;

  constructor( private shapeService: ShapesService,
               private fileParameters: FileParametersServiceService,
               private colorService: ColorService,
               private inputService: InputService) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.pointerEvent = POINTER_EVENT.visiblePainted;

  }

  setCanvasParameters(): void {
    this.fileParameters.canvaswidth$
       .subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    this.fileParameters.canvasheight$
       .subscribe((canvasHeight) => this.canvasHeight = canvasHeight);
    this.fileParameters.resizeflag$
       .subscribe((resizeFlag) => this.resizeFlag = resizeFlag);
  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }): void {
    if (!this.resizeFlag) {
    this.width = event.target.innerWidth;
    this.canvasWidth = event.target.innerWidth;
  }}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = true;
      this.selectedShape.onMouseMove();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = false;
      this.selectedShape.onMouseMove();
    }
  }

  // onLeftClick(shape: Shape): void {
  //   if (this.selectedTool === TOOL.colorApplicator) {
  //     const index: number = this.shapeService.shapes.indexOf(shape);
  //     this.shapeService.shapes[index].changePrimaryColor(this.colorService.getFillColor());
  //   }
  // }

  // onRightClick($event: Event, shape: Shape): void {
  //   $event.preventDefault();
  //   if (this.selectedTool === TOOL.colorApplicator) {
  //     const index: number = this.shapeService.shapes.indexOf(shape);
  //     this.shapeService.shapes[index].changeSecondaryColor(this.colorService.getStrokeColor());
  //   }
  // }

  defineShapeColor(): void {
    this.shapeService.fillColor = this.colorService.getFillColor();
    this.shapeService.strokeColor = this.colorService.getStrokeColor();
    this.shapeService.preview.active = true;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {

    this.selectedShape.onMouseDown();

    this.defineShapeColor();
    this.colorService.setMakingColorChanges(false);
    this.assignMouseDownEvent(event);
    if (this.selectedTool !== TOOL.colorApplicator) {
      this.pointerEvent = POINTER_EVENT.none;
    }
  }

  assignMouseDownEvent(event: MouseEvent): void {
    switch (this.selectedTool) {
      case TOOL.brush:
        this.mouseDownBrush(event);
        break;

      case TOOL.pen:
        this.mouseDownPen(event);
        break;

      default:
    }
  }

  mouseDownPen(event: MouseEvent): void {
    this.shapeService.preview.path += `M${event.offsetX} ${event.offsetY} ${INIT_MOVE_PEN}`;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
  }

  mouseDownBrush(event: MouseEvent): void {
    this.shapeService.preview.path += `M${event.offsetX} ${event.offsetY} ${INIT_MOVE_BRUSH}`;
    this.shapeService.preview.filter = `url(#${this.shapeService.brushStyle})`;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {

    this.inputService.setMouseOffset(event);
    this.selectedShape.onMouseMove();

    switch (this.selectedTool) {
      case TOOL.brush:
      case TOOL.pen:
        this.mouseMovePenBrush(event);
        break;

      default:
    }
  }

  mouseMovePenBrush(event: MouseEvent): void {
    if (this.shapeService.preview.active) {
      this.shapeService.preview.path += `L${event.offsetX} ${event.offsetY} `;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {

    this.selectedShape.onMouseUp();

    this.assignMouseUpEvent();
    this.shapeService.resetPreview();
    this.pointerEvent = POINTER_EVENT.visiblePainted;
  }

  assignMouseUpEvent(): void {
    switch (this.selectedTool) {
      case TOOL.brush:
        this.shapeService.drawBrush();
        break;

      case TOOL.pen:
        this.shapeService.drawPen();
        break;

      default:
    }
  }

}
