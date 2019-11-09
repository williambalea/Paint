import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { EMPTY_STRING, KEY } from 'src/constants';
import { provideAutoMock } from 'src/test.helpers.spec';
import { GridService } from './../../services/grid/grid.service';
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
  constructor() { super(undefined); }
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
      imports: [
        FormsModule,
      ],
      providers: [
        AttributeBarComponent,
        {provide: ElementRef, useClass: MockElementRef},
        {provide: eventEmitterService, useClass: EventEmitterServiceMock},
        {provide: Renderer2, useClass: Renderer2Mock },
        provideAutoMock(GridService),
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
    const applyGridSpy = spyOn(component, 'applyGrid');
    textService.isWriting = false;
    inputService.gridShortcutsActive = true;

    const keyEvent = new KeyboardEvent('keyup', {
      key: KEY.plus,
    });

    component.onKeyUp(keyEvent);
    expect(gridService.setNextGridSize).toHaveBeenCalled();
    expect(applyGridSpy).toHaveBeenCalled();
    expect(gridService.showGrid).toHaveBeenCalled();
  });

  it('should go through case KEY.minus', () => {
    const applyGridSpy = spyOn(component, 'applyGrid');
    textService.isWriting = false;
    inputService.gridShortcutsActive = true;
    const keyEvent = new KeyboardEvent('keyup', {
      key: KEY.minus,
    });

    component.onKeyUp(keyEvent);
    expect(gridService.setLastGridSize).toHaveBeenCalled();
    expect(applyGridSpy).toHaveBeenCalled();
    expect(gridService.showGrid).toHaveBeenCalled();
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
    // component.usingGrid = false;
    component.toggleGrid();
    expect(gridService.showGrid).toHaveBeenCalled();
  });

  it('should hide grid if it was shown, upon toggling', () => {
    gridService.isUsingGrid = true;
    component.toggleGrid();
    expect(gridService.hideGrid).toHaveBeenCalled();
  });

  it('should assign usingGrid to true when calling applyGrid', () => {
    gridService.isUsingGrid = false;
    component.applyGrid();
    expect(gridService.isUsingGrid).toBeTruthy();
  });

});
