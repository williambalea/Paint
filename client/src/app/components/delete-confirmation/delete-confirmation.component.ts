import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {

  message: string;
  constructor( private shapeService: ShapesService,
               private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
               private colorService: ColorService,
               private fileParameters: FileParametersServiceService) {
                 this.message = 'Are you sure?';
               }

  clear(): void {
    this.shapeService.clearShapes();
    this.fileParameters.changeParameters(this.fileParameters.tempx, this.fileParameters.tempy);
    this.colorService.changeBackgroundColor();
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.dialogRef.close(true);
  }
}
