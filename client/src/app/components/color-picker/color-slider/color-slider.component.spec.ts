import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NB } from 'src/constants';
import { ColorSliderComponent } from './color-slider.component';

describe('ColorSliderComponent', () => {
  let component: ColorSliderComponent;
  let fixture: ComponentFixture<ColorSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSliderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

<<<<<<< HEAD
  // it('Should draw degraded slider correctly', () => {
  //   spyOn(component, 'drawGradient');
  //   component.draw();
  //   expect(component.drawGradient).toHaveBeenCalled();
  // });
=======
  it('Should draw degraded slider correctly', () => {
    spyOn(component, 'selectPosition');
    component.draw();
    expect(component.selectPosition).toHaveBeenCalled();
  });
>>>>>>> 5711d2f7dab2636dc79ae8896c4f2b549d1d9530

  it('Should executeMouseMove correctly', () => {
    spyOn(component, 'emitColor');
    const event: MouseEvent = new MouseEvent('window:mousemove');
    component.setMouseDown(true);
    component.onMouseMove(event);
    expect(component.emitColor).toHaveBeenCalled();
  });

  it('Should execute onMouseDown correctly', () => {
    spyOn(component, 'emitColor');
    const event: MouseEvent = new MouseEvent('window:mouseup');
    component.onMouseDown(event);
    expect(component.emitColor).toHaveBeenCalled();
  });

  it('Should executeMouseUp correctly', () => {
    component.onMouseUp();
    expect(component.getMouseDown()).toBeFalsy();
  });

  it('Should return a valid color', () => {
    const testString: string = component.getColorAtPosition(NB.Zero, NB.Zero);
    expect(testString.indexOf('rgba(')).toBeDefined();
    expect(testString.split(',').length).toEqual(NB.Four);
  });
});
