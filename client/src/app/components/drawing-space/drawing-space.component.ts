import { Component,  HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { Mouse } from '../../../../../common/interface/mouse';
import { Preview } from '../../../../../common/interface/preview';
import { ShapesService } from '../../services/shapes/shapes.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import { Shape } from 'src/app/services/shapes/classes/shape';
import { Rectangle } from 'src/app/services/shapes/classes/rectangle';

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

  @HostListener('mousedown', ['$event'])
  setMouseOrigin(event: MouseEvent): void {
    this.colorService.setMakingColorChanges(false);
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

  onClick(shape: Shape): void {
    console.log('left click on elem');
    const oldElement = shape as Rectangle;
    const newElement: Rectangle =  new Rectangle(oldElement.x, oldElement.y, oldElement.width,
              oldElement.height, this.colorService.getFillColor(), oldElement.stroke, oldElement.strokeWidth);
    this.shapeService.shapes.splice(this.shapeService.shapes.indexOf(shape));
    this.shapeService.shapes.push(newElement);
  }

  onContextMenu($event: Event, shape: Shape): void {
    console.log('right click on elem');
    $event.preventDefault();

  }

  @HostListener('mouseup')
  drawShape(): void {
    this.shapeService.drawRectangle(this.preview, this.colorService.getStrokeColor(), this.colorService.getFillColor(), this.strokeWidth);
    this.previewActive = false;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor(), this.colorService.getStrokeColor());
  }

}
