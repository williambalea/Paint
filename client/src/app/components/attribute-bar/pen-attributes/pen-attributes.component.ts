import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { PenService } from 'src/app/services/shapes/pen.service';

@Component({
  selector: 'app-pen-attributes',
  templateUrl: './pen-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class PenAttributesComponent {
  private readonly oneThird = 1 / 3;
  private readonly twoThirds = 2 / 3;
  secondStrokeSize: number;
  thirdStrokeSize: number;

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
