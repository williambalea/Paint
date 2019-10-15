import { Component } from '@angular/core';
import { /*FormBuilder,*/ FormGroup, /*Validators*/ } from '@angular/forms';
import { /*MatDialog,*/ MatDialogRef } from '@angular/material';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { InputService } from '../services/input.service';
// import { DeleteConfirmationComponent } from '../components/delete-confirmation/delete-confirmation.component';
// import { FileParametersServiceService } from '../services/file-parameters-service.service';

@Component({
  selector: 'app-save-file-modalwindow',
  templateUrl: './save-file-modalwindow.component.html',
  styleUrls: ['./save-file-modalwindow.component.scss'],
})

  export class SaveFileModalwindowComponent {
    form: FormGroup;

    currentTag: string;
    tags: string[];

  constructor( /*private fileParameters: FileParametersServiceService,*/
            // private dialog: MatDialog,
            // private formBuilder: FormBuilder,
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
               private eventEmitterService: EventEmitterService,
               private inputService: InputService) {
      this.currentTag = 'currentTag';

    }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  addTag() {
    this.inputService.drawingTags.push(this.currentTag);
    console.log(this.inputService.drawingName);
  }

  submitDrawing() {
    console.log('Drawing info sent');
    this.eventEmitterService.sendSVGToServer();
    this.dialogRef.close();
  }

}
