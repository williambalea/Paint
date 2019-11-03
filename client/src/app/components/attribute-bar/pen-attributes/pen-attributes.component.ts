import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { PenService } from 'src/app/services/shapes/pen.service';

@Component({
  selector: 'app-pen-attributes',
  templateUrl: './pen-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class PenAttributesComponent {

  constructor(protected penService: PenService,
              protected colorService: ColorService) { }

}
