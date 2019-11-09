import { Component } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { MatDialogRef } from '@angular/material';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-display-confirmation',
  styleUrls: ['./display-confirmation.component.scss'],
  templateUrl: './display-confirmation.component.html',
})
export class DisplayConfirmationComponent {

  constructor(
    private dialogRef: MatDialogRef<DisplayConfirmationComponent>,
    private eventEmitterService: EventEmitterService,
    private communicationService: CommunicationsService) { }

  confirm(): void {
    this.communicationService.isLoading = true;
    this.eventEmitterService.appendToDrawingSpace();
    this.dialogRef.close();
  }

}
