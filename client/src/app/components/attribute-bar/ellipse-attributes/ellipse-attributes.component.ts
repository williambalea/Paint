import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { EllipseService } from 'src/app/services/shapes/ellipse.service';

@Component({
  selector: 'app-ellipse-attributes',
  templateUrl: './ellipse-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class EllipseAttributesComponent {

  constructor(protected ellipseService: EllipseService,
              protected colorService: ColorService) { }

  radioChangeHandler(event: MatRadioChange): void {
    this.ellipseService.ellipseType = event.value;
    this.ellipseService.assignEllipseType();
  }

}
