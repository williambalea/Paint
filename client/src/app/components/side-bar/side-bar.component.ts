import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {

  test: number;
  showRectangle = false;
  showBrushTool = false;
  showPenTool = false;
  showPipette  = false;
  canvasWidth: number;
  newFile = false;

  constructor(private dialog: MatDialog, private colorService: ColorService) {

  }

  setValue(value: number): void {
    this.test = value;
    switch (value) {
      case 1:
        this.showRectangle = !this.showRectangle;
        this.showBrushTool = false;
        this.showPenTool = false;
        this.showPipette = false;
        break;
      case 2:
          this.showRectangle = false;
          this.showBrushTool = !this.showBrushTool;
          this.showPenTool = false;
          this.showPipette = false;
          break;
      case 3:
          this.showRectangle = false;
          this.showBrushTool = false;
          this.showPenTool = !this.showPenTool;
          this.showPipette = false;
          break;
      case 4:
          this.showRectangle = false;
          this.showBrushTool = false;
          this.showPenTool = false;
          this.showPipette = !this.showPipette;
          break;
    }
  }

  createNewFile() {
    this.dialog.open(NewFileModalwindowComponent);
    this.colorService.setMakingColorChanges(true);
  }
}
