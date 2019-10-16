import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { SaveFileModalwindowComponent } from 'src/app/save-file-modalwindow/save-file-modalwindow.component';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { NB } from 'src/constants';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { DisplayConfirmationComponent } from '../display-confirmation/display-confirmation.component';

@Component({
  selector: 'app-get-file-modalwindow',
  templateUrl: './get-file-modalwindow.component.html',
  styleUrls: ['./get-file-modalwindow.component.scss'],
})
export class GetFileModalwindowComponent implements OnInit {



  dataTable: SVGJSON[];
  tag: string;
  tags: string[];
  displayedData: SVGJSON[];
  filteredThroughTagData: SVGJSON[];
  filterActivated: boolean;
  constructor(
               private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
               private inputService: InputService,
               private eventEmitter: EventEmitterService,
               private communicationService: CommunicationsService,
               private dialog: MatDialog,
    ) {
      this.dataTable = [];
      this.tags = [];
      this.displayedData = [];
      this.filteredThroughTagData = [];
      this.filterActivated = false;

    }

  ngOnInit() {

    this.communicationService.testReturnIndex().subscribe((table: SVGJSON[]) => {
      this.dataTable = table;
      this.selectMostRecent();
    });
    console.log('get-file is openened!');
    this.filterActivated = false;

  }

  selectMostRecent(): void {
    let counter: number = NB.Zero;
    console.log(this.dataTable);
    for (let i: number = this.dataTable.length - 1; i >= 0; i--) {
      this.displayedData.push(this.dataTable[i]);
      counter++;
      if (counter === NB.Seven) {
        break;
      }
    }
    console.log(this.displayedData);
  }

  displayWithFilter(): void {
      for ( let i: number = this.dataTable.length; i++;) {
        for (const j: number = this.tags.length; i++;) {
            if (this.dataTable[i].tags.includes(this.tags[j])) {
              this.filteredThroughTagData.push(this.dataTable[i]);
            }
        }
     }
   }

   addTagToFilter(): void {
     this.filterActivated = true;
     this.tags.push(this.tag);
     console.log('tags', this.tags);
   }

  closeModalWindow(): void {
  this.dialogRef.close();
  }

  selectDrawing(value: number) {
    this.inputService.drawingHtml = this.displayedData[value].html;
    if (this.inputService.isNotEmpty) {
      this.dialog.open(DisplayConfirmationComponent);
    } else {
      this.eventEmitter.appendToDrawingSpace();
    }
  }
}
