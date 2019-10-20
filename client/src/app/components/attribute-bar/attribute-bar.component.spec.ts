import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioChange } from '@angular/material';
import { ColorService } from 'src/app/services/color/color.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { EMPTY_STRING } from '../../../constants';
import { OUTLINE_TYPE, TOOL } from './../../../constants';
import { EllipseService } from './../../services/shapes/ellipse.service';
import { AttributeBarComponent } from './attribute-bar.component';

export class RectangleServiceMock {
  rectangleType = EMPTY_STRING;
  assignRectangleType(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class EllipseServiceMock {
  ellipseType = EMPTY_STRING;
  assignEllipseType(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class PolygonServiceMock {
  polygonType = EMPTY_STRING;
  assignPolygonType(): void { return; }
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
  let colorService: ColorService;
  let rectangleService: RectangleService;
  let ellipseService: EllipseService;
  let polygonService: PolygonService;
  let eventEmitterService: EventEmitterService;
  // let matRadioButton: MatRadioButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttributeBarComponent,
      ],
      providers: [
        AttributeBarComponent,
        RectangleService,
        MatRadioButton,
        {provide: ElementRef, useClass: MockElementRef},
        {provide: eventEmitterService, useClass: EventEmitterServiceMock},
        {provide: RectangleService, useClass: RectangleServiceMock},
        {provide: EllipseService, useClass: EllipseServiceMock},
        {provide: PolygonService, useClass: PolygonServiceMock},
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
    rectangleService = TestBed.get(RectangleService);
    ellipseService = TestBed.get(EllipseService);
    polygonService = TestBed.get(PolygonService);
    eventEmitterService = TestBed.get(EventEmitterService);
    // matRadioButton = TestBed.get(MatRadioButton);
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

  it('Should call radio handler on rectangle', () => {
    const spy = spyOn(rectangleService, 'assignRectangleType');
    component.selectedTool = TOOL.rectangle;
    component.radioChangeHandler({value: OUTLINE_TYPE.bordered} as MatRadioChange);
    expect(rectangleService.rectangleType).toEqual(OUTLINE_TYPE.bordered);
    expect(spy).toHaveBeenCalled();
  });

  it('Should call radio handler on ellipse', () => {
    const spy = spyOn(ellipseService, 'assignEllipseType');
    component.selectedTool = TOOL.ellipse;
    component.radioChangeHandler({value: OUTLINE_TYPE.bordered} as MatRadioChange);
    expect(ellipseService.ellipseType).toEqual(OUTLINE_TYPE.bordered);
    expect(spy).toHaveBeenCalled();
  });

  it('Should call radio handler on polygon', () => {
    const spy = spyOn(polygonService, 'assignPolygonType');
    component.selectedTool = TOOL.polygon;
    component.radioChangeHandler({value: OUTLINE_TYPE.bordered} as MatRadioChange);
    expect(polygonService.polygonType).toEqual(OUTLINE_TYPE.bordered);
    expect(spy).toHaveBeenCalled();
  });

  
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