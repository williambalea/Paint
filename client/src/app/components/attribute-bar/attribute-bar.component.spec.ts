import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { NB } from '../../../constants';
import { ColorService } from './../../services/color/color.service';
import { AttributeBarComponent } from './attribute-bar.component';

const shapesService: ShapesService = new ShapesService();
const colorService: ColorService = new ColorService();
const attributeBarComponent: AttributeBarComponent = new AttributeBarComponent(shapesService, colorService);

describe('AttributeBarComponent', () => {
  let component: AttributeBarComponent;
  let fixture: ComponentFixture<AttributeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeBarComponent ],
      imports: [
        FormsModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should assign Bordered Rectangle', () => {
  //   attributeBarComponent.assignBorderedRectangle();
  //   expect (shapesService.strokeEnable).toBe(true);
  //   expect (shapesService.fillEnable).toBe(false);
  //   expect (shapesService.removeColor(shapesService.fillColor)).toBeDefined();
  // });

  // it('Should assign Filled Rectangle', () => {
  //   attributeBarComponent.assignFilledRectangle();
  //   expect (shapesService.strokeEnable).toBe(false);
  //   expect (shapesService.removeColor(shapesService.strokeColor)).toBeDefined();
  //   expect (shapesService.fillEnable).toBe(true);
  // });

  it('Should assign Filled and Bordered rectangle', () => {
    attributeBarComponent.assignBorderedAndFilledRectangle();
    expect (shapesService.strokeEnable).toBe(true);
    expect (shapesService.fillEnable).toBe(true);
  });

  // it('Should enter switch case BorderedAndFilled', () => {
  //   attributeBarComponent.assignRectangleType();
  //   component.selectedType = 'BorderedAndFilled';
  //   expect(attributeBarComponent.assignBorderedAndFilledRectangle).toBeDefined();
  // });

  // it('Should enter switch case Filled', () => {
  //   attributeBarComponent.assignRectangleType();
  //   component.selectedType = 'Filled';
  //   expect(attributeBarComponent.assignFilledRectangle).toBeDefined();
  // });

  it('Should enter switch case Bordered', () => {
    attributeBarComponent.assignRectangleType();
    component.selectedType = 'Bordered';
    expect(attributeBarComponent.assignBorderedRectangle).toBeDefined();
  });

  it('Should set stroke width correctly', () => {
    const value = NB.Ten;
    attributeBarComponent.assignStrokeWidth(value);
    expect(shapesService.rectangleStrokeWidth).toEqual(value);
  });

  it('Should return color service', () => {
    attributeBarComponent.getColorService();
    expect(colorService).toBeDefined();
  });

});
