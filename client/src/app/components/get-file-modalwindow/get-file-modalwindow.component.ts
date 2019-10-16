import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SaveFileModalwindowComponent } from 'src/app/save-file-modalwindow/save-file-modalwindow.component';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { NB } from 'src/constants';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';

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
   }
  closeModalWindow(): void {
  this.dialogRef.close();
  }

  selectDrawing(value: number) {

    this.inputService.drawingHtml = this.displayedData[value].html;
    this.eventEmitter.appendToDrawingSpace();
  }
}
