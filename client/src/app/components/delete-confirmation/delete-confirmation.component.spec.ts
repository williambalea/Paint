import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { ColorService } from 'src/app/services/color/color.service';
import { FileParametersServiceService } from 'src/app/services/file-parameters-service.service';
import { DeleteConfirmationComponent } from './delete-confirmation.component';

describe('DeleteConfirmationComponent', () => {

    let component: DeleteConfirmationComponent;
    let fileParameters: FileParametersServiceService;
    let colorService: ColorService;
    let dialogRef: MatDialogRef<DeleteConfirmationComponent>;
    let fixture: ComponentFixture<DeleteConfirmationComponent>;

    const dialogMock = {
        close: () => {
        return;
        },
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ DeleteConfirmationComponent ],
        imports: [
        MatDialogModule,
        ],
        providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteConfirmationComponent);
        fileParameters = TestBed.get(FileParametersServiceService);
        colorService = TestBed.get(ColorService);
        dialogRef = TestBed.get(MatDialogRef);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call clear function when clicking yes button', async(() => {
        spyOn(component, 'clear');
        const button = fixture.debugElement.query(By.css('button[type =yes]')).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(component.clear).toHaveBeenCalled();
    }));

    it('should call dialogRef.close function when invoking clear function', () => {
        const spy = spyOn(dialogRef, 'close').and.callThrough();
        component.clear();
        expect(spy).toHaveBeenCalled();
    });

    it('should call clearColor function when invoking clear function', () => {
        const spy = spyOn(component, 'clearColor').and.callThrough();
        component.clear();
        expect(spy).toHaveBeenCalled();
    });

    it('should call changeParameters function when invoking clear function', () => {
        const spy = spyOn(fileParameters, 'changeParameters').and.callThrough();
        component.clear();
        expect(spy).toHaveBeenCalled();
    });

    it('should call clearColor function when invoking clear function', () => {
        const spy = spyOn(component, 'clearColor').and.callThrough();
        component.clear();
        expect(spy).toHaveBeenCalled();
    });

    it('should call changeBackgroundColor function when invoking clearColor function', () => {
        const spy = spyOn(colorService, 'changeBackgroundColor').and.callThrough();
        component.clearColor();
        expect(spy).toHaveBeenCalled();
    });

    it('should call setMakingColorChanges function when invoking clearColor function', () => {
        const spy = spyOn(colorService, 'setMakingColorChanges').and.callThrough();
        component.clearColor();
        expect(spy).toHaveBeenCalled();
    });

    it('should call setShowInAttributeBar function when invoking clearColor function', () => {
        const spy = spyOn(colorService, 'setShowInAttributeBar').and.callThrough();
        component.clearColor();
        expect(spy).toHaveBeenCalled();
    });

    it('should call setShowBackgroundButton function when invoking clearColor function', () => {
        const spy = spyOn(colorService, 'setShowBackgroundButton').and.callThrough();
        component.clearColor();
        expect(spy).toHaveBeenCalled();
    });

});
