import { Component, Input} from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { StampService } from 'src/app/services/shapes/stamp.service';
import { BRUSH, TOOL } from '../../../constants';
import { EllipseService } from './../../services/shapes/ellipse.service';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  brush: typeof BRUSH;
  @Input()selectedTool: TOOL;
  sides: number;
  test = 25;

  constructor(private colorService: ColorService,
              private rectangleService: RectangleService,
              private penService: PenService,
              private brushService: BrushService,
              private stampService: StampService,
              private inputService: InputService,
              private gridService: GridService ,
              private ellipseService: EllipseService,
              private polygonService: PolygonService) {
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
    } else if (this.selectedTool === TOOL.polygon) {
      this.polygonService.polygonType = event.value;
      this.polygonService.assignPolygonType();
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

  getStampService(): StampService {
    return this.stampService;
  }

  getInputService(): InputService {
    return this.inputService;
  }

  getGridService(): GridService {
    return this.gridService;
  }

}
