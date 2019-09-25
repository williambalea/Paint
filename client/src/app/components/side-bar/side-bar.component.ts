import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { TOOL } from '../../../../../common/constants';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  // TODO QA
  tool: typeof TOOL;
  selectedTool: TOOL;

  constructor(private dialog: MatDialog, private colorService: ColorService) {
    this.tool = TOOL;
  }

  selectTool(chosenTool: TOOL): void {
    this.selectedTool = chosenTool;
  }

  createNewFile() {
    this.dialog.open(NewFileModalwindowComponent, {disableClose: true});
    this.colorService.setMakingColorChanges(true);
    this.colorService.setShowInAttributeBar(false);
  }
}
