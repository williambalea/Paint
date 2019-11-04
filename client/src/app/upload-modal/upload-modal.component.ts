
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { InputService } from '../services/input.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent implements OnDestroy {

  error: boolean;
  fileContent = '';
  constructor(public dialogRef: MatDialogRef<UploadModalComponent>,
              private uploadService: UploadService,
              private inputService: InputService) {
    this.error = false;
    this.inputService.gridShortcutsActive = false;
  }

  ngOnDestroy() {
    this.inputService.gridShortcutsActive = true;
  }

  onChange(fileList: FileList): void {

    const file = fileList[0];
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = (() => {
      self.fileContent = fileReader.result as string;

      this.uploadService.fileContent = self.fileContent.slice(96, -6);
      console.log(this.uploadService.fileContent.slice(0, 2));
      for (let i = 28; i < 1000; i++) {
        console.log(this.uploadService.fileContent[i]);
        this.uploadService.backgroundColor += this.uploadService.fileContent[i];
        if (this.uploadService.fileContent[i] === ')') {
          break;
        }
      }

    });
    if (file.type === 'image/svg+xml') {
    this.uploadService.enableUploadButton = true;
    fileReader.readAsText(file);
  } else {
    window.alert('file could not be uploaded, please choose a file with an svg format');
  }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
