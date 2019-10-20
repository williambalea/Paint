import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorService } from 'src/app/services/color/color.service';
import { InputService } from 'src/app/services/input.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { EMPTY_STRING, NB } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { Shape } from '../../services/shapes/shape';
import { SharedModule } from './../../shared/shared.module';
import { DrawingSpaceComponent } from './drawing-space.component';

class ShapesServiceMock {
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
class ColorServiceMock {
  getFillColor(): void { return; }
  getStrokeColor(): void { return; }
  getBackgroundColor(): void { return; }
  setMakingColorChanges(): void { return; }
  addColorsToLastUsed(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  shiftPressed = false;
  setMouseOffset(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class RectangleServiceMock implements Shape {
  onMouseDown(): void { return; }
  onMouseMove(): void { return; }
  onMouseUp(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class Renderer2Mock {
  appendChild(): void {return; }
  removeChild(): void {return; }
  createElement(): void {return; }
}

describe('DrawingSpaceComponent', () => {
  let component: DrawingSpaceComponent;
  let fixture: ComponentFixture<DrawingSpaceComponent>;
  // let shapesService: ShapesService;
  // let colorService: ColorService;
  // let inputService: InputService;
  // let rectangleService: RectangleService;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSpaceComponent ],
      providers: [
        DrawingSpaceComponent,
        { provide: ShapesService, useClass: ShapesServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: RectangleService, useClass: RectangleServiceMock },
        { provide: Renderer2, useClass: Renderer2Mock },
        HttpClient,
        HttpHandler,
      ],
      imports: [
        SharedModule,
      ],
    })
    .compileComponents();
    component = TestBed.get(DrawingSpaceComponent);
    // shapesService = TestBed.get(ShapesService);
    // colorService = TestBed.get(ColorService);
    // inputService = TestBed.get(InputService);
    // rectangleService = TestBed.get(RectangleService);
    renderer = TestBed.get(Renderer2);

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

  it('should call remove child from renderer when hiding grid', () => {
    const spy = spyOn(renderer, 'removeChild');
    component.hideGrid();
    expect(spy).toHaveBeenCalled();
  });

  // it('should activate square mode when holding shift', () => {
  //   component.selectedShape = rectangleService;
  //   const spy = spyOn(component.selectedShape, 'onMouseMove');
  //   const pressingShift = new KeyboardEvent('keydown', {key: KEY.shift});
  //   const pressingOther = new KeyboardEvent('keydown', {key: KEY.o});

  //   component.onKeyDown(pressingOther);
  //   expect(inputService.shiftPressed).toBeFalsy();
  //   component.onKeyDown(pressingShift);
  //   expect(inputService.shiftPressed).toBeTruthy();
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });

  // it('should return to rectangle mode when releasing shift', () => {
  //   inputService.shiftPressed = true;
  //   component.selectedShape = rectangleService;
  //   const spy = spyOn(component.selectedShape, 'onMouseMove');
  //   const pressingShift = new KeyboardEvent('keyup', {key: KEY.shift});
  //   const pressingOther = new KeyboardEvent('keydown', {key: KEY.o});

  //   component.onKeyUp(pressingOther);
  //   expect(inputService.shiftPressed).toBeTruthy();
  //   component.onKeyUp(pressingShift);
  //   expect(inputService.shiftPressed).toBeFalsy();
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });

  // it('should change the color of the clicked shape with filling color', () => {
  //   const rect = new Rectangle(
  //     TOOL.rectangle,
  //     NB.One,
  //     NB.One,
  //     NB.One,
  //     NB.One,
  //     COLORS.blackRGBA,
  //     COLORS.blackRGBA,
  //     NB.One,
  //   );
  //   shapesService.shapes = [rect];

  //   const changePrimarySpy = spyOn(shapesService.shapes[0], 'changePrimaryColor');
  //   const fillColorSpy = spyOn(colorService, 'getFillColor');

  //   component.selectedTool = TOOL.rectangle;
  //   component.onLeftClick(rect);

  //   component.selectedTool = TOOL.colorApplicator;
  //   component.onLeftClick(rect);

  //   expect(changePrimarySpy).toHaveBeenCalledTimes(1);
  //   expect(fillColorSpy).toHaveBeenCalledTimes(1);
  //   });

  // it('should change the color of the clicked shape with stroke color', () => {
  //   const rect = new Rectangle(
  //     TOOL.rectangle,
  //     NB.One,
  //     NB.One,
  //     NB.One,
  //     NB.One,
  //     COLORS.blackRGBA,
  //     COLORS.blackRGBA,
  //     NB.One,
  //   );
  //   shapesService.shapes = [rect];

