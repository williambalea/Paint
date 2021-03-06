import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { BRUSH } from 'src/constants';

@Component({
  selector: 'app-brush-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './brush-attributes.component.html',
})
export class BrushAttributesComponent {
  brush: typeof BRUSH;

  constructor(public brushService: BrushService,
              public colorService: ColorService) {
                this.brush = BRUSH;
  }

  brushRadioChangeHandler(event: MatRadioChange): void {
    this.brushService.changeFilter(event.value);
  }

}
