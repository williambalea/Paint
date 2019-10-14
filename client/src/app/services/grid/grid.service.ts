import { ElementRef, Injectable, Renderer2, ViewChild} from '@angular/core';
import { LINEARRAY, NB} from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  lineArray: LINEARRAY[];
  gridEnabled: boolean;
  gridRectangleDimension: number;
  numberXLines: number;
  numberYLines: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  grid: HTMLElement[];

  constructor(private fileParametersService: FileParametersServiceService,
              private renderer: Renderer2) {
    this.gridEnabled = true;
    this.opacity = NB.Fifty;
    this.gridRectangleDimension = NB.OneHundred;
    this.lineArray = [{x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero}];
    this.grid = [];
   }

  calculateNumberLine() {
    this.numberXLines = (this.canvasWidth / this.gridRectangleDimension) * (this.canvasHeight / this.canvasWidth);
    this.numberYLines = (this.canvasHeight / this.gridRectangleDimension) * (this.canvasWidth / this.canvasHeight);
  }

  draw(): HTMLElement[] {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.lineArray.length; i++) {
      this.grid.push(this.renderer.createElement('line', 'svg'));
      this.renderer.setAttribute(this.grid[i], 'x1', this.lineArray[i].x1.toString());
      this.renderer.setAttribute(this.grid[i], 'x2', this.lineArray[i].x2.toString());
      this.renderer.setAttribute(this.grid[i], 'y1', this.lineArray[i].y1.toString());
      this.renderer.setAttribute(this.grid[i], 'y2', this.lineArray[i].y2.toString());
      this.renderer.setStyle(this.grid[i], 'stroke-opacity', this.opacity);
      this.renderer.setStyle(this.grid[i], 'stroke', 'red');
    }
    console.log(this.grid);
    return this.grid;
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
  }

  disableGrid() {
    this.gridEnabled = false;
    this.clearLineArray();
  }

  enableGrid() {
    this.gridEnabled = true;
    this.buildGrid();
  }

  setGridParameters(): void {
    this.canvasWidth = this.fileParametersService.canvasWidth.getValue();
    this.canvasHeight = this.fileParametersService.canvasHeight.getValue();
    this.gridSizeModification();
  }
}
