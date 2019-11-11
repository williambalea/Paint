import { UploadService } from './../services/upload.service';
import { provideAutoMock } from './../../test.helpers.spec';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UploadModalComponent } from './upload-modal.component';

describe('UploadModalComponent', () => {
  let component: UploadModalComponent;
  let dialogRef: MatDialogRef<UploadModalComponent>;
  let fixture: ComponentFixture<UploadModalComponent>;
  let uploadService: UploadService;

  const dialogMock = {
      close: () => {
      return;
      },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadModalComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        provideAutoMock(UploadService),
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadModalComponent);
    dialogRef = TestBed.get(MatDialogRef);
    uploadService = TestBed.get(UploadService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close method from dialogRef on no click', () => {
    const spy = spyOn(dialogRef, 'close');
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should allow download if type svg+xml', () => {
    // const list: FileList = {length: 10, item}
    const blob = new Blob([''], { type: 'image/svg+xml' });
    // tslint:disable-next-line: no-string-literal
    blob['lastModifiedDate'] = '';
    // tslint:disable-next-line: no-string-literal
    blob['name'] = 'filename';
    const file =  blob as File;
    const fileList = {
      0: file,
      1: file,
      length: 2,
      // tslint:disable-next-line: object-literal-sort-keys
      item: (index: number) => file,
    };
    const spy = spyOn(window, 'alert');
    component.onChange(fileList);
    expect(uploadService.enableUploadButton).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should throw alert if not type svg+xml', () => {
    // const list: FileList = {length: 10, item}
    const blob = new Blob([''], { type: 'image/notsvg+xml' });
    // tslint:disable-next-line: no-string-literal
    blob['lastModifiedDate'] = '';
    // tslint:disable-next-line: no-string-literal
    blob['name'] = 'filename';
    const file =  blob as File;
    const fileList = {
      0: file,
      1: file,
      length: 2,
      // tslint:disable-next-line: object-literal-sort-keys
      item: (index: number) => file,
    };
    const spy = spyOn(window, 'alert');
    component.onChange(fileList);
    expect(uploadService.enableUploadButton).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

});
