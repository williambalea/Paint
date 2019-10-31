import { Injectable } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  fileContent : string;

  constructor(private eventEmitterService : EventEmitterService) { }

  confirm() : void {
    this.eventEmitterService.upload();
  }
}
