import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
//import { ColorService } from 'src/app/services/color/color.service';
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
              
              public dialogRef: MatDialogRef<NewFileModalwindowComponent>) {
                
  }

  ngOnInit() {
    this.canvasWidth= window.innerWidth;
    this.canvasHeight= window.innerHeight;
    
    this.control = this.builder.control('', Validators.required);
    this.form = this.builder.group({
      canvaswidth: ['', [Validators.required, Validators.min(0)]],
      canvasheight: ['', [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.dialogRef.close();
  
  }

  submitParameters(canvaswidth: number, canvasheight: number) {
    this.fileParameters.tempresize = true;
    if (this.shapeService.shapes.length !== 0) {
      this.dialog.open(DeleteConfirmationComponent);
      this.fileParameters.setParameters(canvaswidth, canvasheight);
    } else {
      this.fileParameters.changeParameters(canvaswidth, canvasheight);
    }
  }
}
