import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntryPointComponent } from './entry-point/entry-point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.openDialog();
  }

  public openDialog(): void {
    this.dialog.open(EntryPointComponent, { disableClose: true });
  }

  
}

/* William : appComponent devrait être presque vide, je mets ici toutes les
   fonctions neccessaires pour le popup, mais tout ça devra être transféré
   dans le canvasComponent quand ce sera fait */
