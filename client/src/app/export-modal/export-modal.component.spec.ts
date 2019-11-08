import { CUSTOM_ELEMENTS_SCHEMA, Renderer2, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { ExportService } from './../services/export.service';
import { ExportModalComponent } from './export-modal.component';
import { ViewChildService } from '../services/view-child.service';

class ExportServiceMock {
  download(): void {return; }
}

describe('ExportModalComponent', () => {
  let component: ExportModalComponent;
  let viewChildService: ViewChildService;
  let fixture: ComponentFixture<ExportModalComponent>;
  let exportService: ExportService;
  // let renderer: Renderer2;
  // let rendererFactory: RendererFactory2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportModalComponent ],
      providers: [
        ExportModalComponent,
        Renderer2,
        ViewChildService,
        { provide: ExportService, useClass: ExportServiceMock },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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

    viewChildService.defs = new ElementRef('allo');
    exportService.canvas = new ElementRef({width: 100, height: 100});
    fixture.autoDetectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should download image if not svg selected', () => {
  //   const spy = spyOn(exportService, 'download');
  //   component.selectedFormat = 'jpeg';
  //   component.click();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should not download image if svg selected', () => {
  //   const spy = spyOn(exportService, 'download');
  //   component.selectedFormat = 'svg';
  //   component.click();
  //   expect(spy).not.toHaveBeenCalled();
  // });

});
