import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EntryPointComponent } from './components/entry-point/entry-point.component';

interface RECT {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  strokeWidth: number;
  stroke: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  enableKeyPress: boolean = false;

  canvasWidth: number = window.innerWidth;
  canvasHeigth: number = 1080;
  rectangles: RECT[] = [];

  // TODO: interface mouse and style to reduce parameters count
  mouseInitialX: number;
  mouseInitialY: number;

  // TODO: to put in a service i guess and maybe make an interface for preview
  previewActive: boolean = false;
  previewWidth: number;
  previewHeight: number;
  previewX: number;
  previewY: number;
  previewFill: string;
  previewStroke: string;
  previewStrokeWidth: number;

  shiftPressed: boolean;

  constructor(private dialog: MatDialog) { }

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
    if (this.enableKeyPress) {
      if (event.key === 'Shift') {
        this.previewWidth = this.previewHeight;
        this.shiftPressed = true;
      }
      if (event.ctrlKey && event.key === 'z') {
        this.rectangles.pop();
        console.log('pressed z rectangles.length : ' + this.rectangles.length );
      }
    }
  }

  /*
  @HostListener("window:keyup", ["$event"])
  public onKeyUp($event: KeyboardEvent): void {
    console.log("shift up");
    if($event.key === "Shift")
      this.shiftPressed = false;
  }
  */

  setRGBAColor(r: number, g: number, b: number, a: number): string {
    return `rgb(${r},${g},${b},${a})`;
  }

  REMOVEsetRectStyle(): void {
    const r: number = Math.floor(Math.random() * 255);
    const g: number = Math.floor(Math.random() * 255);
    const b: number = Math.floor(Math.random() * 255);
    const a: number = Math.round(Math.random());
    this.previewFill = this.setRGBAColor(r, g, b, 1);
    this.previewStrokeWidth = 2;
    this.previewStroke = this.setRGBAColor(0, 0, 0, a);
  }

  @HostListener('mousedown', ['$event'])
  setMouseInitalCoord(event: MouseEvent): void {
    this.REMOVEsetRectStyle();
    this.previewActive = true;
    this.previewX = event.offsetX;
    this.previewY = event.offsetY;

    this.mouseInitialX = event.offsetX;
    this.mouseInitialY = event.offsetY;
  }

  @HostListener('mousemove', ['$event'])
  setPreviewOffset(event: MouseEvent): void {
    if (this.previewActive) {
      this.previewWidth = Math.abs(event.offsetX - this.mouseInitialX);
      if (this.shiftPressed) {
        this.previewHeight = this.previewWidth;
        this.previewX = event.offsetX > 0 ? this.mouseInitialX : -this.mouseInitialX;
        this.previewY = event.offsetY > 0 ? this.mouseInitialY : -this.mouseInitialY;
      } else {
        this.previewHeight = Math.abs(event.offsetY - this.mouseInitialY);
        this.previewX = this.mouseInitialX < event.offsetX ? this.mouseInitialX : event.offsetX;
        this.previewY = this.mouseInitialY < event.offsetY ? this.mouseInitialY : event.offsetY;
      }
    }
  }

  @HostListener('mouseup')
  drawSquare(): void {
    const rectangle: RECT = {
      x: this.previewX,
      y: this.previewY,
      width: this.previewWidth,
      height: this.previewHeight,
      fill: this.previewFill,
      strokeWidth: this.previewStrokeWidth,
      stroke: this.previewStroke,
    };

    this.rectangles.push(rectangle);
    this.previewActive = false;
    this.previewWidth = 0;
    this.previewHeight = 0;
  }
}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
