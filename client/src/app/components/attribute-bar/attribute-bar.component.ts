import { Component, Input} from '@angular/core';
import {Preview} from '../../../../../common/interface/preview';
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
  @Input()showBrushTool: boolean;
  @Input()showPenTool: boolean;
  @Input()showPipette: boolean;

  selectedType = 'Bordered & Filled';
  currentBrushTexture = 'texture #5';

  constructor(private shapeService: ShapesService) {}
  preview: Preview;

  currentShape: Shape;
  brushState = false;
  shapeStrokeColor = 'Define me!';
  shapeFillColor = 'Define me!';
  shapeStrokeWidth = 1;
  penStrokeColor = 'Define me!';
  penStrokeWidth = 1;
  brushStrokeColor = 'Define me!';
  brushStrokeWidth = 1;

  fillColor = 'Define me!';

  show = true;

  selectBrush(): void {
    this.brushState = true;
  }

  selectPen(): void {
    this.brushState = false;
  }

  radioChangeHandler(event: { target: {value: string}; }) {
    this.selectedType = event.target.value;
    this.assignRectangleType();
  }

  radioChangeHandlerBrush(event: { target: {value: string}; }) {
    this.selectedType = event.target.value;
    this.assignBrushTexture();
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
    switch (this.selectedType) {
      case 'Style #1':
        this.currentBrushTexture = 'texture #1';
        break;
      case 'Style #2':
        this.currentBrushTexture = 'texture #2';
        break;
      case 'Style #3':
        this.currentBrushTexture = 'texture #3';
        break;
      case 'Style #4':
        this.currentBrushTexture = 'texture #4';
        break;
      case 'Style #5':
        this.currentBrushTexture = 'texture #5';
        break;
      default:
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

  assignBrushStrokeWidth(value: number) {
    this.brushStrokeWidth = value;
    return false;
  }

  assignPenStrokeWidth(value: number) {
    this.penStrokeWidth = value;
    return false;
  }

  shapeWidthSlider(value: number): void {
    this.shapeService.strokeWidth = value;
  }
  
  brushWidthSlider(value: number): void {
    this.brushStrokeWidth = value;
  }

  penWidthSlider(value: number): void {
    this.penStrokeWidth = value;
  }

}
