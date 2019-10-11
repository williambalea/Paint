import { EllipseService } from './../../services/shapes/ellipse.service';
import { Component, Input} from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { BRUSH, TOOL } from '../../../constants';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  brush: typeof BRUSH;
  @Input()selectedTool: TOOL;

  constructor(private colorService: ColorService,
              private rectangleService: RectangleService,
              private penService: PenService,
              private brushService: BrushService,
              private ellipseService: EllipseService) {
    this.tool = TOOL;
    this.brush = BRUSH;
  }

  radioChangeHandler(event: MatRadioChange): void {
    if (this.selectedTool === TOOL.rectangle) {
      this.rectangleService.rectangleType = event.value;
      this.rectangleService.assignRectangleType();
    } else if (this.selectedTool === TOOL.ellipse) {
      this.ellipseService.ellipseType = event.value;
      this.ellipseService.assignRectangleType();
    }

  }

  brushRadioChangeHandler(event: MatRadioChange): void {
    this.brushService.changeFilter(event.value);
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

}
