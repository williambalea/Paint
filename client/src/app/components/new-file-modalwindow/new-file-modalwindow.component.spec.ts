import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
//import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { NewFileModalwindowComponent } from './new-file-modalwindow.component';
//import { ColorService } from 'src/app/services/color/color.service';

describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;
 /* let dialogRef: MatDialogRef<NewFileModalwindowComponent, any>;
  let builder: FormBuilder;
  let shapeService: ShapesService;
  let dialog: MatDialog;
  let colorService : ColorService;*/
  let fileParameters;
  const dialogMock = {
    close: () => { }
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
    fileParameters = new FileParametersServiceService();
   // shapeService = new ShapesService();
    //colorService = new ColorService();

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
  
  it('close() should call dialogRef.close,', () =>{
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
     component.close();
     expect(spy).toHaveBeenCalled(); 
  });

  it('close() should call setMakingColorChanges', () =>{
    let spy = spyOn(component.colorService, 'setMakingColorChanges').and.callThrough();
     component.close();
     expect(spy).toHaveBeenCalled(); 
  });

  it('close() should call setShowInAttributeBar', () =>{
    let spy = spyOn(component.colorService, 'setShowInAttributeBar').and.callThrough();
     component.close();
     expect(spy).toHaveBeenCalled(); 
  });


  it ('submitParameters(canvasWidth, canvasHeight) should set resize flag to true', () => {
    spyOn(fileParameters, 'getTempResize').and.returnValue(false);
    fixture.detectChanges();
    component.submitParameters(3, 4);
    fixture.detectChanges();
    expect(component.fileParameters.tempresize).toBeTruthy();
  });
});
