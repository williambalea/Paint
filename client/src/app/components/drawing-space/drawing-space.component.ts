import { Component,  HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { Mouse } from '../../../../../common/interface/mouse';
import { Preview } from '../../../../../common/interface/preview';
import { ShapesService } from '../../services/shapes/shapes.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {
  canvasWidth: number = window.innerWidth;
  canvasHeight: number;

  enableKeyPress: boolean;
  shiftPressed: boolean;

  stroke: string;
  strokeWidth: number;

  previewActive = false;
  preview: Preview;
  origin: Mouse;

  constructor(private dialog: MatDialog,
              private shapeService: ShapesService,
              private colorService: ColorService) {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.enableKeyPress = false;
    this.strokeWidth = 5;

  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('hideDialog')) {
      this.openDialog();
    } else {
      this.enableKeyPress = true;
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
      sessionStorage.setItem('hideDialog', JSON.stringify(hideDialog));
    }
    this.enableKeyPress = true;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) {
      if (event.key === 'Shift') {
        this.shiftPressed = true;
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.shiftPressed = false;
    }
  }

  // TODO: to be put elswhere
  // setRGBAColor(r: number, g: number, b: number, a: number): string {
  //   return `rgb(${r},${g},${b},${a})`;
  // }

  // REMOVEsetRectStyle(): void {
  //   const r: number = Math.floor(Math.random() * 255);
  //   const g: number = Math.floor(Math.random() * 255);
  //   const b: number = Math.floor(Math.random() * 255);
  //   const a: number = Math.round(Math.random());
  //   this.fill = this.setRGBAColor(r, g, b, 1);
  //   this.strokeWidth = 2;
  //   this.stroke = this.setRGBAColor(0, 0, 0, a);
  // }

  @HostListener('mousedown', ['$event'])
  setMouseOrigin(event: MouseEvent): void {
    // this.REMOVEsetRectStyle();

    this.preview = {
      x: event.offsetX,
      y: event.offsetY,
      width: 0,
      height: 0 };

    this.origin = {x: event.offsetX, y: event.offsetY};

    this.previewActive = true;
  }

  @HostListener('mousemove', ['$event'])
  setPreviewOffset(event: MouseEvent): void {
    if (this.previewActive) {
      if (this.shiftPressed) {
        this.setSquareOffset(event);
      } else {
        this.setRectangleOffset(event);
      }
    }
  }

  setRectangleOffset(event: MouseEvent): void {
    this.preview.width = Math.abs(event.offsetX - this.origin.x);
    this.preview.height = Math.abs(event.offsetY - this.origin.y);
    this.preview.x = Math.min(this.origin.x, event.offsetX);
    this.preview.y = Math.min(this.origin.y, event.offsetY);
  }

  setSquareOffset(event: MouseEvent): void {
    return;
  }

  @HostListener('mouseup')
  drawShape(): void {
    this.shapeService.drawRectangle(this.preview, this.colorService.getStrokeColor(), this.colorService.getFillColor(), this.strokeWidth);
    this.previewActive = false;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

}
