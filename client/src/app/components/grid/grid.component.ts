import { Component } from '@angular/core';
import { LINEARRAY } from 'src/constants';
import { GridService } from '../../services/grid/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {

  myArray: LINEARRAY[];

  constructor(private gridService: GridService = new GridService()) {
    this.gridService.buildGrid();
    this.myArray = this.gridService.lineArray;
  }
}
