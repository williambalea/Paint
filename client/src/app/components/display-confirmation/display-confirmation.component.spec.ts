import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DisplayConfirmationComponent } from './display-confirmation.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('DisplayConfirmationComponent', () => {
  let component: DisplayConfirmationComponent;
  let fixture: ComponentFixture<DisplayConfirmationComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayConfirmationComponent ],
      providers: [
        MatDialogRef,
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        MatDialogModule,
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DisplayConfirmationComponent]
      }
    });
    TestBed.compileComponents();
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
