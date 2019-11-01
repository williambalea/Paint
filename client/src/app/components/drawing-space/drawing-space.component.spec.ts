import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from 'src/app/safe-html.pipe';
import { ColorService } from 'src/app/services/color/color.service';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { InputService } from 'src/app/services/input.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { ShapesService } from 'src/app/services/shapes/shapes.service';
import { EMPTY_STRING, KEY, NB, TOOL } from 'src/constants';
import { Point } from '../../../../../common/interface/point';
import { Preview } from '../../../../../common/interface/preview';
import { Shape } from '../../services/shapes/shape';
import { GridService } from './../../services/grid/grid.service';
import { IncludingBoxService } from './../../services/includingBox/including-box.service';
// import { UnsubscribeService } from './../../services/unsubscribe.service';
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
  isBlank: boolean;
  isNotEmpty: boolean;
  isDrawed: boolean;
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
class PipetteServiceMock {
  getColors(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class Renderer2Mock {
  appendChild(): void {return; }
  removeChild(): void {return; }
  createElement(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class IncludingBoxServiceMock {
  boxGElement: HTMLElement = {innerHTML: 'abc'} as HTMLElement;
  update(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class GridServiceMock {
  draw(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class SelectorServiceMock {
  selectedShapes: SVGGraphicsElement[];
  intersection(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
// class UnsubscribeServiceMock {
//   OnDestroy(): void {return; }
// }

describe('DrawingSpaceComponent', () => {
  let component: DrawingSpaceComponent;
  let fixture: ComponentFixture<DrawingSpaceComponent>;
  let gridService: GridService;
  // let shapesService: ShapesService;
  let colorService: ColorService;
  let inputService: InputService;
  let rectangleService: RectangleService;
  let pipetteService: PipetteService;
  let renderer2: Renderer2;
  let selectorService: SelectorService;

  // let unsubscribeService: UnsubscribeService;
  let includingBoxService: IncludingBoxService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSpaceComponent, SafeHtmlPipe ],
      providers: [
        DrawingSpaceComponent,
        { provide: ShapesService, useClass: ShapesServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: RectangleService, useClass: RectangleServiceMock },
        { provide: PipetteService, useClass: PipetteServiceMock},
        { provide: Renderer2, useClass: Renderer2Mock },
        { provide: IncludingBoxService, useClass: IncludingBoxServiceMock},
        { provide: GridService, useClass: GridServiceMock},
        { provide: SelectorService, useClass: SelectorServiceMock},
        // { provide: UnsubscribeService, useClass: UnsubscribeServiceMock},
        HttpClient,
        HttpHandler,
      ],
      imports: [
        // SharedModule,
      ],
    })
    .compileComponents();
    component = TestBed.get(DrawingSpaceComponent);
    gridService = TestBed.get(GridService);
    // unsubscribeService = TestBed.get(UnsubscribeService);
    // shapesService = TestBed.get(ShapesService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    rectangleService = TestBed.get(RectangleService);
    pipetteService = TestBed.get(PipetteService);
    // renderer = TestBed.get(Renderer2);
    includingBoxService = TestBed.get(IncludingBoxService);
    selectorService = TestBed.get(SelectorService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSpaceComponent);
    component = fixture.componentInstance;
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
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

  // it('should call onDestroy() from unsubService when destroying', () => {
  //   const spy = spyOn(unsubscribeService, 'onDestroy');
  //   component.ngOnDestroy();
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should call remove child from renderer when hiding grid', () => {
    const spy = spyOn(renderer2, 'removeChild');
    component.hideGrid();
    expect(spy).toHaveBeenCalled();
  });

  it('should call remove child from renderer when showing grid', () => {
    const spyRemove = spyOn(renderer2, 'removeChild');
    const spyAppend = spyOn(renderer2, 'appendChild');
    const spyGrid = spyOn(gridService, 'draw');
    component.showGrid();
    expect(spyRemove).toHaveBeenCalled();
    expect(spyAppend).toHaveBeenCalled();
    expect(spyGrid).toHaveBeenCalled();
  });

  it('should draw but not append child ', () => {
    const shape = false;
    inputService.isBlank = true;
    component.selectedTool = TOOL.ellipse;
    const renderSpy = spyOn(renderer2, 'appendChild');
    const colorSpy = spyOn(colorService, 'setMakingColorChanges');
    component.draw(shape);

    expect(inputService.isBlank).toEqual(false);
    expect(renderSpy).not.toHaveBeenCalled();
    expect(colorSpy).toHaveBeenCalled();
  });

  it('should draw and append child ', () => {
    const shape = true;
    inputService.isBlank = true;
    component.selectedTool = TOOL.ellipse;
    const renderSpy = spyOn(renderer2, 'appendChild');
    const colorSpy = spyOn(colorService, 'setMakingColorChanges');
    component.draw(shape);

    expect(inputService.isBlank).toEqual(false);
    expect(renderSpy).toHaveBeenCalled();
    expect(colorSpy).toHaveBeenCalled();
  });

  it('should not draw', () => {
    const shape = true;
    inputService.isBlank = true;
    component.selectedTool = TOOL.colorApplicator;
    const renderSpy = spyOn(renderer2, 'appendChild');
    const colorSpy = spyOn(colorService, 'setMakingColorChanges');
    component.draw(shape);

    expect(inputService.isBlank).toEqual(true);
    expect(renderSpy).not.toHaveBeenCalled();
    expect(colorSpy).not.toHaveBeenCalled();
  });

  it('should activate square mode when holding shift', () => {
    component.selectedShape = rectangleService;
    const spy = spyOn(component.selectedShape, 'onMouseMove');
    const pressingShift = new KeyboardEvent('keydown', {key: KEY.shift});
    const pressingOther = new KeyboardEvent('keydown', {key: KEY.o});

    component.onKeyDown(pressingOther);
    expect(inputService.shiftPressed).toBeFalsy();
    component.onKeyDown(pressingShift);
    expect(inputService.shiftPressed).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return to rectangle mode when releasing shift', () => {
    inputService.shiftPressed = true;
    component.selectedShape = rectangleService;
    const spy = spyOn(component.selectedShape, 'onMouseMove');
    const pressingShift = new KeyboardEvent('keyup', {key: KEY.shift});
    const pressingOther = new KeyboardEvent('keydown', {key: KEY.o});

    component.onKeyUp(pressingOther);
    expect(inputService.shiftPressed).toBeTruthy();
    component.onKeyUp(pressingShift);
    expect(inputService.shiftPressed).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

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

  it('should call the appropriate mousedown handler for the selectedTool', () => {
    const Spy = spyOn(component, 'onMouseDown');

    component.selectedTool = TOOL.brush;
    component.onMouseDown(new MouseEvent('mousedown'));

    component.selectedTool = TOOL.pencil;
    component.onMouseDown(new MouseEvent('mousedown'));

    expect(Spy).toHaveBeenCalledTimes(2);
  });

  it('should call getColor from pipette when it is selected', () => {
    const mouseDown = new MouseEvent('mousedown');
    const spyMouse = spyOn(pipetteService, 'getColors');
    component.selectedTool = TOOL.pipette;
    component.selectedShape = rectangleService;
    component.onMouseDown(mouseDown);
    expect(spyMouse).toHaveBeenCalled();
    expect(inputService.isNotEmpty).toEqual(true);
    expect(component.selectorAreaActive).toEqual(true);
  });

  it('should call update from includingBoxService when selector is selected', () => {
    const mouseDown = new MouseEvent('mousedown');
    const spyMouse = spyOn(includingBoxService, 'update');
    component.selectedTool = TOOL.selector;
    component.selectedShape = rectangleService;
    component.selectorAreaActive = false;

    component.onMouseDown(mouseDown);

    expect(spyMouse).toHaveBeenCalled();

    expect(inputService.isNotEmpty).toEqual(true);
    expect(component.selectorAreaActive).toEqual(true);
  });

  it('should clear selectedShapes table when click button is 0', () => {
    const mouseDown = new MouseEvent('mousedown', {button: 0});

    component.selectedShape = rectangleService;
    component.selectedTool = TOOL.polygon;
    component.selectorAreaActive = true;

    component.onMouseDown(mouseDown);

    expect(inputService.mouseButton).toEqual(0);
    expect(inputService.isNotEmpty).toEqual(true);
    expect(component.selectorAreaActive).toEqual(true);
    expect(selectorService.selectedShapes.length).toEqual(0);
  });

  it('should push in selectedShapes table when selector is used', () => {
    const mouseDown = new MouseEvent('mousedown', {button: 0});

    component.selectedShape = rectangleService;
    component.selectedTool = TOOL.selector;
    component.selectorAreaActive = true;

    component.onMouseDown(mouseDown);

    expect(inputService.mouseButton).toEqual(0);
    expect(inputService.isNotEmpty).toEqual(true);
    expect(component.selectorAreaActive).toEqual(true);
    expect(selectorService.selectedShapes.length).toEqual(1);
  });

  // it('should initialize the svg path of pencil', () => {
  //   component.selectedTool = TOOL.pencil;
  //   component.onMouseDown(new MouseEvent('mouseDown'));
  //   expect(shapesService.preview.path.length).toBeGreaterThan(0);
  // });

  // it('should initialize the svg path of brush', () => {
  //   component.selectedTool = TOOL.brush;
  //   component.onMouseDown(new MouseEvent('mouseDown'));
  //   expect(shapesService.preview.path.length).toBeGreaterThan(0);
  //   expect(shapesService.preview.filter.length).toBeGreaterThan(0);
  // });

  it('should call setMouseOffset when selected  tool is not colorApplicator', () => {
    component.selectedTool = TOOL.brush;
    const inputSpy = spyOn(inputService, 'setMouseOffset');
    const selectorSpy = spyOn(selectorService, 'intersection');
    const includeSpy = spyOn(includingBoxService, 'update');

    component.selectedTool = TOOL.pencil;
    component.selectedShape = rectangleService;
    component.onMouseMove(new MouseEvent('mousemove'));

    expect(inputSpy).toHaveBeenCalled();
    expect(selectorSpy).not.toHaveBeenCalled();
    expect(includeSpy).not.toHaveBeenCalled();
  });

  it('should call intersection() and update is selector tool is selected and active', () => {
    component.selectedTool = TOOL.selector;
    const inputSpy = spyOn(inputService, 'setMouseOffset');
    const selectorSpy = spyOn(selectorService, 'intersection');
    const includeSpy = spyOn(includingBoxService, 'update');

    component.selectorAreaActive = true;
    component.selectedTool = TOOL.selector;
    component.selectedShape = rectangleService;
    component.onMouseMove(new MouseEvent('mousemove'));

    expect(inputSpy).toHaveBeenCalled();
    expect(selectorSpy).toHaveBeenCalled();
    expect(includeSpy).toHaveBeenCalled();
  });

  it('should call intersection() and update is selector tool is selected and not active', () => {
    component.selectedTool = TOOL.selector;
    const inputSpy = spyOn(inputService, 'setMouseOffset');
    const selectorSpy = spyOn(selectorService, 'intersection');
    const includeSpy = spyOn(includingBoxService, 'update');

    component.selectorAreaActive = false;
    component.selectedTool = TOOL.pencil;
    component.selectedShape = rectangleService;
    component.onMouseMove(new MouseEvent('mousemove'));

    expect(inputSpy).toHaveBeenCalled();
    expect(selectorSpy).not.toHaveBeenCalled();
    expect(includeSpy).not.toHaveBeenCalled();
  });

  it('should call onMouseUp on selected shape', () => {
    component.selectedShape = rectangleService;
    component.selectedTool = TOOL.rectangle;
    const mouseUpSpy = spyOn(component.selectedShape, 'onMouseUp');

    component.onMouseUp();

    expect(inputService.isDrawed).toEqual(true);
    expect(component.selectorAreaActive).toEqual(false);
    expect(mouseUpSpy).toHaveBeenCalled();
  });

  it('should call onMouseUp on selected shape', () => {
    component.selectedShape = rectangleService;
    component.selectedTool = TOOL.selector;
    const rendererSpy = spyOn(renderer2, 'removeChild');

    component.onMouseUp();

    expect(inputService.isDrawed).toEqual(true);
    expect(component.selectorAreaActive).toEqual(false);
    expect(rendererSpy).toHaveBeenCalled();
  });

});
