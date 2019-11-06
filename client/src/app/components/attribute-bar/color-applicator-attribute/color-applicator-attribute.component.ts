import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-applicator-attribute',
  templateUrl: './color-applicator-attribute.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class ColorApplicatorAttributeComponent {
  constructor(public colorService: ColorService) {

  }

}
