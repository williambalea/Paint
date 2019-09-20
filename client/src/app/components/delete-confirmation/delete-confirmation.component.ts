import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShapesService } from '../../services/shapes/shapes.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {

  constructor(private shapeService: ShapesService, private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  message = 'Are you sure?';

  clear(): void {
    this.shapeService.clearShapes();
    this.dialogRef.close(true);
  }
}
