import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { KEY } from 'src/constants';
// import { SaveFileModalwindowComponent } from '../save-file-modalwindow/save-file-modalwindow.component';
import { SafeUrlPipe } from './../../safe-url.pipe';
import { GetFileModalwindowComponent } from './get-file-modalwindow.component';
// import { KEY } from 'src/constants';

class InputServiceMock {
  backSpacePressed = false;
  drawingTags: string[];
  getMouse(): any {return {x: 1, y: 2}; }
}

// tslint:disable-next-line: max-classes-per-file
class SVGJSONMock {
  name = 'name';
  tags: string[] = ['tag1', 'tag2'];
  thumbnail = 'thumbnail';
  html = 'html';
  color = 'color';
  drawingTags: string[];
  getMouse(): any {return {x: 1, y: 2}; }
}

// tslint:disable-next-line: max-classes-per-file
class MatDialogRefMock {
  close(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
describe('GetFileModalwindowComponent', () => {
  let component: GetFileModalwindowComponent;
  let fixture: ComponentFixture<GetFileModalwindowComponent>;
//   let inputService: InputService;
//   let communicationsService: CommunicationsService;
//   let eventEmitterService: EventEmitterService;
//   let matDialogRef: MatDialogRef<SaveFileModalwindowComponent>;
//   let inputService: InputService;
//   let communicationsService: CommunicationsService;
//   let eventEmitterService: EventEmitterService;
//   let matDialogRef: MatDialogRef<SaveFileModalwindowComponent>;
//   let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFileModalwindowComponent, SafeUrlPipe ],
      providers: [
        GetFileModalwindowComponent,
        { provide: InputService, useClass: InputServiceMock },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        EventEmitterService,
        MatDialog,
        Overlay,
        HttpClient,
        HttpHandler,
      ],
      imports: [ FormsModule, MatDialogModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    component = TestBed.get(GetFileModalwindowComponent);
    // inputService = TestBed.get(InputService);
    // communicationsService = TestBed.get(CommunicationsService);
    // eventEmitterService = TestBed.get(EventEmitterService);
    // matDialogRef = TestBed.get(MatDialogRef);
    // inputService = TestBed.get(InputService);
    // eventEmitterService = TestBed.get(EventEmitterService);
    // matDialogRef = TestBed.get(MatDialogRef);
    // formBuilder = TestBed.get(FormBuilder);
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

//   it('should display empty filtered data table', () => {
//     component.tags[0] = 'tag';
//     let svgJSONArray: SVGJSONMock[];
//     svgJSONArray = [new SVGJSONMock()];
//     component.dataTable = svgJSONArray;

//     component.displayWithFilter();
//     expect(component.filteredThroughTagData.length).toEqual(0);
//   });

//   it('should display filtered data table with appropriate tag', () => {
//     component.tags.push('tag2');
//     let svgJSONArray: SVGJSONMock[];
//     svgJSONArray = [new SVGJSONMock()];
//     component.dataTable = svgJSONArray;

//     component.displayWithFilter();
//     expect(component.filteredThroughTagData.length).toEqual(1);
    // const dataTable1: SVGJSON = { name: 'test1',
    //                               tags:['tags1', 'tags2'],
    //                               thumbnail: 'thumbnail1',
    //                               html: 'html1',
    //                               color: 'color1'};
    // component.dataTable.push(dataTable1);
    // component.tags.push('tags1');

    // component.displayWithFilter();
    // expect(component.filteredThroughTagData.length).toEqual(1);
//   });

  it('should add tags to a filter', () => {
    const updateSpy = spyOn(component, 'updateDisplayTable');
    component.addTagToFilter();
    expect(component.filterActivated).toEqual(true);
    expect(updateSpy).toHaveBeenCalled();
  });

//   it('should _UPDATE_DISPLAY_TABLE_', () => {

//   });

  it('should close the modal window', () => {
    // const closeSpy = spyOn(dialogRef, 'close');
    component.closeModalWindow();

    // expect(closeSpy).toHaveBeenCalled();
  });

//   it('should select a drawing from the list', () => {
//     const dialogRefSpy = spyOn(matDialogRef, 'close');
//     const appendSpy = spyOn(eventEmitterService, 'appendToDrawingSpace');
//     const value = 1;
//     component.caughtGetError = false;
//     inputService.isNotEmpty = true;

//     component.selectDrawing(value);
//     expect(communicationsService.isLoading).toEqual(true);
//     expect(inputService.drawingHtml).toEqual(component.displayedData[value].html);
//     expect(inputService.drawingColor).toEqual(component.displayedData[value].color);
//     expect(dialogRefSpy).not.toHaveBeenCalled();
//     expect(appendSpy).toHaveBeenCalled();
//   });

//   it('should not select a drawing from the list', () => {
//     const dialogRefSpy = spyOn(matDialogRef, 'close');
//     const appendSpy = spyOn(eventEmitterService, 'appendToDrawingSpace');
//     const value = 1;
//     component.caughtGetError = true;
//     inputService.isNotEmpty = false;

//     component.selectDrawing(value);
//     expect(communicationsService.isLoading).toEqual(false);
//     expect(inputService.drawingHtml).not.toEqual(component.displayedData[value].html);
//     expect(inputService.drawingColor).not.toEqual(component.displayedData[value].color);
//     expect(dialogRefSpy).not.toHaveBeenCalled();
//     expect(appendSpy).toHaveBeenCalled();
//   });

  it ('should preventDefault if o and ctrl keys are entered', () => {
    const keyEvent = new KeyboardEvent('keydown', {key: KEY.o, ctrlKey: true});
    const eventSpy = spyOn(keyEvent, 'preventDefault');
    component.onKeyDown(keyEvent);
    expect(eventSpy).toHaveBeenCalled();

  });

  it ('should not preventDefault if o is not entered', () => {
    const keyEvent = new KeyboardEvent('keydown', {key: KEY.c, ctrlKey: true});
    const eventSpy = spyOn(keyEvent, 'preventDefault');
    component.onKeyDown(keyEvent);
    expect(eventSpy).not.toHaveBeenCalled();
  });

  it ('should not preventDefault if ctrl is not entered', () => {
    const keyEvent = new KeyboardEvent('keydown', {key: KEY.o, ctrlKey: false});
    const eventSpy = spyOn(keyEvent, 'preventDefault');
    component.onKeyDown(keyEvent);
    expect(eventSpy).not.toHaveBeenCalled();
  });

});
