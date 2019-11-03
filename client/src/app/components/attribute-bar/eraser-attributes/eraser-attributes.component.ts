import { Component } from '@angular/core';
import { EraserService } from 'src/app/services/eraser/eraser.service';

@Component({
  selector: 'app-eraser-attributes',
  templateUrl: './eraser-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class EraserAttributesComponent {

  constructor(protected eraserService: EraserService) { }

}
