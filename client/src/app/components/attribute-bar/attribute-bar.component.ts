import { Component, Input} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { TOOL, BRUSH } from '../../../constants';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
//import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  brush: typeof BRUSH;
  @Input()selectedTool: TOOL;
  //form: FormGroup;
  sides: number;

  constructor(private colorService: ColorService,
              private rectangleService: RectangleService,
              private penService: PenService,
              private brushService: BrushService,
             // private formBuilder: FormBuilder,
              private polygonService : PolygonService) {
    this.tool = TOOL;
    this.brush = BRUSH;
    console.log(this.polygonService.sideNumber);
  }


  radioChangeHandler(event: { target: {value: string}; }): void {
    if (this.selectedTool == TOOL.rectangle){
      this.rectangleService.rectangleType = event.target.value;
      this.rectangleService.assignRectangleType();
    }
    else if (this.selectedTool == TOOL.polygon){
      this.polygonService.polygonType = event.target.value;
      this.polygonService.assignPolygonType();
    }
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
