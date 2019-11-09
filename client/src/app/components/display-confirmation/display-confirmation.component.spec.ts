import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from './../../services/event-emitter.service';
import { DisplayConfirmationComponent } from './display-confirmation.component';

class CommunicationsServiceMock {
  isLoading: boolean;
}

describe('DisplayConfirmationComponent', () => {
  let component: DisplayConfirmationComponent;
  let fixture: ComponentFixture<DisplayConfirmationComponent>;
  let communicationsService: CommunicationsService;
  let eventEmitterService: EventEmitterService;

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayConfirmationComponent ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        DisplayConfirmationComponent,
        EventEmitterService,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: CommunicationsService, useValue: CommunicationsServiceMock },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DisplayConfirmationComponent],
      },
    });
    TestBed.compileComponents();
    component = TestBed.get(DisplayConfirmationComponent);
    communicationsService = TestBed.get(CommunicationsService);
    eventEmitterService = TestBed.get(EventEmitterService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm', () => {
    const appendSpy = spyOn(eventEmitterService, 'appendToDrawingSpace');

    component.confirm();

    expect(communicationsService.isLoading).toEqual(true);
    expect(appendSpy).toHaveBeenCalled();

  });

});
