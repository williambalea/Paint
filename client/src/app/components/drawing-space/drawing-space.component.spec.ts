import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorService } from 'src/app/services/color/color.service';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { Rectangle } from 'src/Classes/Shapes/rectangle';
import { Shape } from 'src/Classes/Shapes/shape';
import { COLORS, EMPTY_STRING, KEY, NB, TOOL } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { DrawingSpaceComponent } from './drawing-space.component';

export class ShapesServiceMock {
  shapes: Shape[];
  mouse: Point;
  preview: Preview = {
    active: false,
    x: NB.Zero,
    y: NB.Zero,
    width: NB.Zero,
    height: NB.Zero,
    path: EMPTY_STRING,
    filter: EMPTY_STRING,
  };

  setSquareOffset(): void { return; }
  setRectangleOffset(): void { return; }
  setMouseOrigin(): void { return; }
  setRectangleType(): void { return; }

  drawRectangle(): void { return; }
  drawBrush(): void { return; }
  drawPen(): void { return; }

  resetPreview(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class ColorServiceMock {
  getFillColor(): void { return; }
  getStrokeColor(): void { return; }
  getBackgroundColor(): void { return; }
  setMakingColorChanges(): void { return; }
  addColorsToLastUsed(): void { return; }
}

describe('DrawingSpaceComponent', () => {
  let component: DrawingSpaceComponent;
  let fixture: ComponentFixture<DrawingSpaceComponent>;
  let shapesService: ShapesService;
  let colorService: ColorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSpaceComponent ],
      providers: [
        DrawingSpaceComponent,
        { provide: ShapesService, useClass: ShapesServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    })
    .compileComponents();
    component = TestBed.get(DrawingSpaceComponent);
    shapesService = TestBed.get(ShapesService);
    colorService = TestBed.get(ColorService);

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

  it('should activate square mode when holding shift', () => {
    const spy = spyOn(shapesService, 'setSquareOffset');
    const pressingShift = new KeyboardEvent('keydown', {key: KEY.shift});
    component.onKeyDown(pressingShift);
    expect(component.shiftPressed).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should return to rectangle mode when releasing shift', () => {
    const spy = spyOn(shapesService, 'setRectangleOffset');
    const pressingShift = new KeyboardEvent('keyup', {key: KEY.shift});
    component.onKeyUp(pressingShift);
    expect(component.shiftPressed).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('should change the color of the clicked shape with filling color', () => {
      component.selectedTool = TOOL.colorApplicator;
      const rect = new Rectangle(
        TOOL.rectangle,
        NB.One,
        NB.One,
        NB.One,
        NB.One,
        COLORS.blackRGBA,
        COLORS.blackRGBA,
        NB.One,
      );
      shapesService.shapes = [rect];
      const changePrimarySpy = spyOn(shapesService.shapes[0], 'changePrimaryColor');
      const fillColorSpy = spyOn(colorService, 'getFillColor');
      component.onLeftClick(rect);
      expect(changePrimarySpy).toHaveBeenCalled();
      expect(fillColorSpy).toHaveBeenCalled();
    });

  it('should change the color of the clicked shape with stroke color', () => {
    component.selectedTool = TOOL.colorApplicator;
    const rect = new Rectangle(
      TOOL.rectangle,
      NB.One,
      NB.One,
      NB.One,
      NB.One,
      COLORS.blackRGBA,
      COLORS.blackRGBA,
      NB.One,
    );
    shapesService.shapes = [rect];
    const event = new MouseEvent('contextmenu');
    const changePrimarySpy = spyOn(shapesService.shapes[0], 'changeSecondaryColor');
    const fillColorSpy = spyOn(colorService, 'getStrokeColor');
    const preventSpy = spyOn(event, 'preventDefault');
    component.onRightClick(event, rect);
    expect(preventSpy).toHaveBeenCalled();
    expect(changePrimarySpy).toHaveBeenCalled();
    expect(fillColorSpy).toHaveBeenCalled();
  });

  it('should define shapes colors', () => {
    spyOn(colorService, 'getFillColor').and.returnValue(COLORS.blackRGBA);
    spyOn(colorService, 'getStrokeColor').and.returnValue(COLORS.blackRGBA);
    component.defineShapeColor();
    expect(shapesService.fillColor).toEqual(COLORS.blackRGBA);
    expect(shapesService.strokeColor).toEqual(COLORS.blackRGBA);
    expect(shapesService.preview.active).toBeTruthy();
  });

  it('should call the appropriate mousedown handler for the selectedTool', () => {
    const rectangleSpy = spyOn(component, 'mouseDownRectangle');
    const brushSpy = spyOn(component, 'mouseDownBrush');
    const penSpy = spyOn(component, 'mouseDownPen');

    component.selectedTool = TOOL.rectangle;
    component.assignMouseDownEvent(new MouseEvent('mousedown'));

    component.selectedTool = TOOL.brush;
    component.assignMouseDownEvent(new MouseEvent('mousedown'));

    component.selectedTool = TOOL.pen;
    component.assignMouseDownEvent(new MouseEvent('mousedown'));

    component.selectedTool = 10;
    component.assignMouseDownEvent(new MouseEvent('mousedown'));

    expect(rectangleSpy).toHaveBeenCalledTimes(1);
    expect(brushSpy).toHaveBeenCalledTimes(1);
    expect(penSpy).toHaveBeenCalledTimes(1);
  });

  it('should define the shape colors and manage the mouseDown by the selectedTool', () => {
    const mouseDown = new MouseEvent('mousedown');
    const spyDefine = spyOn(component, 'defineShapeColor');
    const spyMouse = spyOn(component, 'assignMouseDownEvent');
    const spyColor = spyOn(colorService, 'setMakingColorChanges');
    component.onMouseDown(mouseDown);
    expect(spyDefine).toHaveBeenCalled();
    expect(spyColor).toHaveBeenCalled();
    expect(spyMouse).toHaveBeenCalled();
  });

  it('should initialize rectangle shape', () => {
    const spyMouse = spyOn(shapesService, 'setMouseOrigin');
    const spyType = spyOn(shapesService, 'setRectangleType');
    component.mouseDownRectangle(new MouseEvent('mousedown'));
    expect(spyMouse).toHaveBeenCalled();
    expect(spyType).toHaveBeenCalled();
  });

  it('should initialize the svg path of pen', () => {
    component.mouseDownPen(new MouseEvent('mouseDown'));
    expect(shapesService.preview.path.length).toBeGreaterThan(0);
  });

  it('should initialize the svg path of brush', () => {
    component.mouseDownBrush(new MouseEvent('mouseDown'));
    expect(shapesService.preview.path.length).toBeGreaterThan(0);
    expect(shapesService.preview.filter.length).toBeGreaterThan(0);
  });

  it('should draw the correct shape by selectedTool', () => {
    const moveRect = spyOn(component, 'mouseMoveRectangle');
    component.selectedTool = TOOL.rectangle;
    component.onMouseMove(new MouseEvent('mousemove'));
    expect(moveRect).toHaveBeenCalled();

    const movePenBrush = spyOn(component, 'mouseMovePenBrush');
    component.selectedTool = TOOL.pen;
    component.onMouseMove(new MouseEvent('mousemove'));
    expect(movePenBrush).toHaveBeenCalled();

    component.selectedTool = TOOL.brush;
    component.onMouseMove(new MouseEvent('mousemove'));
    expect(movePenBrush).toHaveBeenCalled();
  });

  it('should set the shape mouse position and draw if the preview is active', () => {
    shapesService.preview.active = false;
    component.shiftPressed = false;
    const spy = spyOn(shapesService, 'setRectangleOffset');
    component.mouseMoveRectangle(new MouseEvent('mousemove'));
    expect(shapesService.mouse).toBeDefined();
    expect(spy).not.toHaveBeenCalled();

    shapesService.preview.active = true;
    component.mouseMoveRectangle(new MouseEvent('mousemove'));
    expect(spy).toHaveBeenCalled();
  });

  it('should remain a rectangle when not holding shift', () => {
    shapesService.preview.active = true;
    const squareSpy = spyOn(shapesService, 'setSquareOffset');
    const rectangleSpy = spyOn(shapesService, 'setRectangleOffset');

    component.shiftPressed = false;
    component.mouseMoveRectangle(new MouseEvent('mousemove'));
    expect(squareSpy).not.toHaveBeenCalled();
    expect(rectangleSpy).toHaveBeenCalled();
  });

  it('should change from rectangle to square when holding shift', () => {
    shapesService.preview.active = true;
    const squareSpy = spyOn(shapesService, 'setSquareOffset');
    const rectangleSpy = spyOn(shapesService, 'setRectangleOffset');

    component.shiftPressed = true;
    component.mouseMoveRectangle(new MouseEvent('mousemove'));
    expect(squareSpy).toHaveBeenCalled();
    expect(rectangleSpy).not.toHaveBeenCalled();
  });

  it('should draw path with mouse offset position', () => {
    shapesService.preview.active = false;
    component.mouseMovePenBrush(new MouseEvent('mousemove'));
    expect(shapesService.preview.path.length).not.toBeGreaterThan(0);

    shapesService.preview.active = true;
    component.mouseMovePenBrush(new MouseEvent('mousemove'));
    expect(shapesService.preview.path.length).toBeGreaterThan(0);
  });

  it('should show the correct shape when mouseup', () => {
    const rectSpy = spyOn(shapesService, 'drawRectangle');
    const brushSpy = spyOn(shapesService, 'drawBrush');
    const penSpy = spyOn(shapesService, 'drawPen');

    component.selectedTool = TOOL.rectangle;
    component.assignMouseUpEvent();

    component.selectedTool = TOOL.brush;
    component.assignMouseUpEvent();

    component.selectedTool = TOOL.pen;
    component.assignMouseUpEvent();

    expect(rectSpy).toHaveBeenCalledTimes(1);
    expect(brushSpy).toHaveBeenCalledTimes(1);
    expect(penSpy).toHaveBeenCalledTimes(1);
  });

  it('should add last used color to palette and draw shape by selectedTool', () => {
    const assignSpy = spyOn(component, 'assignMouseUpEvent');
    const resetSpy = spyOn(shapesService, 'resetPreview');

    component.onMouseUp();
    expect(assignSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
  });
});
