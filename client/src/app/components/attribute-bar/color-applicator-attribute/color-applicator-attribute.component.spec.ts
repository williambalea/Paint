import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorApplicatorAttributeComponent } from './color-applicator-attribute.component';

describe('ColorApplicatorAttributeComponent', () => {
  let component: ColorApplicatorAttributeComponent;
  let fixture: ComponentFixture<ColorApplicatorAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorApplicatorAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorApplicatorAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
