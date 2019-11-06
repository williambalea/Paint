import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EllipseService } from 'src/app/services/shapes/ellipse.service';
import { EllipseAttributesComponent } from './ellipse-attributes.component';

describe('EllipseAttributesComponent', () => {
  let component: EllipseAttributesComponent;
  let fixture: ComponentFixture<EllipseAttributesComponent>;
  let ellipseService: EllipseService;
  const event: any = { value : 'value' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EllipseAttributesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipseAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ellipseService = TestBed.get(EllipseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should modify ellipse style upon submitin new value', () => {
    const assignEllipseTypeSpy = spyOn(ellipseService, 'assignEllipseType');
    component.radioChangeHandler(event);
    expect(assignEllipseTypeSpy).toHaveBeenCalled();
    expect(ellipseService.ellipseType).toEqual(event.value);
  });
});
