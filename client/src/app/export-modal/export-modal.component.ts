import { Component, OnInit } from '@angular/core';
import { ExportService } from '../services/export.service';
import { EMPTY_STRING } from 'src/constants';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements OnInit {
  formats : string[];
  selectedFormat : string;
  name : string;
  fileName : string;

  constructor(private exportService : ExportService) {
    this.formats = ['jpg','png','bmp','svg'];
    this.selectedFormat = EMPTY_STRING;
    this.name = EMPTY_STRING;
    this.fileName = EMPTY_STRING;
  }

  ngOnInit() {
    console.log(this.exportService.downloadLink);
  }
  click(){
    if(window.confirm('please confirm export operation')){
      this.exportService.download(this.selectedFormat,this.fileName);
    };
  }

}
