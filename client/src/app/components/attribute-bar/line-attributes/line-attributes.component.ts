import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { LineService } from 'src/app/services/shapes/line.service';
import { JUNCTIONSTYLE, LINE_PATTERN, LINECORNER, STROKE_DASHARRAY_STYLE } from 'src/constants';

@Component({
  selector: 'app-line-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './line-attributes.component.html',
})
export class LineAttributesComponent {

  linecorner: typeof LINECORNER;
  junctionStyle: typeof JUNCTIONSTYLE;
  lineStyle: typeof LINE_PATTERN;
  dashStyle: typeof STROKE_DASHARRAY_STYLE;

  constructor(public lineService: LineService,
              public colorService: ColorService) {
    this.linecorner = LINECORNER;
    this.lineStyle = LINE_PATTERN;
    this.junctionStyle = JUNCTIONSTYLE;
    this.dashStyle = STROKE_DASHARRAY_STYLE;
  }

  lineJunctionChangeHandler(event: MatRadioChange): void {
    this.lineService.junctionStyle = event.value;
    this.lineService.changeJunction();
  }

  lineStypeRadioChangeHandler(event: MatRadioChange): void {
    this.lineService.dashArrayType = event.value;
    this.lineService.assignStrokeStyle();
  }

}
