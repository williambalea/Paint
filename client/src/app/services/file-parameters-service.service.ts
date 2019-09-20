import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NewFileModalwindowComponent } from '../components/new-file-modalwindow/new-file-modalwindow.component';

@Injectable({
  providedIn: 'root',
})
export class FileParametersServiceService {

 canvasWidth = new BehaviorSubject<number>(500);
 canvasHeight = new BehaviorSubject<number>(500);
 canvasColor = new BehaviorSubject<string>('white');
 canvaswidth$ = this.canvasWidth.asObservable();
 canvasheight$ = this.canvasHeight.asObservable();
 canvascolor$ = this.canvasColor.asObservable();
 dialogRef: MatDialogRef<NewFileModalwindowComponent, any> ;
 newFile = false;

 changeParameters(widht: number, height: number, color: string) {
   this.canvasWidth.next(widht);
   this.canvasHeight.next(height);
   this.canvasColor.next(color);
 }

  subscribeToChanges(dialogref: MatDialogRef<NewFileModalwindowComponent, any>) {
    dialogref.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.canvasWidth = result;
      console.log('essai', this.canvasWidth);
    });

  }
}
