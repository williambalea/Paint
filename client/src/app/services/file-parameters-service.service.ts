import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FileParametersServiceService {
  
 // Observable navItem source
 canvasWidth = new BehaviorSubject<number>(500);
 canvasHeight = new BehaviorSubject<number>(500);
 canvasColor = new BehaviorSubject<string>("white");
 // Observable navItem stream
 canvaswidth$ = this.canvasWidth.asObservable();
 canvasheight$ = this.canvasHeight.asObservable();
 canvascolor$ = this.canvasColor.asObservable();
 // service command
 changeParameters(widht: number, height : number, color : string) {
   this.canvasWidth.next(widht);
   this.canvasHeight.next(height);
   this.canvasColor.next(color);
 }


  dialogRef: MatDialogRef<NewFileModalwindowComponent, any> ;
 // canvasWidth : number=300;
  newFile : boolean = false;
  constructor() {
   }

  subscribeToChanges(dialogref : MatDialogRef<NewFileModalwindowComponent, any>) {
    dialogref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.canvasWidth = result;
      console.log("essai",this.canvasWidth);
    });

  }
}
