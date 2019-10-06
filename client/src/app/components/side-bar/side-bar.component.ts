import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color/color.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { HIDE_DIALOG, KEY, TOOL } from '../../../constants';
import { Shape } from '../../services/shapes/shape';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';
import { PolygonService } from 'src/app/services/shapes/polygon.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [RectangleService, BrushService, PenService,
    PolygonService
  ],
})
export class SideBarComponent implements OnInit {
  // tool: typeof TOOL;
  selectedTool: string;

  selectedShape: Shape;

  enableKeyPress: boolean;
  

  constructor(private dialog: MatDialog,
              private colorService: ColorService,
              private rectangleService: RectangleService,
              private brushService: BrushService,
              private penService: PenService,
              private polygonService: PolygonService,
            ) {
    // this.tool = TOOL;
    this.enableKeyPress = false;
    this.selectedShape = this.penService;

  }

  ngOnInit(): void {
    !localStorage.getItem(HIDE_DIALOG) ? this.openEntryPoint() : this.enableKeyPress = true;
  }

  openEntryPoint(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> =
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed()
    .subscribe((hideDialog: boolean) => { this.setLocalStorageTrace(hideDialog); });
  }

  setLocalStorageTrace(hideDialog: boolean): void {
    if (hideDialog) {
      localStorage.setItem(HIDE_DIALOG, JSON.stringify(hideDialog));
    }
    this.enableKeyPress = true;
  }

  selectTool(tool: string): void {
   switch (tool) {
    case TOOL.rectangle:
      this.selectedShape = this.rectangleService;
      this.selectedTool = TOOL.rectangle;
      break;
    case TOOL.brush:
        this.selectedShape = this.brushService;
        this.selectedTool = TOOL.brush;
        break;
    case TOOL.pen:
        this.selectedShape = this.penService;
        this.selectedTool = TOOL.pen;
        break;
    case TOOL.colorApplicator :
        this.selectedTool = TOOL.colorApplicator;
        break;
    case TOOL.polygon:
        console.log('allo1');
        this.selectedShape = this.polygonService;
        this.selectedTool = TOOL.pen;
        break;
    default:
   }

  }

  setColorNewFile(): void {
    this.colorService.setMakingColorChanges(true);
    this.colorService.setShowInAttributeBar(false);
  }

  createNewFile(): void {
    this.enableKeyPress = false;

    const dialogRef: MatDialogRef<NewFileModalwindowComponent, any> =
      this.dialog.open(NewFileModalwindowComponent, {disableClose: true});
    dialogRef.afterClosed()
      .subscribe((hideDialog: boolean) => { this.enableKeyPress = true; });

    this.setColorNewFile();

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) {
      switch (event.key) {
        case KEY.o:
          this.createNewFile();
          break;
        case KEY.one:
          this.selectedShape = this.rectangleService;
          // this.selectedTool = TOOL.rectangle;
          break;
        case KEY.w:
            this.selectedShape = this.brushService;
            break;
        case KEY.c:
            this.selectedShape = this.penService;
            break;
        case KEY.r:
            this.selectedTool = TOOL.colorApplicator;
            break;
        default:
      }
    }
  }
}
