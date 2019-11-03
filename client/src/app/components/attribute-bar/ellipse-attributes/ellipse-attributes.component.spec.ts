import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipseAttributesComponent } from './ellipse-attributes.component';

describe('EllipseAttributesComponent', () => {
  let component: EllipseAttributesComponent;
  let fixture: ComponentFixture<EllipseAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EllipseAttributesComponent ],
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
