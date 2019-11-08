import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { provideAutoMock } from 'src/test.helpers.spec';
import { ViewChildService } from '../services/view-child.service';
import { ExportService } from './../services/export.service';
import { ExportModalComponent } from './export-modal.component';

describe('ExportModalComponent', () => {
  let component: ExportModalComponent;
  let viewChildService: ViewChildService;
  let fixture: ComponentFixture<ExportModalComponent>;
  let exportService: ExportService;
  // let renderer: Renderer2;
  // let rendererFactory: RendererFactory2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportModalComponent],
      providers: [
        ExportModalComponent,
        Renderer2,
        provideAutoMock(ViewChildService),
        provideAutoMock(ExportService),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatDialogModule,
      ],
    })
      .compileComponents();
    viewChildService = TestBed.get(ViewChildService);
    component = TestBed.get(ExportModalComponent);
    exportService = TestBed.get(ExportService);
    // rendererFactory = TestBed.get(RendererFactory2);
    // renderer = rendererFactory.createRenderer(null, null);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModalComponent);
    component = fixture.componentInstance;

    // tslint:disable-next-line: no-string-literal
    exportService.canvas = new ElementRef(document.createElement('div'));
    viewChildService.defs = new ElementRef(document.createElement('div'));
    viewChildService.htmlCanvas = new ElementRef(document.createElement('canvas'));
    viewChildService.drawingBoard = new ElementRef(document.createElement('canvas'));

    fixture.autoDetectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download image if not svg selected', () => {
    component.selectedFormat = 'jpeg';
    component.click();
    expect(exportService.download).toHaveBeenCalled();
  });

  it('should not download image if svg selected', () => {
    component.selectedFormat = 'svg';
    component.click();
    expect(exportService.download).not.toHaveBeenCalled();
  });

});
