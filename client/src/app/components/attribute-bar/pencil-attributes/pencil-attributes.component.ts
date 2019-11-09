import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { PencilService } from 'src/app/services/shapes/pencil.service';

@Component({
  selector: 'app-pencil-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './pencil-attributes.component.html',
})
export class PencilAttributesComponent {

  constructor(public pencilService: PencilService,
              public colorService: ColorService) { }

}
