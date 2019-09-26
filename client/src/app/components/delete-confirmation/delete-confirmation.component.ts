import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {

  message: string;
  constructor( public shapeService: ShapesService,
               public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
               public fileParameters: FileParametersServiceService) {
                 this.message = 'Are you sure?';
               }

  clear(): void {
    this.shapeService.clearShapes();
    this.fileParameters.changeParameters(this.fileParameters.tempx, this.fileParameters.tempy);
    this.dialogRef.close();
  }
}
