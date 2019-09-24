import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';

@Injectable({
  providedIn: 'root',
})
export class FileParametersServiceService {
  tempx: number;
  tempy: number;
  tempz: string;
  tempresize : boolean;
  canvasWidth = new BehaviorSubject<number>(window.innerWidth);
  canvasHeight = new BehaviorSubject<number>(window.innerHeight);
  resizeFlag = new BehaviorSubject<boolean>(false);
  canvasColor = new BehaviorSubject<string>('white');
  canvaswidth$ = this.canvasWidth.asObservable();
  canvasheight$ = this.canvasHeight.asObservable();
  resizeflag$ = this.resizeFlag.asObservable();
  dialogRef: MatDialogRef<NewFileModalwindowComponent, any> ;
  newFile: boolean;

  changeParameters(widht: number, height: number) {
    this.resizeFlag.next(this.tempresize);
    this.canvasWidth.next(widht);
    this.canvasHeight.next(height);
  }

  constructor() {
    this.newFile = false;
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
