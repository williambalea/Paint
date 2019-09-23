import { MatDialogModule, MatDialogRef } from '@angular/material';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileModalwindowComponent } from './new-file-modalwindow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NewFileModalwindowComponent', () => {
  let component: NewFileModalwindowComponent;
  let fixture: ComponentFixture<NewFileModalwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers:[
        { provide: MatDialogRef, useValue: {} },
      ],
      declarations: [ NewFileModalwindowComponent ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],

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
