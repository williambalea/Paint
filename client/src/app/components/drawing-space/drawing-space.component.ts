import { Component,  HostListener , Input, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/services/color/color.service';
import { Shape } from '../../../Classes/Shapes/shape';
import { HIDE_DIALOG, KEY, TOOL } from '../../../constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { ShapesService } from '../../services/shapes/shapes.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {
  // TODO: QA
  tool: typeof TOOL;
  @Input()selectedTool: TOOL;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  subscription: Subscription;
  width: number;
  enableKeyPress: boolean;
  shiftPressed: boolean;

  constructor( private dialog: MatDialog,
               private shapeService: ShapesService,
               private fileParameters: FileParametersServiceService,
               private colorService: ColorService) {
    this.tool = TOOL;
    this.enableKeyPress = false;
    this.width = 0;
    this.resizeFlag = false;
  }

  ngOnInit(): void {
    (!localStorage.getItem(HIDE_DIALOG)) ? this.openDialog() : this.enableKeyPress = true;

    this.subscription = this.fileParameters.canvaswidth$
       .subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    this.subscription = this.fileParameters.canvasheight$
       .subscribe((canvasHeight) => this.canvasHeight = canvasHeight);
    this.subscription = this.fileParameters.resizeflag$
       .subscribe((resizeFlag) => this.resizeFlag = resizeFlag);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if (!this.resizeFlag) {
    this.width = event.target.innerWidth;
    this.canvasWidth = event.target.innerWidth;
  }

  }

  openDialog(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> =
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed()
    .subscribe((hideDialog: boolean) => { this.closeDialog(hideDialog); });
  }

  closeDialog(hideDialog: boolean): void {
    if (hideDialog) {
      localStorage.setItem('hideDialog', JSON.stringify(hideDialog));
    }
    this.enableKeyPress = true;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) {
      if (event.key === KEY.shift) {
        this.shiftPressed = true;
        this.shapeService.setSquareOffset();
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.shiftPressed = false;
      this.shapeService.setRectangleOffset();
    }
  }

  onLeftClick(shape: Shape): void {
    if (this.selectedTool === TOOL.colorApplicator) {
      const index: number = this.shapeService.shapes.indexOf(shape);
      this.shapeService.shapes[index].changePrimaryColor(this.colorService.getFillColor());
    }
  }

  onRightClick($event: Event, shape: Shape): void {
    $event.preventDefault();
    if (this.selectedTool === TOOL.colorApplicator) {
      const index: number = this.shapeService.shapes.indexOf(shape);
      this.shapeService.shapes[index].changeSecondaryColor(this.colorService.getStrokeColor());
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.shapeService.fillColor = this.colorService.getFillColor();
    this.shapeService.strokeColor = this.colorService.getStrokeColor();
    this.shapeService.preview.active = true;
    switch (this.selectedTool) {
      case TOOL.rectangle:
        this.mouseDownRectangle(event);
        break;

      case TOOL.brush:
        this.mouseDownBrush(event);
        break;

      case TOOL.pen:
        this.mouseDownPen(event);
        break;

      case TOOL.colorApplicator:
          break;

      default:
    }
  }

  mouseDownRectangle(event: MouseEvent): void {
    this.colorService.setMakingColorChanges(false);
    this.shapeService.setMouseOrigin(event);
    this.shapeService.setRectangleType();
  }

  mouseDownPen(event: MouseEvent): void {
    this.colorService.setMakingColorChanges(false);
    this.shapeService.preview.path += `M${event.offsetX} ${event.offsetY} l0.01 0.01`;
  }

  mouseDownBrush(event: MouseEvent): void {
    this.colorService.setMakingColorChanges(false);
    this.shapeService.preview.path += `M${event.offsetX} ${event.offsetY} l1 1`;
    this.shapeService.preview.filter = `url(#${this.shapeService.brushStyle})`;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    switch (this.selectedTool) {
      case TOOL.rectangle:
        this.mouseMoveRectangle(event);
        break;

      case TOOL.brush:
      case TOOL.pen:
        this.mouseMovePenBrush(event);
        break;

      case TOOL.colorApplicator:
        break;

      default:
    }
  }

  mouseMoveRectangle(event: MouseEvent): void {
    this.shapeService.mouse = {x: event.offsetX, y: event.offsetY};
    if (this.shapeService.preview.active) {
      (this.shiftPressed) ? this.shapeService.setSquareOffset() : this.shapeService.setRectangleOffset();
    }
  }

  mouseMovePenBrush(event: MouseEvent): void {
    if (this.shapeService.preview.active) {
      this.shapeService.preview.path += `l${event.movementX} ${event.movementY}`;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.shapeService.preview.active = false;
    switch (this.selectedTool) {
      case TOOL.rectangle:
        this.shapeService.drawRectangle();
        break;

      case TOOL.brush:
        this.shapeService.drawBrush();
        break;

      case TOOL.colorApplicator:
        break;

      case TOOL.pen:
        this.shapeService.drawPen();
        break;

      default:
    }
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
    this.shapeService.resetPreview();
  }
}
