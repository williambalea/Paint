import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeGridFunction = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onAttributeBarComponentButtonClick() {    
    this.invokeGridFunction.emit();    
  }    
}  