import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SaveFileModalwindowComponent } from 'src/app/save-file-modalwindow/save-file-modalwindow.component';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
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
      // console.log('data', this.dataTable);

  //  if(this.filterActivated) {
  //     this.displayWithFilter();
  //     this.fillDisplayTable(this.filteredThroughTagData);
  //   }
  //   else {
      // this.fillDisplayTable(this.dataTable);
    // }
     });

    this.filterActivated = false;

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

  //  fillDisplayTable(datatable: SVGJSON[]): void  {
  //    let counter: number = NB.Zero;
  //    for (let i: number = datatable.length -1 ; i > 0 ; i--) {
  //     counter++;
  //     this.displayedData.push(datatable[i]);
  //     if (counter === 8) {
  //       break;
  //     }
  //    }
  //  }

  addTagToFilter(): void {
    this.filterActivated = true;
    this.tags.push(this.tag);
  }

  closeModalWindow(): void {
  this.dialogRef.close();
  }

  selectDrawing(value: number) {
    // if(this.inputService.isNotEmpty) {
    //     this.dialog.open(DisplayConfirmationComponent);
    //     this.inputService.drawingHtml = this.displayedData[value].html;

    //   }

    // // else {
    //   this.inputService.drawingHtml = this.displayedData[value].html;
    //   console.log(this.displayedData[value].html);
    //   console.log(this.inputService.drawingHtml);
    //   this.eventEmitter.appendToDrawingSpace();
    //   this.closeModalWindow();
    //   this.inputService.isNotEmpty = true;

    // }

    this.inputService.drawingHtml = this.dataTable[value].html;
    this.eventEmitter.appendToDrawingSpace();

  }
}
