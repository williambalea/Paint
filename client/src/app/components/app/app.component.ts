import { Component, OnInit, HostListener, Host } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EntryPointComponent } from './entry-point/entry-point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public enableKeyPress: boolean = false;
  public mouseX: number = 0;
  public mouseY: number = 0;
  public mouseXc: number = 150;
  public mouseYc: number = 100;
  
  public constructor(private dialog: MatDialog) {}

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

  public sendMousePos(mouse: MouseEvent): void {
    console.log("mouse mov");
    this.mouseX = mouse.clientX;
    this.mouseY = mouse.clientY;
  }

}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
