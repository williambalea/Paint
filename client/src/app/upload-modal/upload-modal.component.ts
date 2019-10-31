
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

  constructor(
    private uploadService : UploadService
    ) { }

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
      console.log('self', this.uploadService.fileContent);
    }) 
    
    fileReader.readAsText(file.slice(96,-6));
  }

}
