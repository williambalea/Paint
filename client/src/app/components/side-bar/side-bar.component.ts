import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaveFileModalwindowComponent } from 'src/app/components/save-file-modalwindow/save-file-modalwindow.component';
import { ColorService } from 'src/app/services/color/color.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { IncludingBoxService } from 'src/app/services/includingBox/including-box.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { LineService } from 'src/app/services/shapes/line.service';
import { NoShapeService } from 'src/app/services/shapes/no-shape.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { StampService } from 'src/app/services/shapes/stamp.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { HIDE_DIALOG, KEY, TOOL } from '../../../constants';
import { Shape } from '../../services/shapes/shape';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import { GetFileModalwindowComponent } from '../get-file-modalwindow/get-file-modalwindow.component';
import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';
import { EllipseService } from './../../services/shapes/ellipse.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [
    RectangleService,
    BrushService,
    PenService,
    EllipseService,
    PolygonService,
    StampService,
    GridService,
    SelectorService,
    IncludingBoxService,
    LineService,
    NoShapeService,
  ],

})
export class SideBarComponent implements OnInit, OnDestroy {

  selectedTool: string;
  selectedShape: Shape;
  enableKeyPress: boolean;

  constructor(private dialog: MatDialog,
              private colorService: ColorService,
              private rectangleService: RectangleService,
              private brushService: BrushService,
              private ellipseService: EllipseService,
              private polygonService: PolygonService,
              private unsubscribeService: UnsubscribeService,
              private stampService: StampService,
              private penService: PenService,
              private communicationsService: CommunicationsService,
              private selectorService: SelectorService,
              private lineService: LineService,
              private noShapeService: NoShapeService) {
    this.enableKeyPress = false;
    this.selectedShape = this.noShapeService;
  }

  ngOnInit(): void {
    !localStorage.getItem(HIDE_DIALOG) ? this.openEntryPoint() : this.enableKeyPress = true;
    this.communicationsService.listen().subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeService.onDestroy();
  }

  openEntryPoint(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> =
      this.dialog.open(EntryPointComponent, { disableClose: true });

    this.unsubscribeService.subscriptons.push(dialogRef.afterClosed()
      .subscribe((hideDialog: boolean) => { this.setLocalStorageTrace(hideDialog); }));
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
      case TOOL.pipette:
        this.selectedShape = this.noShapeService;
        this.selectedTool = TOOL.pipette;
        break;
      case TOOL.brush:
        this.selectedShape = this.brushService;
        this.selectedTool = TOOL.brush;
        break;
      case TOOL.pen:
        this.selectedShape = this.penService;
        this.selectedTool = TOOL.pen;
        break;
      case TOOL.colorApplicator:
        this.selectedShape = this.noShapeService;
        this.selectedTool = TOOL.colorApplicator;
        break;
      case TOOL.stamp:
        this.selectedShape = this.stampService;
        this.selectedTool = TOOL.stamp;
        break;
      case TOOL.grid:
        this.selectedShape = this.noShapeService;
        this.selectedTool = TOOL.grid;
        break;
      case TOOL.ellipse:
        this.selectedShape = this.ellipseService;
        this.selectedTool = TOOL.ellipse;
        break;
      case TOOL.polygon:
        this.selectedShape = this.polygonService;
        this.selectedTool = TOOL.polygon;
        break;
      case TOOL.selector:
        this.selectedTool = TOOL.selector;
        this.selectedShape = this.selectorService;
        break;
      case TOOL.line:
        this.selectedShape = this.lineService;
        this.selectedTool = TOOL.line;
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
      this.dialog.open(NewFileModalwindowComponent, { disableClose: true });
    this.unsubscribeService.subscriptons.push(dialogRef.afterClosed()
      .subscribe(() => { this.enableKeyPress = true; }));

    this.setColorNewFile();
  }

  saveOnServer(): void {
    this.enableKeyPress = false;

    const dialogRefSave: MatDialogRef<SaveFileModalwindowComponent, any> =
      this.dialog.open(SaveFileModalwindowComponent, { disableClose: true });
    this.unsubscribeService.subscriptons.push(dialogRefSave.afterClosed()
      .subscribe(() => { this.enableKeyPress = true; }));
  }

  accessServer(): void {
    this.enableKeyPress = false;
    const dialogRefGet: MatDialogRef<GetFileModalwindowComponent, any> =
      this.dialog.open(GetFileModalwindowComponent, { disableClose: true });
    this.unsubscribeService.subscriptons.push(dialogRefGet.afterClosed()
      .subscribe(() => {
        this.enableKeyPress = true;
      }));
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) {
      switch (event.key) {
        case KEY.o:
          event.preventDefault();
          this.createNewFile();
          break;
        case KEY.one:
          this.selectTool(TOOL.rectangle);
          break;
        case KEY.w:
          this.selectTool(TOOL.brush);
          break;
        case KEY.c:
          this.selectTool(TOOL.pen);
          break;
        case KEY.r:
          this.selectedTool = TOOL.colorApplicator;
          break;
        case KEY.g:
          this.selectedTool = TOOL.colorApplicator;
          break;
        case KEY.two:
          this.selectedShape = this.ellipseService;
          break;
        default:
      }
    }
  }
}
