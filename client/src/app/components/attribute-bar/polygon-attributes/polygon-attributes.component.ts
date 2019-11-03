import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { PolygonService } from 'src/app/services/shapes/polygon.service';

@Component({
  selector: 'app-polygon-attributes',
  templateUrl: './polygon-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class PolygonAttributesComponent {

  constructor(protected polygonService: PolygonService,
              protected colorService: ColorService) { }

  radioChangeHandler(event: MatRadioChange): void {
    this.polygonService.polygonType = event.value;
    this.polygonService.assignPolygonType();
  }

}
