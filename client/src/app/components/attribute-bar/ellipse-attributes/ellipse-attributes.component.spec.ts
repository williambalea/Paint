import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EllipseAttributesComponent } from './ellipse-attributes.component';

describe('EllipseAttributesComponent', () => {
  let component: EllipseAttributesComponent;
  let fixture: ComponentFixture<EllipseAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EllipseAttributesComponent ],
      imports: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipseAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