  //   const event = new MouseEvent('contextmenu');
  //   const changePrimarySpy = spyOn(shapesService.shapes[0], 'changeSecondaryColor');
  //   const fillColorSpy = spyOn(colorService, 'getStrokeColor');
  //   const preventSpy = spyOn(event, 'preventDefault');

  //   component.selectedTool = TOOL.rectangle;
  //   component.onRightClick(event, rect);

  //   component.selectedTool = TOOL.colorApplicator;
  //   component.onRightClick(event, rect);

  //   expect(preventSpy).toHaveBeenCalledTimes(2);
  //   expect(changePrimarySpy).toHaveBeenCalledTimes(1);
  //   expect(fillColorSpy).toHaveBeenCalledTimes(1);
  // });


  // it('should call the appropriate mousedown handler for the selectedTool', () => {
  //   const brushSpy = spyOn(component, 'onMouseDown');
  //   const penSpy = spyOn(component, 'onMouseDown');

  //   component.selectedTool = TOOL.brush;
  //   component.onMouseDown(new MouseEvent('mousedown'));

  //   component.selectedTool = TOOL.pen;
  //   component.onMouseDown(new MouseEvent('mousedown'));

  //   expect(brushSpy).toHaveBeenCalledTimes(1);
  //   expect(penSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should define the shape colors and manage the mouseDown by the selectedTool', () => {
  //   const mouseDown = new MouseEvent('mousedown');
  //   const spyMouse = spyOn(component, 'onMouseDown');
  //   const spyColor = spyOn(colorService, 'setMakingColorChanges');
  //   component.selectedShape = rectangleService;
  //   component.onMouseDown(mouseDown);
  //   expect(spyColor).toHaveBeenCalled();
  //   expect(spyMouse).toHaveBeenCalled();
  // });


  // it('should initialize the svg path of pen', () => {
  //   component.selectedTool = TOOL.pen;
  //   component.onMouseDown(new MouseEvent('mouseDown'));
  //   expect(shapesService.preview.path.length).toBeGreaterThan(0);
  // });

  // it('should initialize the svg path of brush', () => {
  //   component.selectedTool = TOOL.brush;
  //   component.onMouseDown(new MouseEvent('mouseDown'));
  //   expect(shapesService.preview.path.length).toBeGreaterThan(0);
  //   expect(shapesService.preview.filter.length).toBeGreaterThan(0);
  // });

  // it('should draw the correct shape by selectedTool', () => {
  //   const movePenBrush = spyOn(component, 'onMouseMove');
  //   component.selectedShape = rectangleService;

  //   component.selectedTool = TOOL.pen;
  //   component.onMouseMove(new MouseEvent('mousemove'));

  //   component.selectedTool = TOOL.brush;
  //   component.onMouseMove(new MouseEvent('mousemove'));

  //     component.selectedTool = TOOL.colorApplicator;
  //     component.onMouseMove(new MouseEvent('mousemove'));

  //   expect(movePenBrush).toHaveBeenCalledTimes(2);
  // });

  // it('should draw path with mouse offset position', () => {
  //   shapesService.preview.active = false;
  //   component.onMouseMove(new MouseEvent('mousemove'));
  //   expect(shapesService.preview.path.length).not.toBeGreaterThan(0);

  //   shapesService.preview.active = true;
  //   component.onMouseMove(new MouseEvent('mousemove'));
  //   expect(shapesService.preview.path.length).toBeGreaterThan(0);
  // });

  // it('should show the correct shape when mouseup', () => {
  //   const brushSpy = spyOn(shapesService, 'drawBrush');
  //   const penSpy = spyOn(shapesService, 'drawPen');

  //   component.selectedTool = TOOL.brush;
  //   component.onMouseUp();

  //   component.selectedTool = TOOL.pen;
  //   component.onMouseUp();

  //   component.selectedTool = TOOL.colorApplicator;
  //   component.onMouseUp();

  //   expect(brushSpy).toHaveBeenCalledTimes(1);
  //   expect(penSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should add last used color to palette and draw shape by selectedTool', () => {
  //   const assignSpy = spyOn(component, 'onMouseUp');
  //   const resetSpy = spyOn(shapesService, 'resetPreview');
  //   component.selectedShape = rectangleService;

  //   component.onMouseUp();
  //   expect(assignSpy).toHaveBeenCalled();
  //   expect(resetSpy).toHaveBeenCalled();
  // });
});
