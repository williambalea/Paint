
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { NewFileModalwindowComponent } from './new-file-modalwindow.component';

describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;
  // let fileParameters;

  const dialogMock = {
    close: () => {
    return;
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
    ReactiveFormsModule,
    MatDialogModule,
    ],
    providers: [
    { provide: MatDialogRef, useValue: dialogMock },
    FileParametersServiceService,
    ],
    declarations: [ NewFileModalwindowComponent ],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileModalwindowComponent);
    component = fixture.componentInstance;
    // fileParameters = new FileParametersServiceService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should set default canvas width to maximum window width ', () => {
    const el = fixture.debugElement.query(By.css('input[type =canvasWidth]'));
    fixture.detectChanges();
    expect(Number(el.nativeElement.value)).toBe(window.innerWidth);
  });

  it ('should set default canvas height to maximum window height', () => {
    const el = fixture.debugElement.query(By.css('input[type =canvasHeight]'));
    fixture.detectChanges();
    expect(Number(el.nativeElement.value)).toBe(window.innerHeight);
  });

  it('closeModalWindow should call closeColorService', () => {
    const spy = spyOn(component, 'closeColorService').and.callThrough();
    component.closeModalWindow();
    expect(spy).toHaveBeenCalled();
  });

  it('canvas width should not be valid if value < 0 ', () => {
    component.assignForm();
    const form = component.form.controls.canvaswidth;
    form.setValue(0);
    expect(component.form.valid).toBeFalsy();
  });

  it('canvas height should not be valid if value < 0 ', () => {
    component.assignForm();
    const form = component.form.controls.canvasheight;
    form.setValue(0);
    expect(component.form.valid).toBeFalsy();
  });

});
