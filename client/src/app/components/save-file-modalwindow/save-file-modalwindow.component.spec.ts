import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { KEY } from 'src/constants';
import { SaveFileModalwindowComponent } from './save-file-modalwindow.component';

class InputServiceMock {
  backSpacePressed = false;
  // getMouse(): Point {return {x: 1, y: 2}; }
  drawingTags: string[];
}

// tslint:disable-next-line: max-classes-per-file
class MatDialogRefMock {
  close(): void { return; }
}

describe('SaveFileModalwindowComponent', () => {
  let component: SaveFileModalwindowComponent;
  let fixture: ComponentFixture<SaveFileModalwindowComponent>;
  let inputService: InputService;
  let communicationsService: CommunicationsService;
  let eventEmitterService: EventEmitterService;
  let matDialogRef: MatDialogRef<SaveFileModalwindowComponent>;
  // let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFileModalwindowComponent ],
      providers: [
        CommunicationsService,
        FormBuilder,
        { provide: InputService, useClass: InputServiceMock },
        // { provide: EventEmitterService, useClass: EventEmitterServiceMock },
        EventEmitterService,
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        HttpClient,
        HttpHandler,

      ],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(SaveFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal window', () => {
    const closeSpy = spyOn(matDialogRef, 'close');
    component.closeModalWindow();
    expect(closeSpy).toHaveBeenCalled();

  });

  it('should delete a single tag', () => {
    inputService.drawingTags = [];
    inputService.drawingTags[0] = 'myTag';
    component.deleteTag('myTag');
    expect(inputService.drawingTags[0]).not.toEqual('myTag');
  });

  it('should add a single tag', () => {
    component.currentTag = 'tag';
    inputService.drawingTags = [];
    inputService.drawingTags[0] = 'tag2';
    component.addTag();
    expect(inputService.drawingTags.length).toEqual(2);
    expect(inputService.drawingTags[1]).toEqual('tag');
    // expect(inputService.drawingTags[1]).toEqual('tag2');

  });

  it('should not add a tag because of duplication', () => {
    component.currentTag = 'tag';
    inputService.drawingTags = [];
    inputService.drawingTags[0] = 'tag';
    component.addTag();
    expect(inputService.drawingTags.length).toEqual(1);
  });

  it('should not add a tag due to abscence of tag to add', () => {
    component.currentTag = '';
    inputService.drawingTags = [];
    component.addTag();
    expect(inputService.drawingTags.length).toEqual(0);
  });

  it('should send the drawing to the server', () => {
    const sendSpy = spyOn(eventEmitterService, 'sendSVGToServer');
    component.submitDrawing();
    expect(sendSpy).toHaveBeenCalled();
    expect(communicationsService.enableSubmit).toEqual(false);
  });

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
