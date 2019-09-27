import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { ShapesService } from '../../services/shapes/shapes.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-new-file-modalwindow',
  templateUrl: './new-file-modalwindow.component.html',
  styleUrls: ['./new-file-modalwindow.component.scss'],
})
export class NewFileModalwindowComponent implements OnInit {
  // TODO: QA
  form: FormGroup;
  control: FormControl;
  customErrors = {required: 'Please accept the terms'};
  canvasWidth: number ;
  canvasHeight: number ;

  constructor( public fileParameters: FileParametersServiceService,
               private dialog: MatDialog,
               private shapeService: ShapesService,
               private builder: FormBuilder,
               public colorService: ColorService,
               public dialogRef: MatDialogRef<NewFileModalwindowComponent>) { }

  assignForm(){
    this.form = this.builder.group({
      canvaswidth: ['', [Validators.required, Validators.min(0)]],
      canvasheight: ['', [Validators.required, Validators.min(0)]],
    });
  }

  assignCanvas(){
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
  }

  ngOnInit() {
    this.assignCanvas();
    this.control = this.builder.control('', Validators.required);
    this.assignForm();
    this.colorService.setShowBackgroundButton(false);
  }

  closeColorService(){
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }

  closeModalWindow() {
    this.closeColorService();
    this.dialogRef.close();
  }

  deleteConfirmation(canvaswidth: number, canvasheight: number){
    this.dialog.open(DeleteConfirmationComponent);
    this.fileParameters.setParameters(canvaswidth, canvasheight);
  }

  modifyCanvasDisplay(){
    this.colorService.changeBackgroundColor();
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }


  submitParameters(canvaswidth: number, canvasheight: number) {
    this.fileParameters.tempresize = true;
    if (this.shapeService.shapes.length) {
      this.deleteConfirmation(canvaswidth, canvasheight);
    } else {
      this.fileParameters.changeParameters(canvaswidth, canvasheight);
      this.modifyCanvasDisplay();
    }
    this.dialogRef.close();
  }
}
