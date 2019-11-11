import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { provideAutoMock } from 'src/test.helpers.spec';
import { ViewChildService } from '../services/view-child.service';
import { DownloadModalComponent } from './download-modal.component';

describe('DownloadModalComponent', () => {
  let component: DownloadModalComponent;
  let fixture: ComponentFixture<DownloadModalComponent>;
  let viewChildService: ViewChildService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadModalComponent ],
      providers: [
        DownloadModalComponent,
        Renderer2,
        provideAutoMock(ViewChildService),
      ],
      imports: [
        MatDialogModule,
      ],
    })
    .compileComponents();
    viewChildService = TestBed.get(ViewChildService);
    component = TestBed.get(DownloadModalComponent);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadModalComponent);
    component = fixture.componentInstance;

    viewChildService.defs = new ElementRef(document.createElement('div'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should svg attributes', () => {
    // tslint:disable-next-line: no-string-literal
    const spy = spyOn(component['renderer'], 'setAttribute');
    let element: SVGGraphicsElement;
    element = renderer.createElement('rect', 'svg');
    component.setAttributeSVG(element);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
