import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SaveFileModalwindowComponent } from 'src/app/save-file-modalwindow/save-file-modalwindow.component';
import { CommunicationsService } from 'src/app/services/communications.service';
import { FileParametersServiceService } from 'src/app/services/file-parameters-service.service';
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
}
