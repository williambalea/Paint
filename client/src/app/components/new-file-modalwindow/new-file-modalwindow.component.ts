import { Component, OnInit} from '@angular/core';

import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ShapesService } from '../../services/shapes/shapes.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-file-modalwindow',
  templateUrl: './new-file-modalwindow.component.html',
  styleUrls: ['./new-file-modalwindow.component.scss'],
})
export class NewFileModalwindowComponent implements OnInit {
  form: FormGroup;
  control: FormControl;
  customErrors = {required: 'Please accept the terms'}
  canvasWidth : number;
  canvasHeight: number;


 
  constructor(private fileParameters: FileParametersServiceService,private dialog: MatDialog,private shapeService: ShapesService,private builder: FormBuilder,public dialogRef: MatDialogRef<NewFileModalwindowComponent>) {
    
  }
 


  ngOnInit() {
    this.control = this.builder.control('', Validators.required);
    this.form = this.builder.group({
      canvaswidth: ['', [Validators.required, Validators.min(0)]],
      canvasheight: ['',[Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submitParameters(canvaswidth : number, canvasheight : number){
    console.log("newfile submit", canvaswidth);
    if (this.shapeService.shapes.length != 0){
      console.log("newfile",canvaswidth );
      this.dialog.open(DeleteConfirmationComponent);
      this.fileParameters.setParameters(canvaswidth,canvasheight);
    }
    else
    {
      this.fileParameters.changeParameters(canvaswidth,canvasheight);
    }
  }
    

}
