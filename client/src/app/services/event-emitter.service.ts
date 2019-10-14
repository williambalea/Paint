import { Injectable, EventEmitter } from '@angular/core';    
   
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeGridFunction = new EventEmitter();     
    
  constructor() { }    
    
  onAttributeBarComponentButtonClick() {    
    this.invokeGridFunction.emit();    
  }    
}  