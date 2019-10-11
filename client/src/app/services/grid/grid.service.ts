import { Injectable} from '@angular/core';
import { LINEARRAY, NB} from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  lineArray: LINEARRAY[];
  tempLineArray: LINEARRAY[];
  gridEnabled: boolean;
  gridRectangleDimension: number;
  numberXLines: number;
  numberYLines: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private fileParametersService: FileParametersServiceService) {
    this.gridEnabled = false;
    this.opacity = NB.Fifty;
    this.gridRectangleDimension = NB.OneHundred;
    this.lineArray = [{x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero}];
    this.tempLineArray = [{x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero}];
   }

  calculateNumberLine() {
    this.numberXLines = (this.canvasWidth / this.gridRectangleDimension) * (this.canvasHeight / this.canvasWidth);
    this.numberYLines = (this.canvasHeight / this.gridRectangleDimension) * (this.canvasWidth / this.canvasHeight);
  }

  buildGrid(): void {
    this.clearLineArray();
    if (this.gridEnabled) {
      this.canvasSizeModification();
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

  canvasSizeModification() {
    this.fileParametersService.canvaswidth$.subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    this.fileParametersService.canvasheight$.subscribe((canvasHeight) => this.canvasHeight = canvasHeight);
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
    this.buildGrid();
  }

  gridOpacityModification() {
    this.clearLineArray();
    this.buildGrid();
  }
}
