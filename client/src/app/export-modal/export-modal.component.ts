import { Component, OnInit } from '@angular/core';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements OnInit {

  constructor(private exportService : ExportService) {}

  ngOnInit() {
    console.log(this.exportService.downloadLink);
  }

}
