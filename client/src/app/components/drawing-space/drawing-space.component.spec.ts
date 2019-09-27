import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of,  } from 'rxjs';
import { DrawingSpaceComponent } from './drawing-space.component';
import { HIDE_DIALOG } from 'src/constants';


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
      providers: [
        DrawingSpaceComponent,
        { provide: MatDialog, useClass: MatDialogMock },
      ],
    })
    .compileComponents();
    component = TestBed.get(DrawingSpaceComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call openDialog if HIDE_DIALOG is in local stoarge', () => {
    const spy = spyOn(component, 'openDialog').and.callThrough();
    localStorage.clear();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  
  it('ngOnInit should set enableKeyPress to true if HIDE_DIALOG exists in local storage', () => {
    localStorage.setItem(HIDE_DIALOG,JSON.stringify(true));
    component.ngOnInit();
    expect(component.enableKeyPress).toBeTruthy();
  });

});
