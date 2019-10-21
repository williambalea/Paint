import {HttpClientModule} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {AppComponent} from './app.component';
import {DrawingSpaceComponent} from './components/drawing-space/drawing-space.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import SpyObj = jasmine.SpyObj;
import { SafeHtmlPipe } from './safe-html.pipe';
import {IndexService} from './services/index/index.service';

describe('AppComponent', () => {
  let indexServiceSpy: SpyObj<IndexService>;

  beforeEach(() => {
    indexServiceSpy = jasmine.createSpyObj('IndexService', ['basicGet']);
    indexServiceSpy.basicGet.and.returnValue(of({title: '', body: ''}));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        AppComponent,
        SideBarComponent,
        DrawingSpaceComponent,
        SafeHtmlPipe,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {provide: IndexService, useValue: indexServiceSpy},
        {provide: MatDialog, useValue: {}},
      ],
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
