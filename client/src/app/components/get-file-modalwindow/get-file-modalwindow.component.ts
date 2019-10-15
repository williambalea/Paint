import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SaveFileModalwindowComponent } from 'src/app/save-file-modalwindow/save-file-modalwindow.component';
import { FileParametersServiceService } from 'src/app/services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-get-file-modalwindow',
  templateUrl: './get-file-modalwindow.component.html',
  styleUrls: ['./get-file-modalwindow.component.scss']
})
export class GetFileModalwindowComponent implements OnInit {

  constructor( private fileParameters: FileParametersServiceService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SaveFileModalwindowComponent>) { }

  ngOnInit() { }

  closeModalWindow(): void {
  this.dialogRef.close();
  }

  deleteConfirmation(drawingName: string): void {
  this.dialog.open(DeleteConfirmationComponent);
  this.fileParameters.setParametersSaveDrawing(drawingName); // add these parameters to fileparameterservice
  }
}
