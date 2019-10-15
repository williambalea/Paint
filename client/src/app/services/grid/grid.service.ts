import { Injectable, Renderer2 } from '@angular/core';
import { LINEARRAY, NB} from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  lineArray: LINEARRAY[];
  gridEnabled: boolean;
  gridRectangleDimension: number;
  horizontalLinesCount: number;
  verticalLinesCount: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  grid: HTMLElement[];

  constructor(private fileParametersService: FileParametersServiceService,
              private renderer: Renderer2) {
    this.gridEnabled = true;
    this.opacity = NB.Fifty;
    this.gridRectangleDimension = NB.Forty;
    this.lineArray = [{x1: NB.Zero, x2: NB.Zero, y1: NB.Zero, y2: NB.Zero}];
    this.grid = [];
   }

  calculateNumberLine() {
    this.horizontalLinesCount = (this.canvasWidth / this.gridRectangleDimension) * (this.canvasHeight / this.canvasWidth);
    this.verticalLinesCount = (this.canvasHeight / this.gridRectangleDimension) * (this.canvasWidth / this.canvasHeight);
  }

  draw(): HTMLElement[] {
    // tslint:disable-next-line: prefer-for-of
    console.log(this.opacity);
    for (let i = 0; i < this.lineArray.length; i++) {
      this.grid.push(this.renderer.createElement('line', 'svg'));
      this.renderer.setAttribute(this.grid[i], 'x1', this.lineArray[i].x1.toString());
      this.renderer.setAttribute(this.grid[i], 'x2', this.lineArray[i].x2.toString());
      this.renderer.setAttribute(this.grid[i], 'y1', this.lineArray[i].y1.toString());
      this.renderer.setAttribute(this.grid[i], 'y2', this.lineArray[i].y2.toString());
      this.renderer.setStyle(this.grid[i], 'stroke-opacity', this.opacity/100);
      this.renderer.setStyle(this.grid[i], 'stroke', 'red');
    }
    return this.grid;
  }

  buildGrid(): void {
    this.clearLineArray();
    console.log(this.lineArray.length);
    if (this.gridEnabled) {
      this.canvasSizeModification();
      this.calculateNumberLine();
      for (let i = NB.Zero; i < this.horizontalLinesCount; i++) {
        this.addHorizontalLine(i);
        }
      for (let j = NB.Zero; j < this.verticalLinesCount; j++) {
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
    this.lineArray = [];
  }

  canvasSizeModification() {
    this.fileParametersService.canvaswidth$.subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    this.fileParametersService.canvasheight$.subscribe((canvasHeight) => this.canvasHeight = canvasHeight);
  }

  gridSizeModification() {
    this.buildGrid();
  }

  hideGrid() {
    this.gridEnabled = false;
    this.clearLineArray();
  }

  showGrid() {
    this.gridEnabled = true;
    this.buildGrid();
  }

  setGridParameters(): void {
    this.canvasWidth = this.fileParametersService.canvasWidth.getValue();
    this.canvasHeight = this.fileParametersService.canvasHeight.getValue();
    this.gridSizeModification();
  }
}
