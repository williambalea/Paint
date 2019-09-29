
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { NewFileModalwindowComponent } from './new-file-modalwindow.component';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { ColorService } from 'src/app/services/color/color.service';

describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let shapeService: ShapesService;
  let fileParameters : FileParametersServiceService;
  let colorService : ColorService;
  let dialog : MatDialog;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;
  let dialogRef : MatDialogRef<NewFileModalwindowComponent>;
  

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
    shapeService = TestBed.get(ShapesService);
    fileParameters = TestBed.get(FileParametersServiceService);
    dialogRef = TestBed.get(MatDialogRef);
    dialog = TestBed.get(MatDialog);
    colorService = TestBed.get(ColorService);
    component = fixture.componentInstance;
    
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
    const spy = spyOn(component, 'validForm').and.returnValue(true);
    component.submitParameters(10, 10);
    expect(spy).toHaveBeenCalled();
    expect(fileParameters.tempresize).toBeTruthy();
  });

  it ('submitParameters should create new drawing if canvas empty', () => {
    shapeService.shapes.length = 0;
    const spy = spyOn(component, 'createNewDrawing').and.callThrough();
    spyOn(component, 'validForm').and.returnValue(true);
    component.submitParameters(10, 10);
    expect(spy).toHaveBeenCalled();
  });

  it ('submitParameters should call deleteConfirmation if canvas not empty', () => {
    shapeService.shapes.length = 1;
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
    const spy_1 = spyOn(colorService, 'changeBackgroundColor').and.callThrough();
    const spy_2 = spyOn(colorService, 'setMakingColorChanges').and.callThrough();
    const spy_3 = spyOn(colorService, 'setShowInAttributeBar').and.callThrough();
    const spy_4 = spyOn(colorService, 'setShowBackgroundButton').and.callThrough();
    component.modifyCanvasDisplay();
    expect(spy_1).toHaveBeenCalled();
    expect(spy_2).toHaveBeenCalled();
    expect(spy_3).toHaveBeenCalled();
    expect(spy_4).toHaveBeenCalled();
  });

  it ('createNewDrawing should call change parameters function and modify canvas function', () => {
    const spy_1 = spyOn(fileParameters, 'changeParameters').and.callThrough();
    const spy_2 = spyOn(component, 'modifyCanvasDisplay').and.callThrough();
    component.createNewDrawing(10,10);
    expect(spy_1).toHaveBeenCalled();
    expect(spy_2).toHaveBeenCalled();
  });

  it ('deleteConfirmation should open delete confirmation dialog', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.deleteConfirmation(10,10);
    expect(spy).toHaveBeenCalled();
  });

  it ('deleteConfirmation should call setParameters function', () => {
    const spy = spyOn(fileParameters, 'setParameters').and.callThrough();
    component.deleteConfirmation(10,10);
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
    const spy_1 = spyOn(component, 'assignCanvas').and.callThrough();
    const spy_2 = spyOn(component, 'assignForm').and.callThrough();
    const spy_3 = spyOn(colorService, 'setShowBackgroundButton').and.callThrough();
    component.ngOnInit();
    expect(spy_1).toHaveBeenCalled();
    expect(spy_2).toHaveBeenCalled();
    expect(spy_3).toHaveBeenCalled();
  });

  it ('assignCanvas should set default canvas size to maximum values of screen window', () => {
    component.assignCanvas();
    expect(component.canvasWidth).toEqual(window.innerWidth);
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
});
