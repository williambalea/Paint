import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { UploadModalComponent } from './upload-modal.component';

describe('UploadModalComponent', () => {
  let component: UploadModalComponent;
  // let dialogRef: MatDialogRef<UploadModalComponent>;
  let fixture: ComponentFixture<UploadModalComponent>;

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
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadModalComponent);
    // dialogRef = TestBed.get(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
