import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorService } from 'src/app/services/color/color.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, SVGinnerWidth } from 'src/constants';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { NewFileModalwindowComponent } from './new-file-modalwindow.component';

describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let fileParameters: FileParametersServiceService;
  let colorService: ColorService;
  let dialog: MatDialog;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;
  let dialogRef: MatDialogRef<NewFileModalwindowComponent>;
  let inputService: InputService;

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
    BrowserAnimationsModule,
    ],
    providers: [
    { provide: MatDialogRef, useValue: dialogMock },
    FileParametersServiceService,
    ],
    declarations: [ NewFileModalwindowComponent, DeleteConfirmationComponent ],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    ],
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [DeleteConfirmationComponent] } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileModalwindowComponent);
    inputService = TestBed.get(InputService);
    fileParameters = TestBed.get(FileParametersServiceService);
    dialogRef = TestBed.get(MatDialogRef);
    dialog = TestBed.get(MatDialog);
    colorService = TestBed.get(ColorService);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it ('should set default canvas width to maximum window width ', () => {
  //   const el = fixture.debugElement.query(By.css('input[type =canvasWidth]'));
  //   fixture.detectChanges();
  //   expect(Number(el.nativeElement.value)).toBe(window.innerWidth);
  // });

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

  it('canvas width input should not be valid if value =< 0 ', () => {
    component.assignForm();
    const form = component.form.controls.canvaswidth;
    form.setValue(0);
    expect(component.form.valid).toBeFalsy();
  });

  it('canvas height input should not be valid if value =< 0 ', () => {
    component.assignForm();
    const form = component.form.controls.canvasheight;
    form.setValue(0);
    expect(component.form.valid).toBeFalsy();
  });

  it('canvas width input should not be valid if not number ', () => {
    component.assignForm();
    const form = component.form.controls.canvaswidth;
    form.setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('canvas height input should not be valid if not number ', () => {
    component.assignForm();
    const form = component.form.controls.canvasheight;
    form.setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('submitParameters should set resize flag to true', () => {
    spyOn(component, 'validForm').and.returnValue(false);
    const spy = spyOn(component, 'assignForm').and.callThrough();
    component.submitParameters(10, 10);
    expect(spy).toHaveBeenCalled();
 });

  it ('submitParameters should create new drawing if canvas empty', () => {
    const spy = spyOn(component, 'createNewDrawing').and.callThrough();
    spyOn(component, 'validForm').and.returnValue(true);
    component.submitParameters(10, 10);
    expect(spy).toHaveBeenCalled();
  });

  it ('submitParameters should call deleteConfirmation if canvas not empty', () => {
    inputService.isDrawed = true;
    const spy = spyOn(component, 'deleteConfirmation').and.callThrough();
    spyOn(component, 'validForm').and.returnValue(true);
    component.submitParameters(10, 10);
    expect(spy).toHaveBeenCalled();
  });

  it ('submitParameters should close dialog', () => {
    spyOn(component, 'validForm').and.returnValue(true);
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.submitParameters(10, 10);
    expect(spy).toHaveBeenCalled();
  });

  it ('modifyCanvasDisplay should call corresponding colorService functions', () => {
    const spy1 = spyOn(colorService, 'changeBackgroundColor').and.callThrough();
    const spy2 = spyOn(colorService, 'setMakingColorChanges').and.callThrough();
    const spy3 = spyOn(colorService, 'setShowInAttributeBar').and.callThrough();
    const spy4 = spyOn(colorService, 'setShowBackgroundButton').and.callThrough();
    component.modifyCanvasDisplay();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
  });

  it ('createNewDrawing should call change parameters function and modify canvas function', () => {
    const spy1 = spyOn(fileParameters, 'changeParameters').and.callThrough();
    const spy2 = spyOn(component, 'modifyCanvasDisplay').and.callThrough();
    component.createNewDrawing(10, 10);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it ('deleteConfirmation should open delete confirmation dialog', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.deleteConfirmation(10, 10);
    expect(spy).toHaveBeenCalled();
  });

  it ('deleteConfirmation should call setParameters function', () => {
    const spy = spyOn(fileParameters, 'setParameters').and.callThrough();
    component.deleteConfirmation(10, 10);
    expect(spy).toHaveBeenCalled();
  });

  it ('closeModalWindow should call closeColorService', () => {
    const spy = spyOn(component, 'closeColorService').and.callThrough();
    component.closeModalWindow();
    expect(spy).toHaveBeenCalled();
  });

  it ('closeModalWindow should call dialogRef.close', () => {
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.closeModalWindow();
    expect(spy).toHaveBeenCalled();
  });

  it ('ngOnInit should call setting functions', () => {
    const spy1 = spyOn(component, 'assignCanvas').and.callThrough();
    const spy2 = spyOn(component, 'assignForm').and.callThrough();
    const spy3 = spyOn(colorService, 'setShowBackgroundButton').and.callThrough();
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it ('assignCanvas should set default canvas size to maximum values of screen window', () => {
    const canvasWidth = window.innerWidth - SVGinnerWidth;
    component.assignCanvas();
    expect(component.canvasWidth).toEqual(canvasWidth);
    expect(component.canvasHeight).toEqual(window.innerHeight);
  });

  it ('validForm should return true if', () => {
    component.ngOnInit();
    const form = component.form.controls.canvaswidth;
    form.setValue(70);

    const spy = spyOn(component, 'validForm').and.callThrough();
    component.validForm();
    expect(spy).toBeTruthy();
  });

  it ('should preventDefault if o and ctrl keys are entered', () => {
    const keyEvent = new KeyboardEvent('keydown', {key: KEY.o, ctrlKey: true});
    const eventSpy = spyOn(keyEvent, 'preventDefault');
    component.onKeyDown(keyEvent);
    expect(eventSpy).toHaveBeenCalled();

  });

  it ('should not preventDefault if o is not entered', () => {
    const keyEvent = new KeyboardEvent('keydown', {key: KEY.c, ctrlKey: true});
    const eventSpy = spyOn(keyEvent, 'preventDefault');
    component.onKeyDown(keyEvent);
    expect(eventSpy).not.toHaveBeenCalled();
  });

  it ('should not preventDefault if ctrl is not entered', () => {
    const keyEvent = new KeyboardEvent('keydown', {key: KEY.o, ctrlKey: false});
    const eventSpy = spyOn(keyEvent, 'preventDefault');
    component.onKeyDown(keyEvent);
    expect(eventSpy).not.toHaveBeenCalled();
  });

});
