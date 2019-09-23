import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DrawingSpaceComponent } from './drawing-space.component';

export class MatDialogMock {
  open() {
    return { afterClosed: () => of({ name: 'some object' }) };
  }
}

describe('DrawingSpaceComponent', () => {
  let component: DrawingSpaceComponent;
  let fixture: ComponentFixture<DrawingSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSpaceComponent ],
      providers: [ { provide: MatDialog, useClass: MatDialogMock } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
