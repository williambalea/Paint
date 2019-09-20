import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
//import { ShapesService } from '../../services/shapes/shapes.service';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {

  test: number;
  canvasWidth : number;
  newFile : boolean = false;

  constructor(private dialog: MatDialog,/*private shapeService: ShapesService*/){}
  setValue(value: number): void {
    this.test = value;
    
  }
/*
  deleteContent(): void {
    if (this.shapeService.shapes.length != 0){
      this.dialog.open(DeleteConfirmationComponent);
    }
    
  }*/
  createNewFile(){
  this.dialog.open(NewFileModalwindowComponent);
  }
}
