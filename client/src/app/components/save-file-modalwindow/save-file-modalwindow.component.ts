import { Component, OnInit } from '@angular/core';
import { /*FormBuilder,*/ FormGroup, /*Validators*/ } from '@angular/forms';
import { /*MatDialog,*/ MatDialogRef } from '@angular/material';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { EMPTY_STRING } from 'src/constants';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'app-save-file-modalwindow',
  templateUrl: './save-file-modalwindow.component.html',
  styleUrls: ['./save-file-modalwindow.component.scss'],
})

  export class SaveFileModalwindowComponent implements OnInit {

    form: FormGroup;
    currentTag: string;

  constructor( /*private fileParameters: FileParametersServiceService,*/
            // private dialog: MatDialog,
            // private formBuilder: FormBuilder,
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
               private eventEmitterService: EventEmitterService,
               private inputService: InputService) {
      this.currentTag = 'currentTag';

    }

    ngOnInit(): void {
      this.inputService.drawingName = EMPTY_STRING;
      this.inputService.drawingTags = [];
    }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  deleteTag(tag: string): void {
    this.inputService.drawingTags.splice(this.inputService.drawingTags.indexOf(tag), 1);
  }

  addTag() {
    this.inputService.drawingTags.push(this.currentTag);
  }

  submitDrawing() {
    this.eventEmitterService.sendSVGToServer();
    this.dialogRef.close();
  }

}
