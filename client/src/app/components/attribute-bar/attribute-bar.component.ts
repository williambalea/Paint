import { Component, Input} from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { LineService} from 'src/app/services/shapes/line.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { BRUSH, LINE_PATTERN, STROKE_DASHARRAY_STYLE, TOOL } from '../../../constants';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  brush: typeof BRUSH;
  lineStyle: typeof LINE_PATTERN;
  dashStyle: typeof STROKE_DASHARRAY_STYLE;
  @Input()selectedTool: TOOL;

  constructor(private colorService: ColorService,
              private rectangleService: RectangleService,
              private penService: PenService,
              private brushService: BrushService,
              private lineService: LineService) {
    this.tool = TOOL;
    this.brush = BRUSH;
    this.lineStyle = LINE_PATTERN;
    this.dashStyle = STROKE_DASHARRAY_STYLE;
  }

  radioChangeHandler(event: MatRadioChange): void {
    this.rectangleService.rectangleType = event.value;
    this.rectangleService.assignRectangleType();
  }

  brushRadioChangeHandler(event: MatRadioChange): void {
    this.brushService.changeFilter(event.value);
  }

  lineStypeRadioChangeHandler(event: MatRadioChange): void {
    this.lineService.dashArrayType = event.value;
    this.lineService.assignStrokeStyle();
  }

  getColorService(): ColorService {
    return this.colorService;
  }

  getPenService(): PenService {
    return this.penService;
  }

  getBrushService(): BrushService {
    return this.brushService;
  }

  getLineService(): LineService {
    return this.lineService;
  }

}
