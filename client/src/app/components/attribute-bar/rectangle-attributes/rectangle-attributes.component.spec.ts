import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { RectangleAttributesComponent } from './rectangle-attributes.component';

describe('RectangleAttributesComponent', () => {
  let component: RectangleAttributesComponent;
  let fixture: ComponentFixture<RectangleAttributesComponent>;
  let rectangleService: RectangleService;
  const event: any = { value : 'value' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectangleAttributesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rectangleService = TestBed.get(RectangleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign rectangle type upon radio change', () => {
    const assignRectangleTypeSpy = spyOn(rectangleService, 'assignRectangleType');
    component.radioChangeHandler(event);
    expect(assignRectangleTypeSpy).toHaveBeenCalled();
    expect(rectangleService.rectangleType).toEqual(event.value);
  });
});
