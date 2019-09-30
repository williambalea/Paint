import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { NB } from 'src/constants';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';

@Injectable({
  providedIn: 'root',
})
export class FileParametersServiceService {
  tempx: number;
  tempy: number;
  tempresize: boolean;
  canvasWidth: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
  canvasHeight: BehaviorSubject<number>  = new BehaviorSubject<number>(window.innerHeight);
  resizeFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  canvasColor: BehaviorSubject<string> = new BehaviorSubject<string>('white');
  canvaswidth$: Observable<number>;
  canvasheight$: Observable<number>;
  resizeflag$: Observable<boolean>;
  dialogRef: MatDialogRef<NewFileModalwindowComponent, any>;
  newFile: boolean;

  constructor() {
    this.newFile = false;
    this.tempresize = false;
    this.tempx = NB.Zero;
    this.tempy = NB.Zero;
    this.tempresize = false;
    this.canvaswidth$ = this.canvasWidth.asObservable();
    this.canvasheight$ = this.canvasHeight.asObservable();
    this.resizeflag$ = this.resizeFlag.asObservable();
  }

  getTempResize(): boolean {
    return this.tempresize;
  }

  setParameters(canvaswidth: number, canvasheight: number): void {
    this.tempx = canvaswidth;
    this.tempy = canvasheight;
  }

  changeParameters(widht: number, height: number): void {
    this.resizeFlag.next(this.tempresize);
    this.canvasWidth.next(widht);
    this.canvasHeight.next(height);
  }

}
