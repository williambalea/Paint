import { Component, OnInit } from '@angular/core';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ShapesService } from '../../services/shapes/shapes.service';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-new-file-modalwindow',
  templateUrl: './new-file-modalwindow.component.html',
  styleUrls: ['./new-file-modalwindow.component.scss']
})
export class NewFileModalwindowComponent implements OnInit {
  canvasWidth : number;
  canvasHeight: number;
  canvasColor : number;

  constructor(private fileParameters: FileParametersServiceService,private dialog: MatDialog,private shapeService: ShapesService) {
    
  }


  ngOnInit() {
  }

  submitParameters(canvaswidth : number, canvasheight : number, canvascolor : string){
    console.log('selected nav item ');
    this.fileParameters.changeParameters(canvaswidth,canvasheight,canvascolor);
  }

  deleteContent(): void {
    if (this.shapeService.shapes.length != 0){
      this.dialog.open(DeleteConfirmationComponent);
    }
    
  }

}
