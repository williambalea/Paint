import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LineAttributesComponent } from './line-attributes.component';
import { LineService } from 'src/app/services/shapes/line.service';

describe('LineAttributesComponent', () => {
  let component: LineAttributesComponent;
  let fixture: ComponentFixture<LineAttributesComponent>;
  let lineService: LineService;
  const event: any = { value : 'value' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineAttributesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lineService = TestBed.get(LineService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change line junction upon radio modification', () => {
    const changeJunctionSpy = spyOn(lineService, 'changeJunction');
    component.lineJunctionChangeHandler(event);
    expect(changeJunctionSpy).toHaveBeenCalled();
    expect(lineService.junctionStyle).toEqual(event.value);
  });

  it('should change line style upon radio modification', () => {
    const assignStrokeStyleSpy = spyOn(lineService, 'assignStrokeStyle');
    component.lineStypeRadioChangeHandler(event);
    expect(assignStrokeStyleSpy).toHaveBeenCalled();
  });
});
