import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';

@Injectable({
  providedIn: 'root',
})
export class FileParametersServiceService {
  // TODO: QA
  tempx: number;
  tempy: number;
  tempz: string;
  tempresize: boolean;
  canvasWidth: BehaviorSubject<number>;
  canvasHeight: BehaviorSubject<number>;
  resizeFlag: BehaviorSubject<boolean>;
  canvasColor: BehaviorSubject<string>;
  canvaswidth$ = this.canvasWidth.asObservable();
  canvasheight$ = this.canvasHeight.asObservable();
  resizeflag$ = this.resizeFlag.asObservable();
  dialogRef: MatDialogRef<NewFileModalwindowComponent, any>;
  newFile: boolean;

  constructor() {
    this.newFile = false;
    this.canvasWidth = new BehaviorSubject<number>(window.innerWidth);
    this.canvasHeight = new BehaviorSubject<number>(window.innerHeight);
    this.resizeFlag = new BehaviorSubject<boolean>(false);
    this.canvasColor = new BehaviorSubject<string>('white');
  }

  changeParameters(widht: number, height: number) {
    this.resizeFlag.next(this.tempresize);
    this.canvasWidth.next(widht);
    this.canvasHeight.next(height);
  }

  subscribeToChanges(dialogref: MatDialogRef<NewFileModalwindowComponent, any>) {
    dialogref.afterClosed().subscribe((result) => {
      this.canvasWidth = result;
    });
  }

  setParameters(canvaswidth: number, canvasheight: number): void {
    this.tempx = canvaswidth;
    this.tempy = canvasheight;

  }

}
