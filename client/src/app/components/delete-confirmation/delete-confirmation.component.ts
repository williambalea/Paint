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
    console.dir('6' + this.colorService.getFillColor());
    this.shapeService.clearShapes();
    console.dir('7' + this.colorService.getFillColor());
    this.fileParameters.changeParameters(this.fileParameters.tempx, this.fileParameters.tempy);
    console.dir('8' + this.colorService.getFillColor());
    this.colorService.changeBackgroundColor();
    console.dir('9' + this.colorService.getFillColor());
    this.dialogRef.close(true);
  }
}
