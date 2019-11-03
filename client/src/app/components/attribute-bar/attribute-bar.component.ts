import { Component, Input } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { TOOL } from '../../../constants';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  tool: typeof TOOL;
  @Input() selectedTool: TOOL;

  constructor(protected colorService: ColorService,
              protected undoRedoService: UndoRedoService) {
    this.tool = TOOL;
  }
}
