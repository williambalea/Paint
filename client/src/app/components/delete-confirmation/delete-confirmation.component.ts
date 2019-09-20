import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../services/shapes/shapes.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(private shapeService: ShapesService,private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit() {
  }
  message: string = "Are you sure?"
  
  clear() : void {
    this.shapeService.clearShapes();
    this.dialogRef.close(true);
  }
 

}
