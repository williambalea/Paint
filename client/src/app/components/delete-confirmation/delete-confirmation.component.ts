import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { ShapesService } from 'src/app/services/shapes/shapes.service';



@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(private shapeService: ShapesService,private dialogRef: MatDialogRef<DeleteConfirmationComponent>,private fileParameters: FileParametersServiceService) { }
 
  ngOnInit() {
  }
  message: string = "Are you sure?"
  
  

  clear() : void {
  
    this.shapeService.clearShapes();
    this.fileParameters.changeParameters(this.fileParameters.tempx,this.fileParameters.tempy);
    this.dialogRef.close(true);
  }
}
