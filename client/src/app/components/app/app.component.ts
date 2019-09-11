import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EntryPointComponent } from './entry-point/entry-point.component';

interface rect {
  x: number;
  y: number;
  width: number;
  height: number;
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
  public drawSquare($event: MouseEvent): void {
    console.log(`x: ${$event.offsetX} y: ${$event.offsetY}`);
    this.mouseInitialX = $event.offsetX;
    this.mouseInitialY = $event.offsetY;
  }

  @HostListener("mouseup", ["$event"])
  public drawSquares($event: MouseEvent): void {
    console.log(`x: ${$event.offsetX} y: ${$event.offsetY}`);
    this.rectangles.push( {x: this.mouseInitialX, 
                           y: this.mouseInitialY, 
                           width: Math.abs($event.offsetX - this.mouseInitialX),
                          height: Math.abs($event.offsetY - this.mouseInitialY)} );
  }
}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
