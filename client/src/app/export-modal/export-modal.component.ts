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
  constructor(private exportService : ExportService) {
    this.formats = ['jpg','png','bmp'];
    this.selectedFormat = EMPTY_STRING;
  }

  ngOnInit() {
    console.log(this.exportService.downloadLink);
  }

}
