import { Component } from '@angular/core';
import { EraserService } from 'src/app/services/eraser/eraser.service';

@Component({
  selector: 'app-eraser-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './eraser-attributes.component.html',
})
export class EraserAttributesComponent {

  constructor(public eraserService: EraserService) { }

}
