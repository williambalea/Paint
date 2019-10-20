import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { SaveFileModalwindowComponent } from './save-file-modalwindow.component';

class InputServiceMock {
  backSpacePressed = false;
  // getMouse(): Point {return {x: 1, y: 2}; }
  drawingTags: string[];
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

describe('SaveFileModalwindowComponent', () => {
  let component: SaveFileModalwindowComponent;
  let fixture: ComponentFixture<SaveFileModalwindowComponent>;
  let inputService: InputService;
  let communicationsService: CommunicationsService;
  let eventEmitterService: EventEmitterService;
  let matDialogRef: MatDialogRef<SaveFileModalwindowComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFileModalwindowComponent ],
      providers: [
        CommunicationsService,
        FormBuilder,
        { provide: InputService, useClass: InputServiceMock },
        { provide: EventEmitterService, useClass: EventEmitterServiceMock },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: FormBuilder, useClass: FormBuilderMock },
      ],
    })
    .compileComponents();
    inputService = TestBed.get(InputService);
    communicationsService = TestBed.get(CommunicationsService);
    eventEmitterService = TestBed.get(EventEmitterService);
    matDialogRef = TestBed.get(MatDialogRef);
    formBuilder = TestBed.get(FormBuilder);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialise attributes', () => {

  // });

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
    expect(inputService.drawingTags[1]).toEqual('tag2');

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
});
