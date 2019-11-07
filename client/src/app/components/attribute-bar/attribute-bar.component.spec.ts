import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { EMPTY_STRING, KEY } from 'src/constants';
import { AttributeBarComponent } from './attribute-bar.component';

export class RectangleServiceMock {
  rectangleType = EMPTY_STRING;
  assignRectangleType(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class Renderer2Mock {
  createElement(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class EventEmitterServiceMock {
  showGrid(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('AttributeBarComponent', () => {
  let component: AttributeBarComponent;
  let fixture: ComponentFixture<AttributeBarComponent>;
  let eventEmitterService: EventEmitterService;
  let gridService: GridService;
  let textService: TextService;
  let inputService: InputService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttributeBarComponent,
      ],
      providers: [
        AttributeBarComponent,
        {provide: ElementRef, useClass: MockElementRef},
        {provide: eventEmitterService, useClass: EventEmitterServiceMock},
        {provide: Renderer2, useClass: Renderer2Mock },
      ],
      imports: [
        FormsModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    component = TestBed.get(AttributeBarComponent);
    eventEmitterService = TestBed.get(EventEmitterService);
    gridService = TestBed.get(GridService);
    textService = TestBed.get(TextService);
    inputService = TestBed.get(InputService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a key up', () => {
    const onKeyUpSpy = spyOn(component, 'onKeyUp');
    const keyEvent = new KeyboardEvent('keyup', {
      key: 'g',
    });
    component.onKeyUp(keyEvent);
    expect(onKeyUpSpy).toHaveBeenCalled();
  });

  it('should go through case KEY.g', () => {
    const toggleGridSpy = spyOn(component, 'toggleGrid');
    const keyEvent = new KeyboardEvent('keyup', {
      key: KEY.g,
    });
    component.onKeyUp(keyEvent);
    expect(toggleGridSpy).toHaveBeenCalled();
  });

  it('should go through case KEY.plus', () => {
    const setNextGridSizeSpy = spyOn(gridService, 'setNextGridSize');
    const applyGridSpy = spyOn(component, 'applyGrid');
    const showGridSpy = spyOn(gridService, 'showGrid');
    textService.isWriting = false;
    inputService.gridShortcutsActive = true;

    const keyEvent = new KeyboardEvent('keyup', {
      key: KEY.plus,
    });

    component.onKeyUp(keyEvent);
    expect(setNextGridSizeSpy).toHaveBeenCalled();
    expect(applyGridSpy).toHaveBeenCalled();
    expect(showGridSpy).toHaveBeenCalled();
  });

  it('should go through case KEY.minus', () => {
    const setLastGridSizeSpy = spyOn(gridService, 'setLastGridSize');
    const applyGridSpy = spyOn(component, 'applyGrid');
    const showGridSpy = spyOn(gridService, 'showGrid');
    textService.isWriting = false;
    inputService.gridShortcutsActive = true;
    const keyEvent = new KeyboardEvent('keyup', {
      key: KEY.minus,
    });

    component.onKeyUp(keyEvent);
    expect(setLastGridSizeSpy).toHaveBeenCalled();
    expect(applyGridSpy).toHaveBeenCalled();
    expect(showGridSpy).toHaveBeenCalled();
  });

  it('should enter if statement when not writing and shortcuts active', () => {
    const spyToggleGrid = spyOn(component, 'toggleGrid');
    textService.isWriting = false;
    inputService.gridShortcutsActive = true;
    const keyEvent = new KeyboardEvent('keyup', {
      key: KEY.g,
    });
    component.onKeyUp(keyEvent);
    expect(spyToggleGrid).toHaveBeenCalled();
  });

  it('should not enter if statement when writing', () => {
    const spyApplyGrid = spyOn(component, 'applyGrid');
    textService.isWriting = true;
    const key = KEY.minus;
    const keyEvent2 = new KeyboardEvent(key);

    component.onKeyUp(keyEvent2);
    expect(spyApplyGrid).not.toHaveBeenCalled();
  });

  it('should not enter if statement when grid shortcuts not active', () => {
    const spyApplyGrid = spyOn(component, 'applyGrid');
    inputService.gridShortcutsActive = true;
    const key = KEY.minus;
    const keyEvent2 = new KeyboardEvent(key);

    component.onKeyUp(keyEvent2);
    expect(spyApplyGrid).not.toHaveBeenCalled();
  });

  it('should toggle grid when called to', () => {
    const toggleGridSpy = spyOn(component, 'toggleGrid');
    component.onGridToggle();
    expect(toggleGridSpy).toHaveBeenCalled();
  });

  it('should show grid if it was hidden, upon toggling', () => {
    const showGridSpy = spyOn(gridService, 'showGrid');
    component.usingGrid = false;
    component.toggleGrid();
    expect(showGridSpy).toHaveBeenCalled();
  });

  it('should hide grid if it was shown, upon toggling', () => {
    const hideGridSpy = spyOn(gridService, 'hideGrid');
    component.usingGrid = true;
    component.toggleGrid();
    expect(hideGridSpy).toHaveBeenCalled();
  });

  it('should assign usingGrid to true when calling applyGrid', () => {
    component.usingGrid = false;
    component.applyGrid();
    expect(component.usingGrid).toBeTruthy();
  });

});
