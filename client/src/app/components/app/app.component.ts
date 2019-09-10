import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EntryPointComponent } from './entry-point/entry-point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    if(!sessionStorage.getItem("hideDialog"))
      this.openDialog();
  }

  public openDialog(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> = 
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(hideDialog => {
      if(hideDialog)
        sessionStorage.setItem("hideDialog", JSON.stringify(hideDialog));
    });

  }

}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
