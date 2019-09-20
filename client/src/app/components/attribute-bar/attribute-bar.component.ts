import { Component, Input} from '@angular/core';
import {Preview} from '../../../../../common/interface/preview';
import {Rectangle} from '../../services/shapes/classes/rectangle';
import {Shape} from '../../services/shapes/classes/shape';
import { ShapesService } from '../../services/shapes/shapes.service';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  @Input() test: number;
  @Input()showRectangle: boolean;
  @Input()showCircle: boolean;
  @Input()showDrawTool: boolean;
  @Input()showColorTool: boolean;
  @Input()showPipette: boolean;

  constructor(private shapeService: ShapesService) {}
  preview: Preview;

  currentShape: Shape;
  brushState = false;
  shapeStrokeColor = 'Define me!';
  shapeFillColor = 'Define me!';
  shapeStrokeWidth = 1;
  shapeFillType = 'Define me!';

  strokeColor = 'Define me!';
  strokeWidth = 1;
  fillColor = 'Define me!';

  currentBrushTexture = ' Style #1';

  show = true;

  rectangle: Rectangle = new Rectangle(1, 2, 3, 4, 'black', 'black', 5);

 selectBrush(): void {
   if (confirm('Are you sure you wish to chose the brush ?')) {
    this.brushState = true;
  }
 }

 selectPen(): void {
   if (confirm('Are you sure you wish to chose the pen ?')) {
     this.brushState = false;
   }
 }

      assignType1Fill() {
        if (confirm('Are you sure you wish to chose type 1 fill ?')) {
          this.shapeFillType = 'Type #1';
          this.shapeService.strokeEnable = true;
          this.shapeService.fillEnable = false;
        }
        return false;
      }

      assignType2Fill() {
        if (confirm('Are you sure you wish to chose type 2 fill ?')) {
          this.shapeFillType = 'Type #2';
          this.shapeService.strokeEnable = false;
          this.shapeService.fillEnable = true;
        }
        return false;
      }

      assignType3Fill() {
        if (confirm('Are you sure you wish to chose type 3 fill ?')) {
          this.shapeFillType = 'Type #3';
          this.shapeService.strokeEnable = true;
          this.shapeService.fillEnable = true;

        }
        return false;
      }

assignBrushTexture(parameter: string) {
  if (parameter === 'option1') {
    if (confirm('Are you sure you wish to choose brush type 1 ?')) {
      this.currentBrushTexture = 'texture1';
    }
  }
  if (parameter === 'option2') {
    if (confirm('Are you sure you wish to choose brush type 2 ?')) {
      this.currentBrushTexture = 'texture2';
    }
  }
  if (parameter === 'option3') {
    if (confirm('Are you sure you wish to choose brush type 3 ?')) {
      this.currentBrushTexture = 'texture3';
    }
  }
  if (parameter === 'option4') {
    if (confirm('Are you sure you wish to choose brush type 4 ?')) {
      this.currentBrushTexture = 'texture4';
  }
    }
  if (parameter === 'option5') {
    if (confirm('Are you sure you wish to choose brush type 5 ?')) {
      this.currentBrushTexture = 'texture5';
    }
  }
}

exitWindow() {
     if (confirm('Are you certain you wish to collapse this panel?')) {
      this.show = !this.show;
     }
}

assignStrokeWidth(value: number) {
  console.log(value);
  if (confirm('Are you sure you wish to enter: ' + value + ' ?')) {
    this.shapeService.strokeWidth = value;
  }
  return false;
}

assignStrokeColor(value: string) {
  console.log(value);
  if (confirm('Are you sure you wish to enter: ' + value + ' ?')) {
    this.shapeStrokeColor = value;
  }
  return false;
}

assignFillColor(value: string) {
  console.log(value);
  if (confirm('Are you sure you wish to enter: ' + value + '?')) {
    this.shapeFillColor = value;
  }
  return false;
}

assignPrimaryColor(value: string) {
  console.log(value);
  if (confirm('Are you sure you wish to enter: ' + value + '?')) {
    this.strokeColor = value;
  }
  return false;
}

assignSecondaryColor(value: string) {
  console.log(value);
  if (confirm('Are you sure you wish to enter: ' + value + '?')) {
    this.fillColor = value;
  }
  return false;
}

assignDrawStrokeWidth(value: number) {
  console.log(value);
  if (confirm('Are you sure you wish to enter: ' + value + '?')) {
    this.strokeWidth = value;
  }
  return false;
}

}
