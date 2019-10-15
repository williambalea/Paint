import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileParametersServiceService } from '../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-save-file-modalwindow',
  templateUrl: './save-file-modalwindow.component.html',
  styleUrls: ['./save-file-modalwindow.component.scss']
})

  export class SaveFileModalwindowComponent implements OnInit {
    form: FormGroup;
    drawingName: number ;

  constructor( private fileParameters: FileParametersServiceService,
               private dialog: MatDialog,
               private formBuilder: FormBuilder,
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>) { }

  assignForm(): void {
    this.form = this.formBuilder.group({
      drawingName: ['', [Validators.required, Validators.name]],
    });
  }

  ngOnInit(): void {
    this.assignForm();
  }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  deleteConfirmation(drawingName: string): void {
    this.dialog.open(DeleteConfirmationComponent);
    this.fileParameters.setParametersSaveDrawing(drawingName); // add these parameters to fileparameterservice
  }

  validForm(): boolean {
     return (this.form.valid);
  }

  submitParameters(drawingName: string): void {
    if (this.validForm()) {
    this.deleteConfirmation(drawingName);
    this.dialogRef.close();
  }
}
}
