import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatDialogRef } from '@angular/material/dialog';
import { DisplayConfirmationComponent } from './display-confirmation.component';

describe('DisplayConfirmationComponent', () => {
  let component: DisplayConfirmationComponent;
  let fixture: ComponentFixture<DisplayConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayConfirmationComponent ],
      providers: [
        MatDialogRef,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
