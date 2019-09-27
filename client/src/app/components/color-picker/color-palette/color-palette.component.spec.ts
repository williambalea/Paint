import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPaletteComponent } from './color-palette.component';

describe('ColorPaletteComponent', () => {
  let component: ColorPaletteComponent;
  let fixture: ComponentFixture<ColorPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPaletteComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit color correctly', () => {
    const color = 'rgba(243, 180, 142, 1)';
    const x = 10;
    const y = 10;
    spyOn(component, 'getColorAtPosition').and.returnValue(color);
    spyOn(component.color, 'emit');
    component.emitColor(x, y);
    expect(component.color.emit).toHaveBeenCalledWith(color);
  });

  it('Should executeMouseMove correctly', () => {
    spyOn(component, 'emitColor');
    const event: MouseEvent = new MouseEvent('window:mousemove');
    component.setMouseDown(true);
    component.onMouseMove(event);
    expect(component.emitColor).toHaveBeenCalled();
  });

  it('Should execute onMouseDown correctly', () => {
    spyOn(component, 'draw');
    const event: MouseEvent = new MouseEvent('window:mouseup');
    component.onMouseDown(event);
    expect(component.draw).toHaveBeenCalled();
  });

  it('Should emit color on ngOnChanges', () => {
    spyOn(component, 'draw');
    spyOn(component.color, 'emit');
    spyOn(component, 'getColorAtPosition');
    const x = 10;
    const y = 10;
    // On met un any ici pour pouvoir faire appel a hue.and.returnValue
    const changes: any = jasmine.createSpyObj('SimpleChanges', ['hue']);
    component.selectedPosition = {x, y}; changes.hue.and.returnValue(true);
    component.ngOnChanges(changes);
    expect(component.color.emit).toHaveBeenCalled();
  });

  it('Should executeMouseUp correctly', () => {
    const event: MouseEvent = new MouseEvent('window:mousedowns');
    component.onMouseUp(event);
    expect(component.getMouseDown()).toBeFalsy();
  });
});
