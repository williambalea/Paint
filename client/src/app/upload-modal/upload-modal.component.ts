
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
              public uploadService: UploadService,
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

      this.uploadService.content = self.fileContent;
      this.uploadService.fileContent = self.fileContent.slice(96, -6);

      const widthIndex: number = self.fileContent.indexOf('width');
      for ( let i: number = widthIndex + 7; i < 112; i++) {
        if (this.uploadService.content[i] === '"') {
          break;
        }
        this.uploadService.width += this.uploadService.content[i];
      }
      const heightIndex: number = self.fileContent.indexOf('height');
      for ( let i: number = heightIndex + 8; i < 200; i++) {
        if (this.uploadService.content[i] === '"') {
          break;
        }
        this.uploadService.height += this.uploadService.content[i];
      }

      const colorIndex: number = self.fileContent.indexOf('rgb');
      for ( let i: number = colorIndex; i < 200; i++) {
        this.uploadService.backgroundColor += this.uploadService.content[i];
        if (this.uploadService.content[i] === ')') {
          break;
        }
      }

      const gIndex: number = self.fileContent.indexOf('<g');
      for ( let i: number = gIndex; i < this.uploadService.content.length; i++) {
        this.uploadService.g += this.uploadService.content[i];
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
