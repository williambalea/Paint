
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileModalwindowComponent } from './new-file-modalwindow.component';

describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFileModalwindowComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
