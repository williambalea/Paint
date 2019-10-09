import { Component, OnInit } from '@angular/core';
import { LINEARRAY } from 'src/constants';
import { GridService } from '../../services/grid/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit{

  myArray: LINEARRAY[];

  constructor(private gridService: GridService = new GridService()) {
    this.gridService.buildGrid();
    this.myArray = this.gridService.lineArray;
  }

  ngOnInit() {
    console.log(this.myArray[1].x1);
  }
}
