import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ColorService } from 'src/app/services/color/color.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { EMPTY_STRING, RECTANGLE_TYPE } from '../../../constants';
import { AttributeBarComponent } from './attribute-bar.component';

export class RectangleServiceMock {
  rectangleType = EMPTY_STRING;
  assignRectangleType(): void { return; }
}

describe('AttributeBarComponent', () => {
  let component: AttributeBarComponent;
  let fixture: ComponentFixture<AttributeBarComponent>;
  let colorService: ColorService;
  let rectangleService: RectangleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeBarComponent ],
      providers: [AttributeBarComponent,
                 {provide: RectangleService, useClass: RectangleServiceMock}],
      imports: [
        FormsModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    component = TestBed.get(AttributeBarComponent);
    colorService = TestBed.get(ColorService);
    rectangleService = TestBed.get(RectangleService);
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

  it('Should call radio handler', () => {
    const spy = spyOn(rectangleService, 'assignRectangleType');
    component.radioChangeHandler({target: {value: RECTANGLE_TYPE.filled}});
    expect(rectangleService.rectangleType).toEqual(RECTANGLE_TYPE.filled);
    expect(spy).toHaveBeenCalled();
  });

});
