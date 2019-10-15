import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SaveFileModalwindowComponent } from 'src/app/save-file-modalwindow/save-file-modalwindow.component';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FileParametersServiceService } from 'src/app/services/file-parameters-service.service';
import { InputService } from 'src/app/services/input.service';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-get-file-modalwindow',
  templateUrl: './get-file-modalwindow.component.html',
  styleUrls: ['./get-file-modalwindow.component.scss'],
})
export class GetFileModalwindowComponent implements OnInit {

  dataTable: SVGJSON[];
  tags: string[];

  constructor( private fileParameters: FileParametersServiceService,
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
               private inputService: InputService,
               private eventEmitter: EventEmitterService,
               private communicationService: CommunicationsService,
    ) {
      this.dataTable = [];
      this.tags = [];
    }

  ngOnInit() {
    this.communicationService.testReturnIndex().subscribe((table: SVGJSON[]) => {
      this.dataTable = table;
      console.log(this.dataTable);
    });

   }



  closeModalWindow(): void {
  this.dialogRef.close();
  }

  deleteConfirmation(drawingName: string): void {
  this.dialog.open(DeleteConfirmationComponent);
  this.fileParameters.setParametersSaveDrawing(drawingName);
  }

  selectDrawing(value: number) {
    this.inputService.drawingHtml = this.dataTable[value].html;
    console.log(this.inputService.drawingHtml);
    this.eventEmitter.appendToDrawingSpace();
    this.closeModalWindow();
  }
}
