import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { SaveFileModalwindowComponent } from '../save-file-modalwindow/save-file-modalwindow.component';
import { GetFileModalwindowComponent } from './get-file-modalwindow.component';

class InputServiceMock {
  backSpacePressed = false;
  drawingTags: string[];
  getMouse(): any {return {x: 1, y: 2}; }
}

// tslint:disable-next-line: max-classes-per-file
class EventEmitterServiceMock {
  sendSvgToServer(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class MatDialogRefMock {
  close(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class FormBuilderMock {
  group(): void {return; }
}

describe('GetFileModalwindowComponent', () => {
  let component: GetFileModalwindowComponent;
  let fixture: ComponentFixture<GetFileModalwindowComponent>;
  let inputService: InputService;
  let communicationsService: CommunicationsService;
  let eventEmitterService: EventEmitterService;
  let matDialogRef: MatDialogRef<SaveFileModalwindowComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFileModalwindowComponent ],
      providers: [
        { provide: InputService, useClass: InputServiceMock },
        { provide: EventEmitterService, useClass: EventEmitterServiceMock },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: FormBuilder, useClass: FormBuilderMock },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    inputService = TestBed.get(InputService);
    communicationsService = TestBed.get(CommunicationsService);
    eventEmitterService = TestBed.get(EventEmitterService);
    matDialogRef = TestBed.get(MatDialogRef);
    formBuilder = TestBed.get(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a tag', () => {
    const updateSpy = spyOn(component, 'updateDisplayTable');
    const value = 10;
    component.removeTags(value);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should _SELECT_MOST_RECENT', () => {
    const updateSpy = spyOn(component, 'updateDisplayTable');
    const value = 10;
    component.removeTags(value);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should display datatable with filter', () => {
    // Need to mock a JSON file to have in datatable to test the filter
    // We're testing on an array with 1 element getting filtered upon displayWithFilter()
    component.tags[0] = 'tag';
    // component.dataTable[0] = mockJSON;
    component.displayWithFilter();
    expect(component.dataTable.length).toEqual(0);
  });

  it('should display datatable without filter', () => {
    // Need to mock a JSON file to have in datatable to test the filter
        // We're testing on an array with 1 element not getting filtered upon displayWithFilter()
    component.tags = [];
    // component.dataTable[0] = mockJSON;
    component.displayWithFilter();
    expect(component.dataTable.length).toEqual(1);
  });

  it('should add tags to a filter', () => {
    const updateSpy = spyOn(component, 'addTagToFilter');
    component.addTagToFilter();
    expect(component.filterActivated).toEqual(true);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should _UPDATE_DISPLAY_TABLE_', () => {

  });

  it('should close the modal window', () => {
    const closeSpy = spyOn(dialogRef, 'close');
    component.closeModalWindow();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should select a drawing from the list', () => {

  });

  it('should select a drawing from the list', () => {

  });

});
