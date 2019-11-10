import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, NB, STRINGS } from 'src/constants';
import { SVGJSON } from '../../../../../common/communication/SVGJSON';
import { DisplayConfirmationComponent } from '../display-confirmation/display-confirmation.component';

@Component({
  selector: 'app-get-file-modalwindow',
  styleUrls: ['./get-file-modalwindow.component.scss'],
  templateUrl: './get-file-modalwindow.component.html',
})
export class GetFileModalwindowComponent implements OnInit, OnDestroy {

  dataTable: SVGJSON[];
  tag: string;
  tags: string[];
  displayedData: SVGJSON[];
  filteredThroughTagData: SVGJSON[];
  filterActivated: boolean;
  caughtGetError: boolean;

  constructor( private dialog: MatDialog,
               private dialogRef: MatDialogRef<GetFileModalwindowComponent>,
               private inputService: InputService,
               private eventEmitter: EventEmitterService,
               public communicationService: CommunicationsService) {
    this.dataTable = [];
    this.tags = [];
    this.displayedData = [];
    this.filteredThroughTagData = [];
    this.filterActivated = false;
    this.caughtGetError = false;
    this.inputService.gridShortcutsActive = false;
  }

  ngOnDestroy() {
    this.inputService.gridShortcutsActive = true;
  }

  ngOnInit(): void {
    this.communicationService.testReturnIndex().subscribe(
      (table: SVGJSON[]) => {
      this.dataTable = table;
      this.selectMostRecent(this.dataTable);
      this.caughtGetError = false;
      this.communicationService.isLoading = false;
      },
      (error) => {
        window.alert(STRINGS.serverNotAvailable);
        this.caughtGetError = true;
      },
    );
    this.filterActivated = false;
  }

  removeTags(value: number): void {
    this.tags.splice(value, 1);
    this.updateDisplayTable();
  }

  selectMostRecent(table: SVGJSON[]): void {
    this.displayedData = [];
    for (let i: number = table.length - 1; i >= 0; i--) {
      this.displayedData.push(table[i]);
    }
  }

  displayWithFilter(): void {
    for (let i: number = this.dataTable.length; i++;) {
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
    this.updateDisplayTable();
  }

  updateDisplayTable(): SVGJSON[] {
    const temporaryDisplayTable: SVGJSON[] = [];
    if (this.tags.length !== 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.dataTable.length; i++) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.tags.length; j++) {
          if (this.dataTable[i].tags.includes(this.tags[j])) {
            temporaryDisplayTable.push(this.dataTable[i]);
            break;
          }
        }
      }
      this.displayedData = temporaryDisplayTable.reverse();
    } else {
      this.displayedData = this.dataTable.reverse();
    }
    return temporaryDisplayTable;
  }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  selectDrawing(value: number): void {
    if (this.caughtGetError) {
      window.alert(STRINGS.unableToGetPicture);
      this.caughtGetError = false;
    } else {
      this.communicationService.isLoading = true;
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
