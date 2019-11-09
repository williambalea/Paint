import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { STRINGS } from 'src/constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';

@Component({
  selector: 'app-delete-confirmation',
  styleUrls: ['./delete-confirmation.component.scss'],
  templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent {

  message: string;
  constructor(private eventEmitterService: EventEmitterService,
              private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
              private colorService: ColorService,
              private fileParameters: FileParametersServiceService) {
    this.message = STRINGS.areYouSure;
  }

  clearColor(): void {
    this.colorService.changeBackgroundColor();
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }

  clear(): void {
    this.eventEmitterService.clearCanvas();
    this.fileParameters.changeParameters(this.fileParameters.tempx, this.fileParameters.tempy);
    this.clearColor();
    this.dialogRef.close(true);
  }
}
