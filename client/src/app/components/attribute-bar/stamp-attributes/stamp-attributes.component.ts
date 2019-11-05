import { Component } from '@angular/core';
import { InputService } from 'src/app/services/input.service';
import { StampService } from 'src/app/services/shapes/stamp.service';

@Component({
  selector: 'app-stamp-attributes',
  templateUrl: './stamp-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class StampAttributesComponent {

  constructor(public stampService: StampService,
              public inputService: InputService) { }

}
