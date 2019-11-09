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
  styleUrls: ['./attribute-bar.component.scss'],
  templateUrl: './attribute-bar.component.html',
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  @Input() selectedTool: TOOL;
  gridSize: number;

  constructor(public colorService: ColorService,
              public gridService: GridService,
              protected textService: TextService,
              protected inputService: InputService,
              protected eventEmitterService: EventEmitterService,
              public undoRedoService: UndoRedoService,
              ) {
    this.gridService.gridSize = NB.Fifty;
    this.tool = TOOL;
  }

  onGridToggle(): void {
    this.toggleGrid();
  }

  toggleGrid(): void {
    this.gridService.isUsingGrid = !this.gridService.isUsingGrid;
    this.gridService.isUsingGrid ? this.gridService.showGrid() : this.gridService.hideGrid();
  }

  applyGrid(): void {
    this.gridService.isUsingGrid = true;
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
            this.gridService.showGrid();
            break;
        case KEY.minus:
            this.applyGrid();
            this.gridService.setLastGridSize();
            this.gridService.showGrid();
            break;
        default:
      }
    }
  }
}
