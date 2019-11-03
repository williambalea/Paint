import { Injectable } from '@angular/core';
import { EMPTY_STRING } from 'src/constants';
import { EventEmitterService } from './event-emitter.service';
import { InputService } from './input.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  fileContent: string;
  enableUploadButton: boolean;
  backgroundColor: string;

  constructor(private eventEmitterService: EventEmitterService, private inputService: InputService) {
    this.enableUploadButton = false;
    this.backgroundColor = EMPTY_STRING;
  }

  confirm(): void {
    if (this.inputService.isDrawed) {
      if (window.confirm('please confirm export operation')) {
        this.eventEmitterService.upload();
      }
    } else {
      this.eventEmitterService.upload();
    }
  }
}
