import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject, of } from 'rxjs';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';

@Injectable({
  providedIn: 'root',
})
export class FileParametersServiceService {
  // TODO: QA
  tempx: number;
  tempy: number;
  tempz: string;
  tempresize: boolean ;
  canvasWidth: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
  canvasHeight: BehaviorSubject<number>  = new BehaviorSubject<number>(window.innerHeight);
  resizeFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  canvasColor: BehaviorSubject<string> = new BehaviorSubject<string>('white');
  canvaswidth$ = this.canvasWidth.asObservable();
  canvasheight$ = this.canvasHeight.asObservable();
  resizeflag$ = this.resizeFlag.asObservable();
  dialogRef: MatDialogRef<NewFileModalwindowComponent, any>;
  newFile: boolean;

  constructor() {
    this.newFile = false;
    this.tempresize = false;
  }

  getTempResize(): boolean {
    return this.tempresize;
  }

  getObservableValue() { return of('observable value'); }

  setParameters(canvaswidth: number, canvasheight: number): void {
    this.tempx = canvaswidth;
    this.tempy = canvasheight;
  }

  changeParameters(widht: number, height: number) {
    this.resizeFlag.next(this.tempresize);
    this.canvasWidth.next(widht);
    this.canvasHeight.next(height);
  }

}
