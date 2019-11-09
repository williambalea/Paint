import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { PenService } from 'src/app/services/shapes/pen.service';

@Component({
  selector: 'app-pen-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './pen-attributes.component.html',
})
export class PenAttributesComponent {
  secondStrokeSize: number;
  thirdStrokeSize: number;
  private readonly oneThird = 1 / 3;
  private readonly twoThirds = 2 / 3;

  constructor(public penService: PenService,
              public colorService: ColorService) {
                this.setNewMiddleSizes();
              }

  validateStrokes() {
    if (this.penService.minStrokeWidth > this.penService.maxStrokeWidth) {
      this.penService.maxStrokeWidth = this.penService.minStrokeWidth;
      this.penService.minStrokeWidth = this.penService.maxStrokeWidth - 1;
    }
    this.setNewMiddleSizes();
  }

  setNewMiddleSizes(): void {
    this.secondStrokeSize = this.penService.maxStrokeWidth - this.penService.minStrokeWidth;
    this.thirdStrokeSize = this.secondStrokeSize;
    this.secondStrokeSize *= this.oneThird;
    this.thirdStrokeSize *= this.twoThirds;
    this.secondStrokeSize += this.penService.minStrokeWidth;
    this.thirdStrokeSize += this.penService.minStrokeWidth;
  }

}
