import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GetFileModalwindowComponent } from './get-file-modalwindow.component';

describe('GetFileModalwindowComponent', () => {
  let component: GetFileModalwindowComponent;
  let fixture: ComponentFixture<GetFileModalwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFileModalwindowComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
