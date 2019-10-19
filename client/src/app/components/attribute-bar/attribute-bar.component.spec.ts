import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { EMPTY_STRING } from '../../../constants';
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

describe('AttributeBarComponent', () => {
  let component: AttributeBarComponent;
  let fixture: ComponentFixture<AttributeBarComponent>;
  let colorService: ColorService;
  // let rectangleService: RectangleService;
  let eventEmitterService: EventEmitterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttributeBarComponent,
      ],
      providers: [
        AttributeBarComponent,
        {provide: eventEmitterService, useClass: EventEmitterServiceMock},
        {provide: RectangleService, useClass: RectangleServiceMock},
        {provide: Renderer2, useClass: Renderer2Mock },
      ],
      imports: [
        FormsModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    component = TestBed.get(AttributeBarComponent);
    colorService = TestBed.get(ColorService);
    // rectangleService = TestBed.get(RectangleService);
    eventEmitterService = TestBed.get(EventEmitterService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return color service', () => {
    component.getColorService();
    expect(colorService).toBeDefined();
  });

  // it('Should call radio handler', () => {
  //   // let button = fixture.debugElement.nativeElement.querySelector('button');
  //   const radio = fixture.MatRadioChange.query(By.css('input[value=Bordered]'));
  //   const spy = spyOn(rectangleService, 'assignRectangleType');
  //   component.selectedTool = TOOL.rectangle;
  //   component.radioChangeHandler(radio);
  //   expect(rectangleService.rectangleType).toEqual(OUTLINE_TYPE.filled);
  //   expect(spy).toHaveBeenCalled();
  // });

  it('Should call showGrid method from eventEmitterService', () => {
    const showGridSpy = spyOn(eventEmitterService, 'showGrid');
    component.showGrid();
    expect(showGridSpy).toHaveBeenCalled();
  });

  it('Should call hideGrid method from eventEmitterService', () => {
    const hideGridSpy = spyOn(eventEmitterService, 'hideGrid');
    component.hideGrid();
    expect(hideGridSpy).toHaveBeenCalled();
  });

});