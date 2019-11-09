import { Component } from '@angular/core';
import { InputService } from 'src/app/services/input.service';
import { StampService } from 'src/app/services/shapes/stamp.service';

@Component({
  selector: 'app-stamp-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './stamp-attributes.component.html',
})
export class StampAttributesComponent {

  constructor(public stampService: StampService,
              public inputService: InputService) { }

}
