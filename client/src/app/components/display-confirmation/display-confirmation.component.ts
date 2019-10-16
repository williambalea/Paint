import { Component } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-display-confirmation',
  templateUrl: './display-confirmation.component.html',
  styleUrls: ['./display-confirmation.component.scss'],
})
export class DisplayConfirmationComponent {

  constructor(
              private dialogRef: MatDialogRef<DisplayConfirmationComponent>,
              private eventEmitterService: EventEmitterService) { }

  confirm(): void {
    this.eventEmitterService.appendToDrawingSpace();
    this.dialogRef.close();
  }

}
