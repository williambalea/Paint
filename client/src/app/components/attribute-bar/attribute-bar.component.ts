import { Component, Input} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { BRUSH, RECTANGLE_TYPE, TOOL } from '../../../constants';
import { ShapesService } from '../../services/shapes/shapes.service';

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

  constructor(private shapeService: ShapesService, private colorService: ColorService) {
    this.selectedType = RECTANGLE_TYPE.borderedAndFilled;
    this.tool = TOOL;
    this.brush = BRUSH;
  }

  radioChangeHandler(event: { target: {value: string}; }): void {
    this.selectedType = event.target.value;
    this.assignRectangleType();
  }

  assignBorderedRectangle(): void {
    this.shapeService.strokeEnable = true;
    this.shapeService.fillEnable = false;
    this.shapeService.removeColor(this.shapeService.fillColor);
  }

  assignFilledRectangle(): void {
    this.shapeService.strokeEnable = false;
    this.shapeService.removeColor(this.shapeService.strokeColor);
    this.shapeService.fillEnable = true;
  }

  assignBorderedAndFilledRectangle(): void {
    this.shapeService.strokeEnable = true;
    this.shapeService.fillEnable = true;
  }

  assignRectangleType(): void {
    switch (this.selectedType) {
      case RECTANGLE_TYPE.bordered:
        this.assignBorderedRectangle();
        break;
      case RECTANGLE_TYPE.filled:
        this.assignFilledRectangle();
        break;
      case RECTANGLE_TYPE.borderedAndFilled:
        this.assignBorderedAndFilledRectangle();
        break;
      default:
    }
  }

  assignStrokeWidth(value: number): void {
    this.shapeService.rectangleStrokeWidth = value;
  }

  getColorService(): ColorService {
    return this.colorService;
  }

}
