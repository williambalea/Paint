import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { LINEARRAY, NB} from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  lineArray: LINEARRAY[];
  gridRectangleDimension: number;

  // // These 2 will be used.
  // canvasWidth: Observable<number>;
  // canvasHeight: Observable<number>;

  // However I'm testing with these 2 mocked values
  mockWidth: number;
  mockHeight: number;
  numberXLines: number;
  numberYLines: number;

  constructor() {
    // // first two lines are for testing purpose right now
    // this.canvasWidth = fileParametersService.canvaswidth$;
    // this.canvasHeight = fileParametersService.canvasheight$;
    this.gridRectangleDimension = NB.FortyTwo;
    this.mockHeight = 1000;
    this.mockWidth = 1000;
    this.lineArray = [{x1: 1, x2: 2, y1: 3, y2: 4}];
   }

  calculateNumberLine() {
    this.numberXLines = this.mockWidth / this.gridRectangleDimension;
    this.numberYLines = this.mockHeight / this.gridRectangleDimension;
  }

  buildGrid(): void {
    this.calculateNumberLine();
    for (let i = 0; i < this.numberXLines; i++) {
      // We print the horizontal lines
      this.addHorizontalLine(i);
      }

    for (let j = 0; j < this.numberYLines; j++) {
      // We print the vertical lines
      this.addVerticalLine(j);
    }
  }

  addHorizontalLine(beginingHeight: number) {
    const yLineSpacing = beginingHeight * this.gridRectangleDimension;
    const thisLine = {x1: 0, x2: this.mockWidth, y1: yLineSpacing, y2: yLineSpacing };
    this.lineArray.push(thisLine);
  }
  addVerticalLine(beginingWidth: number) {
    const xLineSpacing = beginingWidth * this.gridRectangleDimension;
    const thisLine = {x1: xLineSpacing, x2: xLineSpacing, y1: 0, y2: this.mockHeight };
    this.lineArray.push(thisLine);
  }
}
