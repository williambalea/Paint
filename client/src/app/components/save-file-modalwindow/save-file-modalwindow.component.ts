import { Component, HostListener, OnInit } from '@angular/core';

import { /*MatDialog,*/ MatDialogRef } from '@angular/material';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { EMPTY_STRING, KEY } from 'src/constants';
import { InputService } from '../../services/input.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
               private formBuilder: FormBuilder,
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
               private eventEmitterService: EventEmitterService,
               private inputService: InputService) {
      this.currentTag = 'currentTag';

    }

    ngOnInit(): void {
      this.inputService.drawingName = EMPTY_STRING;
      this.inputService.drawingTags = [];
      this.form = this.formBuilder.group({
        name: ['', [Validators.required,Validators.minLength(1)]]
      })
    }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  deleteTag(tag: string): void {
    this.inputService.drawingTags.splice(this.inputService.drawingTags.indexOf(tag), 1);
  }

  addTag() {
    if (this.inputService.drawingTags.indexOf(this.currentTag) === -1) {
      this.inputService.drawingTags.push(this.currentTag);
    }
  }

  submitDrawing() {
    this.eventEmitterService.sendSVGToServer();
    //this.dialogRef.close();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
      if (event.key === KEY.o) {
          event.preventDefault();
      }
  }

}
