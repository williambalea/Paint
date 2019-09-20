import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { ShapesService } from '../../services/shapes/shapes.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-new-file-modalwindow',
  templateUrl: './new-file-modalwindow.component.html',
  styleUrls: ['./new-file-modalwindow.component.scss'],
})
export class NewFileModalwindowComponent {
  canvasWidth: number;
  canvasHeight: number;
  canvasColor: number;

  constructor(private fileParameters: FileParametersServiceService, private dialog: MatDialog, private shapeService: ShapesService) {

  }

  submitParameters(canvaswidth: number, canvasheight: number, canvascolor: string) {
    console.log('selected nav item ');
    this.fileParameters.changeParameters(canvaswidth, canvasheight, canvascolor);
  }

  deleteContent(): void {
    if (this.shapeService.shapes.length !== 0) {
      this.dialog.open(DeleteConfirmationComponent);
    }

  }

}
