import { ColorService } from './../../services/color/color.service';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeBarComponent } from './attribute-bar.component';
import { ShapesService } from 'src/app/services/shapes/shapes.service';

const shapesService: ShapesService = new ShapesService();
const colorService: ColorService = new ColorService();
const attributeBarComponent: AttributeBarComponent = new AttributeBarComponent(shapesService, colorService);

describe('AttributeBarComponent', () => {
  let component: AttributeBarComponent;
  let fixture: ComponentFixture<AttributeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeBarComponent ],
      imports:[
        FormsModule
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

  it('Should set brushState to true',() => {
    attributeBarComponent.selectBrush();
    expect(attributeBarComponent.brushState).toBe(true);
  });

  it('Should set brushState to fasle', () => {
    attributeBarComponent.selectBrush();
    attributeBarComponent.selectPen();
    expect(attributeBarComponent.brushState).toBe(false);
  });

  // it('Should enter switchcase Bordered', () => {
  //   attributeBarComponent.selectedType = 'Filled';
  //   attributeBarComponent.assignRectangleType();
  //   expect(shapesService.fillEnable).toBe(true);

  // })


  it('Should set stroke width correctly',()=> {
    let value: number = 10;
    attributeBarComponent.assignStrokeWidth(value);
    expect(shapesService.rectangleStrokeWidth).toEqual(value);
  });

  it('Should set stroke color correctly',()=>{
    let value:string = 'FFFFFF';
    attributeBarComponent.assignStrokeColor(value);
    expect(attributeBarComponent.shapeStrokeColor).toEqual(value);
  });

  it('Should set FillColor correctly',() => {
    let value: string = '111111';
    attributeBarComponent.assignFillColor(value);
    expect(attributeBarComponent.shapeFillColor).toEqual(value);
  } );

  it('Should set BrushStrokeWidth correctly',() => {
    let value:number = 10;
    attributeBarComponent.assignBrushStrokeWidth(value);
    expect(attributeBarComponent.brushStrokeWidth).toEqual(value);
  });

  it('Should set PenStroleWidth correctly',() => {
    attributeBarComponent.assignPenStrokeWidth(10);
    expect(attributeBarComponent.penStrokeWidth).toEqual(10);
  });


});
