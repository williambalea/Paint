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

  // it('Should enter switch case Filled', () => {
  //   component.selectedType = 'Filled';
  //   component.assignRectangleType();
  //   expect(shapesService.fillEnable).toBe(true);
  //   expect(shapesService.strokeEnable).toBe(false);
  // });

  it('Should enter switch case Bordered', () => {
    attributeBarComponent.assignRectangleType();
    expect(shapesService.fillEnable).toBe(true);
    expect(shapesService.strokeEnable).toBe(true);
  });

  it('Should set stroke width correctly', () => {
    const value = NB.Ten;
    attributeBarComponent.assignStrokeWidth(value);
    expect(shapesService.rectangleStrokeWidth).toEqual(value);
  });

});
