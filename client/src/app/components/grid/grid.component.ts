import { Component } from '@angular/core';
import { LINEARRAY } from 'src/constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { GridService } from '../../services/grid/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {

  myArray: LINEARRAY[];

  constructor(private fileService: FileParametersServiceService,
              private gridService: GridService = new GridService(fileService)) {
    this.gridService.canvasWidth = this.fileService.canvasWidth.getValue();
    this.gridService.canvasHeight = this.fileService.canvasHeight.getValue();
    this.gridService.gridSizeModification();
    this.myArray = this.gridService.lineArray;
  }
}
