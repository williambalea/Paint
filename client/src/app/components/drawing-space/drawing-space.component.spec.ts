import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NB } from 'src/constants';
import { DrawingSpaceComponent } from './drawing-space.component';

fdescribe('DrawingSpaceComponent', () => {
  let component: DrawingSpaceComponent;
  let fixture: ComponentFixture<DrawingSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSpaceComponent ],
      providers: [
        DrawingSpaceComponent,
      ],
    })
    .compileComponents();
    component = TestBed.get(DrawingSpaceComponent);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setCanvasParameters() when init', () => {
    const spy = spyOn(component, 'setCanvasParameters');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should define width and canvasWidth attributes if resizeFlag is false when resizing window', () => {
    component.width = NB.Zero;
    component.canvasWidth = NB.Zero;
    const windowInnerWidth = NB.One;

    component.resizeFlag = true;
    component.onResize( { target: { innerWidth: windowInnerWidth } } );
    expect(component.width).toEqual(NB.Zero);
    expect(component.canvasWidth).toEqual(NB.Zero);

    component.resizeFlag = false;
    component.onResize( { target: { innerWidth: windowInnerWidth } } );
    expect(component.width).toEqual(windowInnerWidth);
    expect(component.canvasWidth).toEqual(windowInnerWidth);
  });

});
