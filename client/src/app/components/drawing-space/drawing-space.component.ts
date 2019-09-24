import { Component,  HostListener , Input, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/services/color/color.service';
import { HIDE_DIALOG, key, tool } from '../../../../../common/constants';
import { Shape } from '../../../app/services/shapes/classes/shape';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { ShapesService } from '../../services/shapes/shapes.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {
  tool = tool;
  @Input()selectedTool: tool;

  canvasWidth: number ;
  canvasHeight: number ;
  subscription: Subscription;
  width: number;
  enableKeyPress: boolean;
  shiftPressed: boolean;

  constructor( private dialog: MatDialog,
               private shapeService: ShapesService,
               private fileParameters: FileParametersServiceService,
               private colorService: ColorService) {
    this.enableKeyPress = false;
    this.width = 0;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem(HIDE_DIALOG)) {
      this.openDialog();
    } else {
      this.enableKeyPress = true;
    }

    this.subscription = this.fileParameters.canvaswidth$
       .subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    console.dir('drawingspace', this.width);
    this.subscription = this.fileParameters.canvasheight$
       .subscribe((canvasHeight) => this.canvasHeight = canvasHeight);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.width = event.target.innerWidth - 500;
    this.canvasWidth = event.target.innerWidth - 500;

  }

  openDialog(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> =
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed()
    .subscribe((hideDialog: boolean) => { this.closeDialog(hideDialog); });
  }

  closeDialog(hideDialog: boolean): void {
    if (hideDialog) {
      sessionStorage.setItem('hideDialog', JSON.stringify(hideDialog));
    }
    this.enableKeyPress = true;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) {
      if (event.key === key.shift) {
        this.shiftPressed = true;
        this.shapeService.setSquareOffset();
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === key.shift) {
      this.shiftPressed = false;
      this.shapeService.setRectangleOffset();
    }
  }

  onLeftClick($event: Event, shape: Shape): void {
    const index: number = this.shapeService.shapes.indexOf(shape);
    this.shapeService.shapes[index].changePrimaryColor(this.colorService.getFillColor());
  }

  onRightClick($event: Event, shape: Shape): void {
    $event.preventDefault();
    const index: number = this.shapeService.shapes.indexOf(shape);
    this.shapeService.shapes[index].changeSecondaryColor(this.colorService.getStrokeColor());
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.shapeService.fillColor = this.colorService.getFillColor();
    this.shapeService.strokeColor = this.colorService.getStrokeColor();
    this.shapeService.preview.active = true;
    switch (this.selectedTool) {
      case tool.rectangle:
        this.mouseDownRectangle(event);
        break;

      case tool.brush:
        break;

      case tool.pen:
        this.mouseDownPencil(event);
        break;

      case tool.colorApplicator:
          break;

      default:
    }
  }

  mouseDownRectangle(event: MouseEvent): void {
    this.colorService.setMakingColorChanges(false);
    this.shapeService.setMouseOrigin(event);
    this.shapeService.setRectangleType();
  }

  mouseDownPencil(event: MouseEvent): void {
    this.shapeService.preview.path += `M${event.offsetX} ${event.offsetY} l0.01 0.01`;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    switch (this.selectedTool) {
      case tool.rectangle:
        this.mouseMoveRectangle(event);
        break;

      case tool.brush:
        break;

      case tool.colorApplicator:
        break;

      case tool.pen:
        this.mouseMovePencil(event);
        break;

      default:
    }
  }

  mouseMoveRectangle(event: MouseEvent): void {
    this.shapeService.mouse = {x: event.offsetX, y: event.offsetY};
    if (this.shapeService.preview.active) {
      if (this.shiftPressed) {
        this.shapeService.setSquareOffset();
      } else {
        this.shapeService.setRectangleOffset();
      }
    }
  }

  mouseMovePencil(event: MouseEvent): void {
    if (this.shapeService.preview.active) {
      this.shapeService.preview.path += `L${event.offsetX} ${event.offsetY}`;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.shapeService.preview.active = false;
    switch (this.selectedTool) {
      case tool.rectangle:
        this.mouseUpRectangle();
        break;

      case tool.brush:
        break;

      case tool.colorApplicator:
        break;

      case tool.pen:
        this.mouseUpPencil();
        break;

      default:
    }
  }

  mouseUpRectangle(): void {
    this.shapeService.drawRectangle();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
    this.shapeService.resetPreview();
  }

  mouseUpPencil(): void {
    this.shapeService.drawPencil();
    this.shapeService.resetPreview();
  }
}
