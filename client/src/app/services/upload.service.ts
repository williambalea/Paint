import { Injectable } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';
import { InputService } from './input.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  fileContent : string;

  constructor(private eventEmitterService : EventEmitterService, private inputService : InputService) { }

  confirm() : void {
    if(this.inputService.isDrawed){
      if(window.confirm('please confirm export operation')){
        this.eventEmitterService.upload();
      }
    }
    else 
      this.eventEmitterService.upload();
  }
}
