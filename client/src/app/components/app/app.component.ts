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

  // with plain svg
  public canvasWidth: number = window.innerWidth;
  public canvasHeigth: number = window.innerHeight;
  public rectangles: rect[] = [];
  public mouseInitialX: number;
  public mouseInitialY: number;

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

  @HostListener("mousedown", ["$event"])
  public setMouseInitalCoord($event: MouseEvent): void {
    console.log(`x: ${$event.offsetX} y: ${$event.offsetY}`);
    this.mouseInitialX = $event.offsetX;
    this.mouseInitialY = $event.offsetY;
  }

  @HostListener("mouseup", ["$event"])
  public drawSquare($event: MouseEvent): void {
    console.log(`x: ${$event.offsetX} y: ${$event.offsetY}`);
    const rectangle: rect = this.makeSquare(this.mouseInitialX, this.mouseInitialY, $event.offsetX, $event.offsetY);
    this.rectangles.push(rectangle);
  }

  public bound(x: number): void {

  }

  public addColor(r: number, g: number, b: number): string {
    return `rgb(${r},${g},${b})`;
  }

  // TODO: interface mouse and style to reduce parameters count
  public makeSquare(mouseX: number, mouseY: number, offsetX: number, offsetY: number): rect {
    const width: number = Math.abs(offsetX - mouseX);
    const height: number = Math.abs(offsetY - mouseY);
    const x: number = mouseX < offsetX ? mouseX : offsetX;
    const y: number = mouseY < offsetY ? mouseY : offsetY;
    const fill: string = this.addColor(0, 0, 255);
    const strokeWidth: number = 4;
    const stroke: string = this.addColor(255,0, 0);
    const rectangle: rect = {x: x, 
                             y: y, 
                             width: width, 
                             height: height,
                             fill: fill,
                             strokeWidth: strokeWidth,
                             stroke: stroke};
    return  rectangle;
  }
}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
