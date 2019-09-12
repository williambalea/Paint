import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EntryPointComponent } from './entry-point/entry-point.component';

interface rect {
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
  public enableKeyPress: boolean = false;

  public canvasWidth: number = window.innerWidth;
  public canvasHeigth: number = window.innerHeight;
  public rectangles: rect[] = [];

  // TODO: interface mouse and style to reduce parameters count
  public mouseInitialX: number;
  public mouseInitialY: number;

  // TODO: to put in a service i guess and maybe make an interface for preview
  public previewActive: boolean = false;
  public previewWidth: number;
  public previewHeight: number;
  public previewX: number;
  public previewY: number;
  public previewFill: string;
  public previewStroke: string;
  public previewStrokeWidth: number;

  public constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {
    if(!sessionStorage.getItem("hideDialog"))
      this.openDialog();
  }


  public openDialog(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> = 
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((hideDialog: boolean) => {
      if(hideDialog)
        sessionStorage.setItem("hideDialog", JSON.stringify(hideDialog));
      this.enableKeyPress = true;
    });

  }

  @HostListener("window:keydown", ["$event"])
  public onKeyDown($event: KeyboardEvent): void {
    if(this.enableKeyPress) {
    }
  }

  public setRGBColor(r: number, g: number, b: number): string {
    return `rgb(${r},${g},${b})`;
  }

  public REMOVEsetRectStyle(): void {
    const r: number = Math.floor(Math.random() * 255);
    const g: number = Math.floor(Math.random() * 255);
    const b: number = Math.floor(Math.random() * 255);
    this.previewFill = this.setRGBColor(r, g, b);
    this.previewStrokeWidth = 1;
    this.previewStroke = this.setRGBColor(0,0, 0);
  }

  @HostListener("mousedown", ["$event"])
  public setMouseInitalCoord($event: MouseEvent): void {
    this.REMOVEsetRectStyle();
    this.previewActive = true;
    this.previewX = $event.offsetX;
    this.previewY = $event.offsetY;

    this.mouseInitialX = $event.offsetX;
    this.mouseInitialY = $event.offsetY;
  }

  @HostListener("mousemove", ["$event"])
  public setPreviewOffset($event: MouseEvent): void {
    if(this.previewActive) {
      this.previewWidth = Math.abs($event.offsetX - this.mouseInitialX);
      this.previewHeight = Math.abs($event.offsetY - this.mouseInitialY);
      this.previewX = this.mouseInitialX < $event.offsetX ? this.mouseInitialX : $event.offsetX;
      this.previewY = this.mouseInitialY < $event.offsetY ? this.mouseInitialY : $event.offsetY;
    }
  }

  @HostListener("mouseup", ["$event"])
  public drawSquare($event: MouseEvent): void {
    const rectangle: rect = { x: this.previewX, 
                              y: this.previewY, 
                              width: this.previewWidth, 
                              height: this.previewHeight,
                              fill: this.previewFill,
                              strokeWidth: this.previewStrokeWidth,
                              stroke: this.previewStroke };
                              
    this.rectangles.push(rectangle);
    this.previewActive = false;
    this.previewWidth = 0;
    this.previewHeight = 0;
  }
}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
