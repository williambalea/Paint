import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PolygonService } from 'src/app/services/shapes/polygon.service';
import { PolygonAttributesComponent } from './polygon-attributes.component';

// class PolygonServiceMock {

// }

describe('PolygonAttributesComponent', () => {
  let component: PolygonAttributesComponent;
  let fixture: ComponentFixture<PolygonAttributesComponent>;
  let polygonService: PolygonService;

  const event: any = { value : 'value' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonAttributesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    polygonService = TestBed.get(PolygonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign a polygon type after an effective radio change', () => {
    const assignPolygonTypeSpy = spyOn(polygonService, 'assignPolygonType');
    component.radioChangeHandler(event);
    console.log(event);
    expect(assignPolygonTypeSpy).toHaveBeenCalled();
    expect(polygonService.polygonType).toEqual(event.value);
  });
});
