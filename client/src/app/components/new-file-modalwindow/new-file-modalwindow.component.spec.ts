
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
/*
  it('should call submitParameters function when clicking submit button', async(() => {
    spyOn(component, 'submitParameters');
    const button = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.submitParameters).toHaveBeenCalled();
  }));
  

  it('close() should call dialogRef.close,', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.close();
    expect(spy).toHaveBeenCalled();
  });


    it('close() should call setShowInAttributeBar', () => {
      const spy = spyOn(component.colorService, 'setShowInAttributeBar').and.callThrough();
      component.close();
      expect(spy).toHaveBeenCalled();
    });

    it ('submitParameters(canvasWidth, canvasHeight) should set resize flag to true', () => {
      spyOn(fileParameters, 'getTempResize').and.returnValue(false);
      component.submitParameters(3, 4);
      fixture.detectChanges();
      expect(component.fileParameters.tempresize).toBeTruthy();
    });*/
  });

