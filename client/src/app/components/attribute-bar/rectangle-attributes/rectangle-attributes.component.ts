import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';

@Component({
  selector: 'app-rectangle-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './rectangle-attributes.component.html',
})
export class RectangleAttributesComponent {

  constructor(public rectangleService: RectangleService,
              public colorService: ColorService) { }

  radioChangeHandler(event: MatRadioChange): void {
    this.rectangleService.rectangleType = event.value;
    this.rectangleService.assignRectangleType();
  }
}
