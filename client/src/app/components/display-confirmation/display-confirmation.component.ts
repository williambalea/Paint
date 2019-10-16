import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/input.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


@Component({
  selector: 'app-display-confirmation',
  templateUrl: './display-confirmation.component.html',
  styleUrls: ['./display-confirmation.component.scss']
})
export class DisplayConfirmationComponent implements OnInit {

  constructor(private inputService : InputService, private eventEmitterService :EventEmitterService) { }

  ngOnInit() {
    console.log(this.inputService.isNotEmpty);
  }
  confirm() : void {
    this.eventEmitterService.appendToDrawingSpace();
  }
 
}
