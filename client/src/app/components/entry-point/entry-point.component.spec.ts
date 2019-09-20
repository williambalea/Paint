import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { EntryPointComponent } from './entry-point.component';

describe('EntryPointComponent', () => {
  let component: EntryPointComponent;
  let fixture: ComponentFixture<EntryPointComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<EntryPointComponent>>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [ EntryPointComponent ],
      providers: [ { provide: MatDialogRef, useValue: spy } ],
    })
    .compileComponents();
    matDialogRefSpy = TestBed.get(MatDialogRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial isHidden to false', () => {
    expect(component.isHidden).toEqual(false);
  });

  it('should toggle the isHidden bool state', () => {
    component.toggleHideDialog();
    expect(component.isHidden).toEqual(true);
  });

  it('should call close() on the dialog', () => {
    component.closeDialog();
    expect(matDialogRefSpy.close.calls.count()).toBe(1, 'spy method called once');
  });
});
