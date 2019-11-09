import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef, Renderer2 } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { provideAutoMock } from 'src/test.helpers.spec';
import { ExportService } from '../services/export.service';
import { ViewChildService } from '../services/view-child.service';
import { DownloadModalComponent } from './download-modal.component';

describe('DownloadModalComponent', () => {
  let component: DownloadModalComponent;
  let fixture: ComponentFixture<DownloadModalComponent>;
  let viewChildService: ViewChildService;
  let exportService: ExportService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadModalComponent ],
      providers: [
        DownloadModalComponent,
        Renderer2,
        provideAutoMock(ViewChildService),
        provideAutoMock(ExportService),
      ],
      imports: [
        MatDialogModule,
      ],
    })
    .compileComponents();
    viewChildService = TestBed.get(ViewChildService);
    component = TestBed.get(DownloadModalComponent);
    exportService = TestBed.get(ExportService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadModalComponent);
    component = fixture.componentInstance;

    exportService.canvas = new ElementRef(document.createElement('div'));
    viewChildService.defs = new ElementRef(document.createElement('div'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
