import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {

  invokeGridFunction1 = new EventEmitter();
  invokeGridFunction2 = new EventEmitter();

  onAttributeBarComponentButtonClick1() {
    this.invokeGridFunction1.emit();
  }

  onAttributeBarComponentButtonClick2() {
    this.invokeGridFunction2.emit();
  }
}
