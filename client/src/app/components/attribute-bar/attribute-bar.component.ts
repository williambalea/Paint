import { Component, HostListener, Input } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { KEY, NB, TOOL } from '../../../constants';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  gridSize: number;
  usingGrid: boolean;

  constructor(protected colorService: ColorService,
              protected gridService: GridService,
              protected textService: TextService,
              protected inputService: InputService,
              protected eventEmitterService: EventEmitterService,
              protected undoRedoService: UndoRedoService) {
    this.gridService.gridSize = NB.Fifty;
    this.usingGrid = false;
    this.tool = TOOL;
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
    if (!this.textService.isWriting && this.inputService.gridShortcutsActive) {
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
}
