
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { InputService } from 'src/app/services/input.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-new-file-modalwindow',
  templateUrl: './new-file-modalwindow.component.html',
  styleUrls: ['./new-file-modalwindow.component.scss'],
})
export class NewFileModalwindowComponent implements OnInit {
  form: FormGroup;
  canvasWidth: number ;
  canvasHeight: number ;

  constructor( private fileParameters: FileParametersServiceService,
               private dialog: MatDialog,
               private formBuilder: FormBuilder,
               private gridService: GridService,
               private colorService: ColorService,
               private inputService: InputService,
               private dialogRef: MatDialogRef<NewFileModalwindowComponent>) { }

  assignForm(): void {
    this.form = this.formBuilder.group({
      canvaswidth: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      canvasheight: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
    });
  }

  ajustCanvas() {
    this.gridService.buildGrid();
  }

  assignCanvas(): void {
    this.canvasWidth = window.innerWidth + 1;
    this.canvasHeight = window.innerHeight + 1;
  }

  ngOnInit(): void {
    this.assignCanvas();
    this.assignForm();
    this.colorService.setShowBackgroundButton(false);
  }

  closeColorService(): void {
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }

  closeModalWindow(): void {
    this.closeColorService();
    this.dialogRef.close();
  }

  deleteConfirmation(canvaswidth: number, canvasheight: number): void {
    this.dialog.open(DeleteConfirmationComponent);
    this.fileParameters.setParameters(canvaswidth, canvasheight);
  }

  modifyCanvasDisplay(): void {
    this.colorService.changeBackgroundColor();
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }

  createNewDrawing(canvaswidth: number, canvasheight: number): void {
    this.fileParameters.changeParameters(canvaswidth, canvasheight);
    this.modifyCanvasDisplay();
    this.gridService.gridSizeModification();
  }

  validForm(): boolean {
     return (this.form.valid);
  }

  submitParameters(canvaswidth: number, canvasheight: number): void {
    if (this.validForm()) {
    this.fileParameters.tempresize = true;
    !this.inputService.isBlank ? this.deleteConfirmation(canvaswidth, canvasheight) : this.createNewDrawing(canvaswidth, canvasheight);
    this.dialogRef.close();
    } else {
      this.assignForm();
    }
  }
}
