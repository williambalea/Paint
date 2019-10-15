import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmationComponent } from '../components/delete-confirmation/delete-confirmation.component';
import { FileParametersServiceService } from '../services/file-parameters-service.service';
import { DrawingInfo } from '../../constants'; 

@Component({
  selector: 'app-save-file-modalwindow',
  templateUrl: './save-file-modalwindow.component.html',
  styleUrls: ['./save-file-modalwindow.component.scss']
})

  export class SaveFileModalwindowComponent implements OnInit {
    form: FormGroup;

    drawingName: string;
    tags: string[];
    currentTag: string;

  constructor( private fileParameters: FileParametersServiceService,
    //private dialog: MatDialog,
    //private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SaveFileModalwindowComponent>)
    {
      this.tags = [];
      this.tags.push('tagName');
      this.drawingName = 'drawingName';
      this.currentTag = 'currentTag';
    }

  ngOnInit(): void {

  }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  // deleteConfirmation(drawingName: string): void {
  //   this.dialog.open(DeleteConfirmationComponent);
  //   this.fileParameters.setParametersSaveDrawing(drawingName); // add these parameters to fileparameterservice
  // }

  // validForm(): boolean {
  //    return (this.form.valid);
  // }

  addTag() {
    this.tags.push(this.currentTag);
  }

  showTags() {
    for (const tag of this.tags) {
      console.log(tag);
    }
  }
  // showTitle() {
  //   console.log(this.drawingName);
  // }

  submitDrawing() {
    const finalDrawing: DrawingInfo = {drawingName: this.drawingName, tags: this.tags};
    console.log('Drawing info sent');
    this.dialogRef.close();
    return finalDrawing;
  }
}
