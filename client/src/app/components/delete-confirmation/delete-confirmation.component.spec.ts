import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { By } from '@angular/platform-browser';

describe('DeleteConfirmationComponent', () => {
 // const shapeService: ShapesService = new ShapesService();
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;
  let shapeService : ShapesService;
  const dialogMock = {
    close: () => { }
   };

  beforeEach(async(() => {
    shapeService = new ShapesService();
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clear function when clicking yes button',async(() => {
    spyOn(component, 'clear');
    const button = fixture.debugElement.query(By.css('button[type =yes]')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.clear).toHaveBeenCalled();
  }));

  it('should call dialogRef.close function when invoking clear function',() => {
     let spy = spyOn(component.dialogRef, 'close').and.callThrough();
     component.clear();
     expect(spy).toHaveBeenCalled(); 
  });

  it('should call clearShapes function when invoking clear function',() => {
    let spy = spyOn(component.shapeService, 'clearShapes').and.callThrough();
    component.clear();
    expect(spy).toHaveBeenCalled(); 
  });

 it('should call changeParameters function when invoking clear function',() => {
  let spy = spyOn(component.fileParameters, 'changeParameters').and.callThrough();
  component.clear();
  expect(spy).toHaveBeenCalled(); 
  });

  it('Should handle clear function correctly', () => {
    component.clear(); 
    expect(shapeService.getShapes.length).toEqual(0);
  });
});
