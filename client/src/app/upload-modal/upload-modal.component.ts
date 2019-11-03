
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  error : boolean;
  constructor(public dialogRef: MatDialogRef<UploadModalComponent>,
              private uploadService : UploadService,
             ) { this.error = false;}

  ngOnInit() {
  }
  fileContent: string = '';
 
  public onChange(fileList: FileList): void {
   

    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = (() => {
      self.fileContent = fileReader.result as string;
   
      this.uploadService.fileContent = self.fileContent.slice(96,-6);
      console.log(this.uploadService.fileContent.slice(0,2));
      for (let i = 25; i < 1000; i++) {
        console.log(this.uploadService.fileContent[i]);
        this.uploadService.backgroundColor += this.uploadService.fileContent[i];
        if(this.uploadService.fileContent[i] === ')'){
          break;
        }
      }
    
    }) 
  if(file.type === 'image/svg+xml'){
    this.uploadService.enableUploadButton = true;
    fileReader.readAsText(file);
  }
  else 
    window.alert('test');
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
