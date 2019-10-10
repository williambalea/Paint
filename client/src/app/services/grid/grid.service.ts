import { Injectable } from '@angular/core';
import { LINEARRAY, NB} from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  lineArray: LINEARRAY[];
  gridRectangleDimension: number;
  gridEnabled: boolean;
  numberXLines: number;
  numberYLines: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(fileParametersService: FileParametersServiceService) {
    this.gridEnabled = false;
    this.opacity = NB.One * NB.OneHundred;
    this.gridRectangleDimension = NB.OneHundred;
    this.lineArray = [{x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero}];
    this.canvasHeight = fileParametersService.canvasHeight.getValue();
    this.canvasWidth = fileParametersService.canvasWidth.getValue();
    console.log(this.canvasHeight);
    console.log(this.canvasWidth);
   }

  calculateNumberLine() {
    console.log(this.canvasHeight);
    console.log(this.canvasWidth);
    this.numberXLines = (this.canvasWidth / this.gridRectangleDimension) * (this.canvasHeight / this.canvasWidth);
    this.numberYLines = (this.canvasHeight / this.gridRectangleDimension) * (this.canvasWidth / this.canvasHeight);
  }

  buildGrid(): void {
    if (this.gridEnabled) {
      this.calculateNumberLine();
      for (let i = NB.Zero; i < this.numberXLines; i++) {
        this.addHorizontalLine(i);
        }
      for (let j = NB.Zero; j < this.numberYLines; j++) {
        this.addVerticalLine(j);
      }
    }
  }

  addHorizontalLine(beginingHeight: number) {
    const yLineSpacing = beginingHeight * this.gridRectangleDimension;
    const thisLine = {x1: NB.Zero, x2: this.canvasWidth, y1: yLineSpacing, y2: yLineSpacing };
    this.lineArray.push(thisLine);
  }
  addVerticalLine(beginingWidth: number) {
    const xLineSpacing = beginingWidth * this.gridRectangleDimension;
    const thisLine = {x1: xLineSpacing, x2: xLineSpacing, y1: NB.Zero, y2: this.canvasHeight };
    this.lineArray.push(thisLine);
  }

  clearLineArray() {
    const size = this.lineArray.length;
    for (let k = NB.Zero; k < size; k++) {
      this.lineArray[k] = {x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero};
    }
  }

  gridSizeModification() {
    // this.canvasSizeModification();
    this.clearLineArray();
    this.buildGrid();
  }

  disableGrid() {
    this.gridEnabled = false;
    this.clearLineArray();
  }

  enableGrid() {
    this.gridEnabled = true;
    this.gridSizeModification();
  }

  gridOpacityModification() {
    this.clearLineArray();
    this.buildGrid();
  }
}
