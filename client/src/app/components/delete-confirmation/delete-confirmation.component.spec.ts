import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { DeleteConfirmationComponent } from './delete-confirmation.component';

describe('DeleteConfirmationComponent', () => {
  const shapeService: ShapesService = new ShapesService();
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationComponent ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
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

  it('Should handle clear function correctly', () => {
    component.clear();
    expect(shapeService.getShapes.length).toEqual(0);
  });
});
