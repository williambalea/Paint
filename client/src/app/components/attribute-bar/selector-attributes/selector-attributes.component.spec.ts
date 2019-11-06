import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { SelectorAttributesComponent } from './selector-attributes.component';

describe('SelectorComponent', () => {
  let component: SelectorAttributesComponent;
  let fixture: ComponentFixture<SelectorAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorAttributesComponent ],
      providers: [
        Renderer2,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
