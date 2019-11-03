import { Component, HostListener } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { KEY, NB } from 'src/constants';

@Component({
  selector: 'app-grid-attributes',
  templateUrl: './grid-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss'],
})
export class GridAttributesComponent {

  gridSize: number;
  usingGrid: boolean;
  constructor(protected gridService: GridService,
              protected textService: TextService,
              protected eventEmitterService: EventEmitterService) {
    this.gridService.gridSize = NB.Fifty;
    this.usingGrid = false;
  }

  onGridToggle(): void {
    this.toggleGrid();
  }

  showGrid(): void {
    this.eventEmitterService.showGrid();
  }

  hideGrid(): void {
    this.eventEmitterService.hideGrid();
  }

  toggleGrid(): void {
    this.usingGrid = !this.usingGrid;
    this.usingGrid ? this.showGrid() : this.hideGrid();
  }

  applyGrid(): void {
    this.usingGrid = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case KEY.g:
        this.toggleGrid();
        break;
      case KEY.plus:
          this.applyGrid();
          this.gridService.setNextGridSize();
          this.showGrid();
          break;
      case KEY.minus:
          this.applyGrid();
          this.gridService.setLastGridSize();
          this.showGrid();
          break;
      default:
    }
  }

}
