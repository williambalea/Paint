import { Component, Renderer2 } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { FileParametersServiceService } from 'src/app/services/file-parameters-service.service';
import { InputService } from 'src/app/services/input.service';
import { NB } from 'src/constants';
import { DrawingSpaceComponent } from '../drawing-space/drawing-space.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  gridRectangleDimension: number;
  gridAlpha: number;
  gridSize: {x: number, y: number};
  renderer: Renderer2;
  drawingSpace = new DrawingSpaceComponent(new FileParametersServiceService(), new ColorService(), new InputService(), this.renderer);

  // mock
  mockHeight = 10;
  mockWidth = 10;

  constructor() {
    // first two lines are for testing purpose right now
    this.drawingSpace.canvasHeight = this.mockHeight;
    this.drawingSpace.canvasWidth = this.mockWidth;
    this.gridRectangleDimension = NB.Five;
    this.gridAlpha = NB.OneHundred;
    this.gridSize.x = this.drawingSpace.canvasWidth;
    this.gridSize.y = this.drawingSpace.canvasHeight;
    // Probably will be called from a button in the grid tab, attribute bar
    this.buildGrid();
   }

  printVerticalLine(beginingWidth: number) {
    // Appel function native or whatever
    let xLineSpacing = beginingWidth * this.gridRectangleDimension; // Might have to ajust index for *1 or *0
    // fake function, will have to figure out what to use
    // printLine( [xLineSpacing, 0] to [xLineSpacing, this.drawingSpace.canvasHeight]);
  }

  printHorizontalLine(beginingHeight: number) {
    // Appel function native or whatever
    let yLineSpacing = beginingHeight * this.gridRectangleDimension;
    // fake function, will have to figure out what to use
    // printLine( [0, yLineSpacing] to [this.drawingSpace.canvasWidth, yLineSpacing]);
  }

  buildGrid(): void {
    const xLines = this.drawingSpace.canvasWidth / this.gridRectangleDimension;
    const yLines = this.drawingSpace.canvasHeight / this.gridRectangleDimension;

    for (let i = 0; i < xLines; i++) {
      // We print the horizontal lines
      this.printHorizontalLine(i);
      }

    for (let j = 0; j < yLines; j++) {
      // We print the vertical lines
      this.printVerticalLine(j);
    }
  }
}
