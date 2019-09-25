import { Component, Input} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { tool } from '../../../../../common/constants';
import {Preview} from '../../../../../common/interface/preview';
import {Shape} from '../../services/shapes/classes/shape';
import { ShapesService } from '../../services/shapes/shapes.service';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof tool;
  @Input()selectedTool: tool;

  selectedType: string;
  currentBrushTexture: string;
  preview: Preview;
  currentShape: Shape;
  brushState: boolean;
  shapeStrokeColor: string;
  shapeFillColor: string;
  shapeStrokeWidth: number;
  penStrokeColor: string;
  penStrokeWidth: number;
  brushStrokeColor: string;
  brushStrokeWidth: number;
  fillColor: string;
  show: boolean;

  constructor(private shapeService: ShapesService, private colorService: ColorService) {
    this.selectedType = 'Bordered & Filled';
    this.currentBrushTexture = 'texture #5';
    this.tool = tool;
    this.brushState = false;
    this.shapeStrokeColor = 'Define me!';
    this.shapeFillColor = 'Define me!';
    this.shapeStrokeWidth = 1;
    this.penStrokeColor = 'Define me!';
    this.penStrokeWidth = 1;
    this.brushStrokeColor = 'Define me!';
    this.brushStrokeWidth = 1;
    this.fillColor = 'Define me!';
    this.show = true;
  }

  get toolTypes() { return tool; }

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
    this.shapeService.rectangleStrokeWidth = value;
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
    this.shapeService.rectangleStrokeWidth = value;
  }

  brushWidthSlider(value: number): void {
    this.brushStrokeWidth = value;
  }

  penWidthSlider(value: number): void {
    this.shapeService.penStrokeWidth = value;
  }

  getColorService(): ColorService {
    return this.colorService;
  }

}
