import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NewFileModalwindowComponent } from './new-file-modalwindow.component';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';


describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;
  let  dialogRef: MatDialogRef<NewFileModalwindowComponent, any>;
  let  builder: FormBuilder;
  let  shapeService: ShapesService;
  let dialog: MatDialog;
  let fileParameters
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        FileParametersServiceService
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
    fileParameters= new FileParametersServiceService();
    shapeService= new ShapesService();
   
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should set default canvas width to maximum window width ', () => {
    let el = fixture.debugElement.query(By.css('input[type =canvasWidth]'));
    fixture.detectChanges();
    expect(Number(el.nativeElement.value)).toBe(window.innerWidth);
  });

  it ('should set default canvas height to maximum window height', () => {
    let el = fixture.debugElement.query(By.css('input[type =canvasHeight]'));
    fixture.detectChanges();
    expect(Number(el.nativeElement.value)).toBe(window.innerHeight);
  });

  it ('submitParameters(canvasWidth, canvasHeight) should set resize flag to true', () => {
    const comp = new NewFileModalwindowComponent( fileParameters,dialog,shapeService,builder,dialogRef);
    spyOn(fileParameters, 'getTempResize').and.returnValue(false);
    fixture.detectChanges();
    // check hardcoded values
    comp.submitParameters(3,4);
    fixture.detectChanges();
    expect(comp.fileParameters.tempresize).toBeTruthy();
  });
 

});
