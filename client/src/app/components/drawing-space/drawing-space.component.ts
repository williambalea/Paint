import { Component,  HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  canvasHeigth: number = 1080;

  enableKeyPress: boolean;
  shiftPressed: boolean;

  fill: string;
  stroke: string;
  strokeWidth: number;

  previewActive = false;
  preview: Preview;

  // TODO: interface mouse and style to reduce parameters count
  mouseInitialX: number;
  mouseInitialY: number;

  constructor(private dialog: MatDialog,
              private shapeService: ShapesService) {
                this.enableKeyPress = false;
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

    dialogRef.afterClosed().subscribe((hideDialog: boolean) => {
      if (hideDialog) {
        sessionStorage.setItem('hideDialog', JSON.stringify(hideDialog));
      }
      this.enableKeyPress = true;
    });

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) { return; }
  }

  // TODO: to be put elswhere
  setRGBAColor(r: number, g: number, b: number, a: number): string {
    return `rgb(${r},${g},${b},${a})`;
  }

  REMOVEsetRectStyle(): void {
    const r: number = Math.floor(Math.random() * 255);
    const g: number = Math.floor(Math.random() * 255);
    const b: number = Math.floor(Math.random() * 255);
    const a: number = Math.round(Math.random());
    this.fill = this.setRGBAColor(r, g, b, 1);
    this.strokeWidth = 2;
    this.stroke = this.setRGBAColor(0, 0, 0, a);
  }

  @HostListener('mousedown', ['$event'])
  setMouseInitalCoord(event: MouseEvent): void {
    this.REMOVEsetRectStyle();

    this.preview = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.previewActive = true;

    console.log('mouse.offsetX = '  + event.offsetX);
    this.preview.x = event.offsetX;
    console.log('this.preview.x = ' + this.preview.x);
    this.preview.y = event.offsetY;

    this.mouseInitialX = event.offsetX;
    this.mouseInitialY = event.offsetY;
  }

  @HostListener('mousemove', ['$event'])
  setPreviewOffset(event: MouseEvent): void {
    if (this.previewActive) {
      this.preview.width = Math.abs(event.offsetX - this.mouseInitialX);
      if (this.shiftPressed) {
        this.preview.height = this.preview.width;
        this.preview.x = event.offsetX > 0 ? this.mouseInitialX : -this.mouseInitialX;
        this.preview.y = event.offsetY > 0 ? this.mouseInitialY : -this.mouseInitialY;
      } else {
        this.preview.height = Math.abs(event.offsetY - this.mouseInitialY);
        this.preview.x = this.mouseInitialX < event.offsetX ? this.mouseInitialX : event.offsetX;
        this.preview.y = this.mouseInitialY < event.offsetY ? this.mouseInitialY : event.offsetY;
      }
    }
  }

  @HostListener('mouseup')
  drawShape(): void {
    this.shapeService.drawRectangle(this.preview, this.fill, this.stroke, this.strokeWidth);
    this.previewActive = false;
    this.preview.width = 0;
    this.preview.height = 0;
  }

}
