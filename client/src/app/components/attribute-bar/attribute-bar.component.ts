import { Component, Input} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { BRUSH, TOOL } from '../../../../../common/constants';
import { ShapesService } from '../../services/shapes/shapes.service';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  @Input()selectedTool: TOOL;

  selectedType: string;
  brushType: BRUSH;

  constructor(private shapeService: ShapesService, private colorService: ColorService) {
    this.selectedType = 'Bordered & Filled';
    this.tool = TOOL;
    this.brushType = BRUSH.smooth;
  }

  radioChangeHandler(event: { target: {value: string}; }) {
    this.selectedType = event.target.value;
    this.assignRectangleType();
  }

  assignRectangleType() {
    switch (this.selectedType) {
      case 'Bordered':
        this.shapeService.strokeEnable = true;
        this.shapeService.fillEnable = false;
        this.shapeService.removeColor(this.shapeService.fillColor);
        break;
      case 'Filled':
        this.shapeService.strokeEnable = false;
        this.shapeService.removeColor(this.shapeService.strokeColor);
        this.shapeService.fillEnable = true;
        break;
      case 'Bordered & Filled':
        this.shapeService.strokeEnable = true;
        this.shapeService.fillEnable = true;
        break;
      default:
    }
  }

  assignBrushTexture() {
    console.log(this.brushType);
  }

  assignStrokeWidth(value: number) {
    this.shapeService.rectangleStrokeWidth = value;
    return false;
  }

  getColorService(): ColorService {
    return this.colorService;
  }

}
