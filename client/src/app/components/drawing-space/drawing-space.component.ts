import { Component,  HostListener , OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/services/color/color.service';
import { HIDE_DIALOG, key } from '../../../../../common/constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/classes/shape';
import { ShapesService } from '../../services/shapes/shapes.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {
  canvasWidth: number ;
  canvasHeight: number ;
  canvasColor: string ;
  subscription: Subscription;
  width = 0;
  enableKeyPress: boolean;
  shiftPressed: boolean;

  previewActive = false;

  constructor( private dialog: MatDialog,
               private shapeService: ShapesService,
               private fileParameters: FileParametersServiceService,
               private colorService: ColorService) {
    this.enableKeyPress = false;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem(HIDE_DIALOG)) {
      this.openDialog();
    } else {
      this.enableKeyPress = true;
    }

    this.subscription = this.fileParameters.canvaswidth$
       .subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    this.subscription = this.fileParameters.canvasheight$
       .subscribe((canvasHeight) => this.canvasHeight = canvasHeight);
    this.subscription = this.fileParameters.canvascolor$
       .subscribe((canvasColor) => this.canvasColor = canvasColor);
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

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.colorService.setMakingColorChanges(false);
    this.shapeService.setMouseOrigin(event);
    this.shapeService.fillColor = this.colorService.getFillColor();
    this.shapeService.strokeColor = this.colorService.getStrokeColor();
    this.shapeService.setRectangleType();
  }

  @HostListener('mousemove', ['$event'])
  setPreviewOffset(event: MouseEvent): void {
    this.shapeService.mouse = {x: event.offsetX, y: event.offsetY};
    if (this.shapeService.preview.active) {
      if (this.shiftPressed) {
        this.shapeService.setSquareOffset();
      } else {
        this.shapeService.setRectangleOffset();
      }
    }
  }

  @HostListener('mouseup')
  drawShape(): void {
    this.shapeService.preview.active = false;
    this.shapeService.drawRectangle();
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

  TEMPORARYsetRGBAColor(r: number, g: number, b: number, a: number): string {
    return `rgb(${r},${g},${b},${a})`;
  }

}
