import { Component} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-applicator-attributes',
  templateUrl: './color-applicator-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class ColorApplicatorAttributesComponent {

  constructor(protected colorService: ColorService) { }

}
