import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { tool } from '../../../../../common/constants';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  tool = tool;
  selectedTool: tool;

  constructor(private dialog: MatDialog, private colorService: ColorService) {}

  selectTool(chosenTool: tool): void {
    this.selectedTool = chosenTool;
  }

  createNewFile() {
    this.dialog.open(NewFileModalwindowComponent);
    this.colorService.setMakingColorChanges(true);
  }
}
