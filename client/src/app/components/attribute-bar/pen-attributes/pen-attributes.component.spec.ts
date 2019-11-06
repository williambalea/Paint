import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PenService } from 'src/app/services/shapes/pen.service';
import { PenAttributesComponent } from './pen-attributes.component';

describe('PenAttributesComponent', () => {
  let component: PenAttributesComponent;
  let fixture: ComponentFixture<PenAttributesComponent>;
  let penService: PenService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenAttributesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    penService = TestBed.get(PenService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not modify stroke-width', () => {
    penService.minStrokeWidth = 1;
    penService.maxStrokeWidth = 2;
    component.validateStrokes();
    expect(penService.maxStrokeWidth).toEqual(2);
    expect(penService.minStrokeWidth).toEqual(1);
  });

  it('should modify stroke-width', () => {
    penService.minStrokeWidth = 2;
    penService.maxStrokeWidth = 1;
    component.validateStrokes();
    expect(penService.maxStrokeWidth).toEqual(2);
    expect(penService.minStrokeWidth).toEqual(1);
  });
});
