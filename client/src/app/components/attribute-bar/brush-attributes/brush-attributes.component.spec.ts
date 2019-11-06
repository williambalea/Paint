import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrushService } from 'src/app/services/shapes/brush.service';
import { BrushAttributesComponent } from './brush-attributes.component';

describe('BrushAttributesComponent', () => {
  let component: BrushAttributesComponent;
  let fixture: ComponentFixture<BrushAttributesComponent>;
  let brushService: BrushService;
  const event: any = { value : 'value' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushAttributesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    brushService = TestBed.get(BrushService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should modify brush filter upon submiting new value', () => {
    const changeFilterSpy = spyOn(brushService, 'changeFilter');
    component.brushRadioChangeHandler(event);
    expect(changeFilterSpy).toHaveBeenCalled();
  });
});
