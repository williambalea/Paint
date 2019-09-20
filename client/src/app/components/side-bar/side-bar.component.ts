import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {

  test: number;
  showRectangle = false;
  showCircle = false;
  showDrawTool = false;
  showColorTool = false;
  showPipette  = false;
  canvasWidth: number;
  newFile = false;

  constructor(private dialog: MatDialog ) {

  }

  setValue(value: number): void {
    this.test = value;
    switch (value) {
      case 1:
        this.showRectangle = !this.showRectangle;
        this.showCircle = false;
        this.showColorTool = false;
        this.showDrawTool = false;
        this.showPipette = false;
        break;
      case 2:
          this.showRectangle = false;
          this.showCircle = !this.showCircle;
          this.showColorTool = false;
          this.showDrawTool = false;
          this.showPipette = false;
          break;
      case 3:
          this.showRectangle = false;
          this.showCircle = false;
          this.showColorTool = !this.showColorTool;
          this.showDrawTool = false;
          this.showPipette = false;
          break;
      case 4:
          this.showRectangle = false;
          this.showCircle = false;
          this.showColorTool = false;
          this.showDrawTool = !this.showDrawTool;
          this.showPipette = false;
          break;
      case 5:
          this.showRectangle = false;
          this.showCircle = false;
          this.showColorTool = false;
          this.showDrawTool = false;
          this.showPipette = !this.showPipette;
          break;
    }
  }

  createNewFile() {
  this.dialog.open(NewFileModalwindowComponent);
  }
}
