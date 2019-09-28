import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ColorService } from 'src/app/services/color/color.service';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { NB, RECTANGLE_TYPE } from '../../../constants';
import { ColorService } from './../../services/color/color.service';
import { AttributeBarComponent } from './attribute-bar.component';

export class ShapesServiceMock {
  strokeEnable: boolean;
  fillEnable: boolean;
  fillColor: string;
  removeColor(): void {return; }
}

fdescribe('AttributeBarComponent', () => {
  let component: AttributeBarComponent = new AttributeBarComponent(shapesService, colorService);
  let fixture: ComponentFixture<AttributeBarComponent>;
  let shapesService: ShapesService;
  let colorService: ColorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeBarComponent ],
      providers: [AttributeBarComponent,
                  {provide: ShapesService, useClass: ShapesServiceMock}],
      imports: [
        FormsModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    component = TestBed.get(AttributeBarComponent);
    colorService = TestBed.get(ColorService);
    shapesService = TestBed.get(ShapesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should assign Bordered Rectangle', () => {
    const spy = spyOn(shapesService, 'removeColor');
    component.assignBorderedRectangle();
    expect(shapesService.strokeEnable).toBe(true);
    expect(shapesService.fillEnable).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it('Should assign Filled Rectangle', () => {
    const spy = spyOn(shapesService, 'removeColor');
    component.assignFilledRectangle();
    expect (spy).toHaveBeenCalled();
    expect (shapesService.strokeEnable).toBe(false);
    expect (shapesService.fillEnable).toBe(true);
  });

  it('Should assign Filled and Bordered rectangle', () => {
    component.assignBorderedAndFilledRectangle();
    expect(shapesService.strokeEnable).toBeTruthy();
    expect(shapesService.fillEnable).toBeTruthy();
  });

  it('Should enter switch case BorderedAndFilled', () => {
    const spy = spyOn(component, 'assignBorderedAndFilledRectangle');
    component.selectedType = RECTANGLE_TYPE.borderedAndFilled;
    component.assignRectangleType();
    expect(spy).toHaveBeenCalled();
  });

  it('Should enter switch case Filled', () => {
    const spy = spyOn(component, 'assignFilledRectangle');
    component.selectedType = RECTANGLE_TYPE.filled;
    component.assignRectangleType();
    expect(spy).toHaveBeenCalled();
  });

  it('Should enter switch case Bordered', () => {
    const spy = spyOn(component, 'assignBorderedRectangle');
    component.selectedType = RECTANGLE_TYPE.bordered;
    component.assignRectangleType();
    expect(spy).toHaveBeenCalled();
  });

  it('Should set stroke width correctly', () => {
    const value = NB.Ten;
    component.assignStrokeWidth(value);
    expect(shapesService.rectangleStrokeWidth).toEqual(value);
  });

  it('Should return color service', () => {
    component.getColorService();
    expect(colorService).toBeDefined();
  });

  it('Should call radio handler', () => {
    const spy = spyOn(component, 'assignRectangleType');
    component.radioChangeHandler({target: {value: RECTANGLE_TYPE.filled}});
    expect(component.selectedType).toEqual(RECTANGLE_TYPE.filled);
    expect(spy).toHaveBeenCalled();
  });

});
