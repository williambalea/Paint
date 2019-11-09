import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-applicator-attribute',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './color-applicator-attribute.component.html',
})
export class ColorApplicatorAttributeComponent {
  constructor(public colorService: ColorService) {
  }
}
