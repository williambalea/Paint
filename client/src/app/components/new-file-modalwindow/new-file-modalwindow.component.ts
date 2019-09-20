import { Component, OnInit } from '@angular/core';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ShapesService } from '../../services/shapes/shapes.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-file-modalwindow',
  templateUrl: './new-file-modalwindow.component.html',
  styleUrls: ['./new-file-modalwindow.component.scss']
})
export class NewFileModalwindowComponent implements OnInit {
  form: FormGroup;
  control: FormControl;
  customErrors = {required: 'Please accept the terms'}
  canvasWidth : number;
  canvasHeight: number;
  canvasColor : number;

  constructor(private fileParameters: FileParametersServiceService,private dialog: MatDialog,private shapeService: ShapesService, private builder: FormBuilder) {

  }


  ngOnInit() {
    this.control = this.builder.control('', Validators.required);

    this.form = this.builder.group({
      canvasWidth: ['', [Validators.required, Validators.min(0)]],
      canvasHeight: ['',[Validators.required, Validators.min(0)]],
    });
  }

  submitParameters(canvaswidth : number, canvasheight : number, canvascolor : string){
    console.log('selected nav item ');
    this.fileParameters.changeParameters(canvaswidth,canvasheight,canvascolor);
  }

  deleteContent(): void {
    if (this.shapeService.shapes.length != 0){
      this.dialog.open(DeleteConfirmationComponent);
    }

  }

}
