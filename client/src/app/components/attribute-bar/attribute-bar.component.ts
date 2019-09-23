import { Component, Input} from '@angular/core';
import { tool } from '../../../../../common/constants';
import {Preview} from '../../../../../common/interface/preview';
// import {Rectangle} from '../../services/shapes/classes/rectangle';
import {Shape} from '../../services/shapes/classes/shape';
import { ShapesService } from '../../services/shapes/shapes.service';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool = tool;
  @Input()selectedTool: tool;

  selectedType = 'Bordered & Filled';
  currentBrushTexture = 'texture #5';

  constructor(private shapeService: ShapesService) {}
  preview: Preview;

  get toolTypes() { return tool; }

  currentShape: Shape;
  brushState = false;
  shapeStrokeColor = 'Define me!';
  shapeFillColor = 'Define me!';
  shapeStrokeWidth = 1;

  strokeColor = 'Define me!';
  strokeWidth = 1;
  fillColor = 'Define me!';

  show = true;

  // rectangle: Rectangle = new Rectangle(1, 2, 3, 4, 'black', 'black', 5);

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

  assignDrawStrokeWidth(value: number) {
    this.strokeWidth = value;
    return false;
  }

  shapeWidthSlider(value: number): void {
    this.shapeService.strokeWidth = value;
  }

  widthSlider(value: number): void {
    this.strokeWidth = value;
  }
}
