import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService {

  subscriptons: Subscription[] ;
  constructor() {
    this.subscriptons = [];
  }

  onDestroy() {
    this.subscriptons.forEach((subscription) => subscription.unsubscribe());
  }
}
