import { Component,  HostListener , OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HIDE_DIALOG, key } from '../../../../../common/constants';
import { ShapesService } from '../../services/shapes/shapes.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import { Subscription } from 'rxjs';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
//import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';
//import { NewFileModalwindowComponent } from '../new-file-modalwindow/new-file-modalwindow.component';

//import { SideBarComponent } from '../side-bar/side-bar.component';
//import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {
  canvasWidth: number ; // user intput
  canvasHeight: number ; // user input
  canvasColor : string ;
  subscription:Subscription;

  
  
  width : number = 0;
  enableKeyPress: boolean;
  shiftPressed: boolean;

  // TODO: make an interface
  fill: string;
  stroke: string;
  strokeWidth: number;

  previewActive = false;
  preview: Preview;
  origin: Mouse;
 
  
  constructor(private dialog: MatDialog,private shapeService: ShapesService,private fileParameters: FileParametersServiceService,)
   {
    this.enableKeyPress = false;  
  
   }


  ngOnInit(): void {
    if (!sessionStorage.getItem(HIDE_DIALOG)) {
      this.openDialog();
    } else {
      this.enableKeyPress = true;
    }

    this.subscription = this.fileParameters.canvaswidth$
       .subscribe(canvasWidth => this.canvasWidth = canvasWidth);
    this.subscription = this.fileParameters.canvasheight$
       .subscribe(canvasHeight => this.canvasHeight = canvasHeight);
    this.subscription = this.fileParameters.canvascolor$
       .subscribe(canvasColor => this.canvasColor = canvasColor);
  }
 

  
  // canvas resize
	@HostListener('window:resize', ['$event'])
	onResize(event: { target: { innerWidth: number; }; }) {
    this.width = event.target.innerWidth-500;
    this.canvasWidth = event.target.innerWidth-500;
    
    
  }


  openDialog(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> =
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed()
    .subscribe((hideDialog: boolean) => { this.closeDialog(hideDialog); });
  }

  closeDialog(hideDialog: boolean): void {
    if (hideDialog) {
      sessionStorage.setItem('hideDialog', JSON.stringify(hideDialog));
    }
    this.enableKeyPress = true;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.enableKeyPress) {
      if (event.key === key.shift) {
        this.shiftPressed = true;
        this.shapeService.setSquareOffset();
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === key.shift) {
      this.shiftPressed = false;
      this.shapeService.setRectangleOffset();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.TEMPORARYsetRectStyle();
    this.shapeService.setMouseOrigin(event);
  }

  @HostListener('mousemove', ['$event'])
  setPreviewOffset(event: MouseEvent): void {
    this.shapeService.mouse = {x: event.offsetX, y: event.offsetY};
    if (this.shapeService.preview.active) {
      if (this.shiftPressed) {
        this.shapeService.setSquareOffset();
      } else {
        this.shapeService.setRectangleOffset();
      }
    }
  }

  @HostListener('mouseup')
  drawShape(): void {
    this.shapeService.drawRectangle(this.shapeService.preview, this.fill, this.stroke);
    this.shapeService.preview.active = false;
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<EntryPointComponent, any> =
      this.dialog.open(EntryPointComponent, { disableClose: true });

    dialogRef.afterClosed()
    .subscribe((hideDialog: boolean) => { this.closeDialog(hideDialog); });
  }

  closeDialog(hideDialog: boolean): void {
    if (hideDialog) {
      sessionStorage.setItem(HIDE_DIALOG, JSON.stringify(hideDialog));
    }
    this.enableKeyPress = true;
  }

  TEMPORARYsetRectStyle(): void {
    const r: number = Math.floor(Math.random() * 255);
    const g: number = Math.floor(Math.random() * 255);
    const b: number = Math.floor(Math.random() * 255);
    // const a: number = Math.round(Math.random());
    const strokeAlpha = this.shapeService.strokeEnable ? 1 : 0;
    const fillAlpha = this.shapeService.fillEnable ? 1 : 0;
    this.fill = this.TEMPORARYsetRGBAColor(r, g, b, fillAlpha);
    this.strokeWidth = 2;
    this.stroke = this.TEMPORARYsetRGBAColor(0, 0, 0, strokeAlpha);
  }

  // TODO: to be put elswhere
  TEMPORARYsetRGBAColor(r: number, g: number, b: number, a: number): string {
    return `rgb(${r},${g},${b},${a})`;
  }

}
