import { Component, Input} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { BRUSH, RECTANGLE_TYPE, TOOL } from '../../../constants';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  brush: typeof BRUSH;
  @Input()selectedTool: TOOL;

  selectedType: string;

  constructor(private colorService: ColorService,
              private rectangleService: RectangleService) {
    this.selectedType = RECTANGLE_TYPE.borderedAndFilled;
    this.tool = TOOL;
    this.brush = BRUSH;
  }

  radioChangeHandler(event: { target: {value: string}; }): void {
    this.selectedType = event.target.value;
    this.rectangleService.rectangleType = event.target.value;
    this.rectangleService.assignRectangleType();
  }

  getColorService(): ColorService {
    return this.colorService;
  }

}
