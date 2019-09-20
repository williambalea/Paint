import { Component, Input} from '@angular/core';
import {Preview} from '../../../../../common/interface/preview'
import {Rectangle} from '../../services/shapes/classes/rectangle'
import {Shape} from '../../services/shapes/classes/shape'
import { ShapesService } from '../../services/shapes/shapes.service'

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
  shapeStrokeWidth: Number = 1;
  shapeFillType = 'Define me!';

  strokeColor = 'Define me!';
  strokeWidth = 1;
  fillColor = 'Define me!';

  currentBrushTexture = ' Style #1';

  show= true;

  rectangle: Rectangle = new Rectangle(1, 2, 3, 4,'black', "black", 5);

  selectBrush(): void {
    this.brushState = true;
  }

  selectPen(): void {
    this.brushState = false;
  }

  assignType1Fill() {
    this.shapeFillType = 'Type #1';
    this.shapeService.strokeEnable = true;
    this.shapeService.fillEnable = false;
    this.shapeService.removeColor(this.shapeService.fillColor);
    return false;
  }

  assignType2Fill() {
    this.shapeFillType = 'Type #2';
    this.shapeService.strokeEnable = false;
    this.shapeService.removeColor(this.shapeService.strokeColor);
    this.shapeService.fillEnable = true;
    return false;
  }

  assignType3Fill() {
    this.shapeFillType = 'Type #3';
    this.shapeService.strokeEnable = true;
    this.shapeService.fillEnable = true;
    return false;
  }

  assignBrushTexture(parameter: string) {
    if (parameter === 'option1') {
      this.currentBrushTexture = 'texture1';
    }
    if (parameter === 'option2') {
      this.currentBrushTexture = 'texture2';
    }
    if (parameter === 'option3') {
      this.currentBrushTexture = 'texture3';
    }
    if (parameter === 'option4') {
        this.currentBrushTexture = 'texture4';
    }
    if (parameter === 'option5') {
      this.currentBrushTexture = 'texture5';
    }
  }

  assignStrokeWidth(value: number) {
    this.shapeService.strokeWidth = value;
    return false;
  }

  assignStrokeColor(value: string) {
    this.shapeStrokeColor = value;
    return false;
  }

  assignFillColor(value: string) {
    this.shapeFillColor = value;
    return false;
  }

  assignDrawStrokeWidth(value: number) {
    this.strokeWidth = value;
    return false;
  }

}
