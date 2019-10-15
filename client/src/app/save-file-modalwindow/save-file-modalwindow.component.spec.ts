import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFileModalwindowComponent } from './save-file-modalwindow.component';

describe('SaveFileModalwindowComponent', () => {
  let component: SaveFileModalwindowComponent;
  let fixture: ComponentFixture<SaveFileModalwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFileModalwindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFileModalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
