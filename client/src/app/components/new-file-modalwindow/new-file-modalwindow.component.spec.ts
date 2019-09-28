
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { NewFileModalwindowComponent } from './new-file-modalwindow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

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
    BrowserAnimationsModule
    ],
    providers: [
    { provide: MatDialogRef, useValue: dialogMock },
    FileParametersServiceService,
    ],
    declarations: [ NewFileModalwindowComponent,DeleteConfirmationComponent ],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    ],
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [DeleteConfirmationComponent] } })
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

  it("canvas width input should not be valid if value < 0 ", () => {
    component.assignForm();
    const form = component.form.controls.canvaswidth;
    form.setValue(0);
    expect(component.form.valid).toBeFalsy();
  });

  it("canvas height input should not be valid if value < 0 ", () => {
    component.assignForm();
    const form = component.form.controls.canvasheight;
    form.setValue(0);
    expect(component.form.valid).toBeFalsy();
  });

  it("canvas width input should not be valid if string ", () => {
    component.assignForm();
    const form = component.form.controls["canvaswidth"];
    form.setValue("");
    expect(component.form.valid).toBeFalsy();
  });

  it("canvas height input should not be valid if string ", () => {
    component.assignForm();
    const form = component.form.controls["canvasheight"];
    form.setValue("");
    expect(component.form.valid).toBeFalsy();
  });

 it("submitParameters should set resize flag to true",() => {
  const spy = spyOn(component, 'validForm').and.returnValue(true);
  component.submitParameters(10,10);
  expect(spy).toHaveBeenCalled();
  expect(component.fileParameters.tempresize).toBeTruthy();
 });

 it ("submitParameters should create new drawing if canvas empty",() =>{
  component.shapeService.shapes.length=0;
  const spy = spyOn(component, 'createNewDrawing').and.callThrough();
  spyOn(component, 'validForm').and.returnValue(true);
  component.submitParameters(10,10);
  expect(spy).toHaveBeenCalled();
});
 /*
 it ("submitParameters should call deleteConfirmation if canvas not empty",() =>{
  component.shapeService.shapes.length=1;
  const spy = spyOn(component, 'deleteConfirmation').and.callThrough();
  spyOn(component, 'validForm').and.returnValue(true);
  component.submitParameters(10,10);
  expect(spy).toHaveBeenCalled();
});*/


});
