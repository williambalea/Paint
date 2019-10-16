import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayConfirmationComponent } from './display-confirmation.component';

describe('DisplayConfirmationComponent', () => {
  let component: DisplayConfirmationComponent;
  let fixture: ComponentFixture<DisplayConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
