import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { EllipseService } from 'src/app/services/shapes/ellipse.service';

@Component({
  selector: 'app-ellipse-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './ellipse-attributes.component.html',
})
export class EllipseAttributesComponent {

  constructor(public ellipseService: EllipseService,
              public colorService: ColorService) { }

  radioChangeHandler(event: MatRadioChange): void {
    this.ellipseService.ellipseType = event.value;
    this.ellipseService.assignEllipseType();
  }

}
