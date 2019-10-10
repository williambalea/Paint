import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { LINEARRAY, NB} from 'src/constants';

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

  // // These 2 will be used.
  // canvasWidth: Observable<number>;
  // canvasHeight: Observable<number>;
  // However I'm testing with these 2 mocked values
  mockWidth: number;
  mockHeight: number;

  constructor() {
    this.gridEnabled = true;
    this.opacity = NB.One * NB.OneHundred;
    this.gridRectangleDimension = NB.OneHundred;
    this.mockHeight = 1000; // QA removed anyway in future
    this.mockWidth = 1000;  // QA removed anyway in future
    this.lineArray = [{x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero}];
    // Ask Ines
    // this.canvasWidth = fileParametersService.canvaswidth$;
    // this.canvasHeight = fileParametersService.canvasheight$;
   }

  calculateNumberLine() {
    this.numberXLines = this.mockWidth / this.gridRectangleDimension;
    this.numberYLines = this.mockHeight / this.gridRectangleDimension;
  }

  buildGrid(): void {
    this.calculateNumberLine();
    for (let i = NB.Zero; i < this.numberXLines; i++) {
      this.addHorizontalLine(i);
      }

    for (let j = NB.Zero; j < this.numberYLines; j++) {
      this.addVerticalLine(j);
    }
  }

  addHorizontalLine(beginingHeight: number) {
    const yLineSpacing = beginingHeight * this.gridRectangleDimension;
    const thisLine = {x1: NB.Zero, x2: this.mockWidth, y1: yLineSpacing, y2: yLineSpacing };
    this.lineArray.push(thisLine);
  }
  addVerticalLine(beginingWidth: number) {
    const xLineSpacing = beginingWidth * this.gridRectangleDimension;
    const thisLine = {x1: xLineSpacing, x2: xLineSpacing, y1: NB.Zero, y2: this.mockHeight };
    this.lineArray.push(thisLine);
  }

  clearLineArray() {
    const size = this.lineArray.length;
    for (let k = NB.Zero; k < size; k++) {
      this.lineArray[k] = {x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero};
    }
  }

  gridSizeModification() {
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
