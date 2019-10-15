import { Component } from '@angular/core';
import { /*FormBuilder,*/ FormGroup, /*Validators*/ } from '@angular/forms';
import { /*MatDialog,*/ MatDialogRef } from '@angular/material';
import { DrawingInfo } from '../../constants'; 
import { EventEmitterService } from 'src/app/services/event-emitter.service';
// import { DeleteConfirmationComponent } from '../components/delete-confirmation/delete-confirmation.component';
// import { FileParametersServiceService } from '../services/file-parameters-service.service';

@Component({
  selector: 'app-save-file-modalwindow',
  templateUrl: './save-file-modalwindow.component.html',
  styleUrls: ['./save-file-modalwindow.component.scss'],
})

  export class SaveFileModalwindowComponent {
    form: FormGroup;

    drawingName: string;
    tags: string[];
    currentTag: string;
    

  constructor( /*private fileParameters: FileParametersServiceService,*/
            // private dialog: MatDialog,
            // private formBuilder: FormBuilder,
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
               private eventEmitterService: EventEmitterService) {
      this.tags = [];
      this.tags.push('tagName');
      this.drawingName = 'drawingName';
      this.currentTag = 'currentTag';
     
    }

  closeModalWindow(): void {
    this.dialogRef.close();
  }


  addTag() {
    this.tags.push(this.currentTag);
  }

  showTags() {
    for (const tag of this.tags) {
      console.log(tag);
    }
  }
 
  submitDrawing() {
    const finalDrawing: DrawingInfo = {drawingName: this.drawingName, tags: this.tags};
    console.log('Drawing info sent');
    this.eventEmitterService.sendSVGToServer();
    this.dialogRef.close();
    return finalDrawing;
  }

 
}
