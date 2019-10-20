import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { SaveFileModalwindowComponent } from '../save-file-modalwindow/save-file-modalwindow.component';
import { GetFileModalwindowComponent } from './get-file-modalwindow.component';
// import { KEY } from 'src/constants';

class InputServiceMock {
  backSpacePressed = false;
  getMouse(): any {return {x: 1, y: 2}; }
  drawingTags: string[];
}

// tslint:disable-next-line: max-classes-per-file
class SVGJSONMock {
  name = 'name';
  tags: string[] = ['tag1', 'tag2'];
  thumbnail = 'thumbnail';
  html = 'html';
  color = 'color';
}

// tslint:disable-next-line: max-classes-per-file
class EventEmitterServiceMock {
  sendSvgToServer(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class MatDialogRefMock {
  close(): void { return;}
}

// tslint:disable-next-line: max-classes-per-file


describe('GetFileModalwindowComponent', () => {
  let component: GetFileModalwindowComponent;
  let fixture: ComponentFixture<GetFileModalwindowComponent>;
  let inputService: InputService;
  let communicationsService: CommunicationsService;
  let eventEmitterService: EventEmitterService;
  let matDialogRef: MatDialogRef<SaveFileModalwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFileModalwindowComponent ],
      providers: [
        { provide: InputService, useClass: InputServiceMock },
        { provide: EventEmitterService, useClass: EventEmitterServiceMock },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    inputService = TestBed.get(InputService);
    communicationsService = TestBed.get(CommunicationsService);
    eventEmitterService = TestBed.get(EventEmitterService);
    matDialogRef = TestBed.get(MatDialogRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called ngOnInit() upon instanciation', () => {
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should remove a tag', () => {
    const updateSpy = spyOn(component, 'updateDisplayTable');
    const value = 10;
    component.removeTags(value);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should select 2 files and iterate through', () => {
    let svgJSONArray: SVGJSONMock[];
    svgJSONArray = [new SVGJSONMock(), new SVGJSONMock()];

    component.selectMostRecent(svgJSONArray);
    expect(component.displayedData.length).toEqual(2);
  });

  it('should select 7 files then stop iterating through', () => {
    let svgJSONArray: SVGJSONMock[];
    svgJSONArray = [new SVGJSONMock(), new SVGJSONMock(), new SVGJSONMock(), new SVGJSONMock(),
                    new SVGJSONMock(), new SVGJSONMock(), new SVGJSONMock(), new SVGJSONMock(),
                    new SVGJSONMock(), new SVGJSONMock(), new SVGJSONMock(), new SVGJSONMock()];

    component.selectMostRecent(svgJSONArray);
    expect(component.displayedData.length).toEqual(7);
  });

  it('should display empty filtered data table', () => {
    component.tags[0] = 'tag';
    let svgJSONArray: SVGJSONMock[];
    svgJSONArray = [new SVGJSONMock()];
    component.dataTable = svgJSONArray;

    component.displayWithFilter();
    expect(component.filteredThroughTagData.length).toEqual(0);
  });

  it('should display filtered data table with appropriate tag', () => {
    component.tags[0] = 'tag1';
    let svgJSONArray: SVGJSONMock[];
    svgJSONArray = [new SVGJSONMock()];
    component.dataTable = svgJSONArray;

    component.displayWithFilter();
    expect(component.filteredThroughTagData.length).toEqual(1);
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
    const closeSpy = spyOn(matDialogRef, 'close');
    component.closeModalWindow();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should select a drawing from the list', () => {
    const dialogRefSpy = spyOn(matDialogRef, 'close');
    const appendSpy = spyOn(eventEmitterService, 'appendToDrawingSpace');
    const value = 1;
    component.caughtGetError = false;
    inputService.isNotEmpty = true;

    component.selectDrawing(value);
    expect(communicationsService.isLoading).toEqual(true);
    expect(inputService.drawingHtml).toEqual(component.displayedData[value].html);
    expect(inputService.drawingColor).toEqual(component.displayedData[value].color);
    expect(dialogRefSpy).not.toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();

  });

  it('should not select a drawing from the list', () => {
    const dialogRefSpy = spyOn(matDialogRef, 'close');
    const appendSpy = spyOn(eventEmitterService, 'appendToDrawingSpace');
    const value = 1;
    component.caughtGetError = true;
    inputService.isNotEmpty = false;

    component.selectDrawing(value);
    expect(communicationsService.isLoading).toEqual(false);
    expect(inputService.drawingHtml).not.toEqual(component.displayedData[value].html);
    expect(inputService.drawingColor).not.toEqual(component.displayedData[value].color);
    expect(dialogRefSpy).not.toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
  });

  // it('should register a key down and preventDefault', () => {
  //   const mockEvent = KeyboardEvent;
  //   const preventDefaultSpy = spyOn(mockEvent, 'preventDefault');

  //   component.onKeyDown(mockEvent);
  //   expect(mockEvent.key).toEqual(KEY.o);
  //   expect(mockEvent.ctrlKey).toBeTruthy();
  //   expect(preventDefaultSpy).toHaveBeenCalled();
  // });

  // it('should register a key down but not preventDefault', () => {
  //   const mockEvent = KeyboardEvent;
  //   const preventDefaultSpy = spyOn(mockEvent, 'preventDefault');

  //   component.onKeyDown(mockEvent);
  //   expect(mockEvent.key).toEqual(KEY.o);
  //   expect(mockEvent.ctrlKey).toBeTruthy();
  //   expect(preventDefaultSpy).not.toHaveBeenCalledtoHaveBeenCalled();
  // });

  // it('should not register a key down nor preventDefault', () => {
  //   const mockEvent = KeyboardEvent;
  //   const preventDefaultSpy = spyOn(mockEvent, 'preventDefault');

  //   component.onKeyDown(mockEvent);
  //   expect(mockEvent.key).not.toEqual(KEY.o);
  //   expect(mockEvent.ctrlKey).not.toBeTruthy();
  //   expect(preventDefaultSpy).not.toHaveBeenCalled();
  // });

});
