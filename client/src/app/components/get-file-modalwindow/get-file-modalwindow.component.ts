import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, NB } from 'src/constants';
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
               private dialog : MatDialog,
               private dialogRef: MatDialogRef<GetFileModalwindowComponent>,
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
    
      console.log('no filer', this.dataTable);
        this.selectMostRecent(this.dataTable);
    
     
      });
      this.filterActivated = false;
    
  }

  removeTags(value : number) : void {
    this.tags.splice(value,1);
    this.updateDisplayTable();

  }

  selectMostRecent(table : SVGJSON[]): void {
    let counter: number = NB.Zero;
    this.displayedData = [];
    for (let i: number = table.length - 1; i >= 0; i--) {
    this.displayedData.push(table[i]);
      counter++;
      if (counter === NB.Seven) {
        break;
      }
    }
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
     this.updateDisplayTable();
     console.log(this.displayedData);
   }


  updateDisplayTable() : SVGJSON[] {
    let temp : SVGJSON[]  = [];
    if(this.tags.length !==0 ) {
    for (let i : number = 0; i < this.dataTable.length; i++){
      for (let j : number = 0 ; j < this.tags.length; j ++){
        if ( this.dataTable[i].tags.includes(this.tags[j])){
          temp.push(this.dataTable[i]);
          break;
        }
      }
    }
  
    this.displayedData = temp.reverse();
  }
  else {
    this.displayedData =this.dataTable.reverse();
  }
    return temp;
  }

  closeModalWindow(): void {
  this.dialogRef.close();
  }

  selectDrawing(value: number) {
    this.inputService.drawingHtml = this.displayedData[value].html;
    this.inputService.drawingColor = this.displayedData[value].color;
    if (this.inputService.isNotEmpty) {
      this.dialog.open(DisplayConfirmationComponent).afterClosed().subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.eventEmitter.appendToDrawingSpace();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
      if (event.key === KEY.o) {
        if (event.ctrlKey) {
          event.preventDefault();
        }
          
      }
  }
}
