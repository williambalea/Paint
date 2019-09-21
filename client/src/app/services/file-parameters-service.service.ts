import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';

@Injectable({
  providedIn: 'root',
})
export class FileParametersServiceService {
  tempx : number;
  tempy : number;
  tempz : string;
 // Observable navItem source
 canvasWidth = new BehaviorSubject<number>(window.innerWidth);
 canvasHeight = new BehaviorSubject<number>(window.innerHeight);
 canvasColor = new BehaviorSubject<string>("white");
 // Observable navItem stream
 canvaswidth$ = this.canvasWidth.asObservable();
 canvasheight$ = this.canvasHeight.asObservable();

 dialogRef: MatDialogRef<NewFileModalwindowComponent, any> ;
 newFile : boolean = false;

 changeParameters(widht: number, height: number) {
   console.log("service", widht);
   this.canvasWidth.next(widht);
   this.canvasHeight.next(height);
 }

 
  
  constructor() {
   }


  subscribeToChanges(dialogref : MatDialogRef<NewFileModalwindowComponent, any>) {
    dialogref.afterClosed().subscribe(result => {
      this.canvasWidth = result;
    });
  }
  
  setParameters(canvaswidth: number,canvasheight: number): void {
    this.tempx = canvaswidth;
    this.tempy = canvasheight;
   
    console.log(this.canvasWidth,this.canvasHeight);
  }

}
