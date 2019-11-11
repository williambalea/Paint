import { HttpClient, HttpHandler } from '@angular/common/http';
import { ElementRef, Renderer2, RendererFactory2, Type, ɵEMPTY_ARRAY } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from 'src/app/safe-html.pipe';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { ColorService } from 'src/app/services/color/color.service';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { EraserService } from 'src/app/services/eraser/eraser.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { SelectorService } from 'src/app/services/selector/selector.service';
// import { Shape } from 'src/app/services/shapes/shape';
import { NoShapeService } from 'src/app/services/shapes/no-shape.service';
import { PenService } from 'src/app/services/shapes/pen.service';
import { RectangleService } from 'src/app/services/shapes/rectangle.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { UploadService } from 'src/app/services/upload.service';
import { provideAutoMock } from 'src/test.helpers.spec';
import { EMPTY_STRING, KEY, NB, TOOL } from 'src/constants';
// import { Point } from '../../../../../common/interface/point';
// import { Preview } from '../../../../../common/interface/preview';
// import { Shape } from '../../services/shapes/shape';
import { GridService } from './../../services/grid/grid.service';
import { IncludingBoxService } from './../../services/includingBox/including-box.service';
import { LineService } from './../../services/shapes/line.service';
// import { UnsubscribeService } from './../../services/unsubscribe.service';
import { DrawingSpaceComponent } from './drawing-space.component';
import { Shape } from 'src/app/services/shapes/shape';
// import { NoShapeService } from 'src/app/services/shapes/no-shape.service';

describe('DrawingSpaceComponent', () => {
  let component: DrawingSpaceComponent;
  let fixture: ComponentFixture<DrawingSpaceComponent>;
  let clipboardService: ClipboardService;
  let penService: PenService;
  let uploadService: UploadService;
  let textService: TextService;
//   let gridService: GridService;
// let shapesService: ShapesService;
  let colorService: ColorService;
  let inputService: InputService;
  // let lineService: LineService;
  let rectangleService: RectangleService;
  let pipetteService: PipetteService;
  let renderer: Renderer2;
  let eraserService: EraserService;
  let rendererFactory: RendererFactory2;
  let selectorService: SelectorService;
  let eventEmitterService: EventEmitterService;
  let undoRedoService: UndoRedoService;
  // let unsubscribeService: UnsubscribeService;
  let includingBoxService: IncludingBoxService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSpaceComponent, SafeHtmlPipe ],
      providers: [
        DrawingSpaceComponent,
        provideAutoMock(GridService),
        provideAutoMock(SelectorService),
        provideAutoMock(ColorService),
        provideAutoMock(InputService),
        provideAutoMock(RectangleService),
        provideAutoMock(PipetteService),
        provideAutoMock(IncludingBoxService),
        provideAutoMock(ClipboardService),
        // provideAutoMock(KeyboardEvent),
        provideAutoMock(EraserService),
        provideAutoMock(PenService),
        provideAutoMock(UndoRedoService),
        provideAutoMock(UploadService),
        provideAutoMock(LineService),
        provideAutoMock(TextService),
        provideAutoMock(DrawingSpaceComponent),
        provideAutoMock(PipetteService),
       // provideAutoMock(NoShapeService),
        HttpClient,
        HttpHandler,
        Renderer2,
      ],
    //   imports: [
    //     // SharedModule,
    //   ],
    })
    .compileComponents();
    component = TestBed.get(DrawingSpaceComponent);
    // gridService = TestBed.get(GridService);
    undoRedoService = TestBed.get(UndoRedoService);
    // unsubscribeService = TestBed.get(UnsubscribeService);
    // shapesService = TestBed.get(ShapesService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    uploadService = TestBed.get(UploadService);
    eraserService = TestBed.get(EraserService);
    rectangleService = TestBed.get(RectangleService);
    pipetteService = TestBed.get(PipetteService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
    includingBoxService = TestBed.get(IncludingBoxService);
    selectorService = TestBed.get(SelectorService);
    clipboardService = TestBed.get(ClipboardService);
    eventEmitterService = TestBed.get(EventEmitterService);
    penService = TestBed.get(PenService);
    textService = TestBed.get(TextService);
    // lineService = TestBed.get(LineService);

    component.drawingBoard = new ElementRef(renderer.createElement('drawingBoard'));
    eraserService.cursor = renderer.createElement('svgElement') as SVGGraphicsElement;
    component.selectedShape = 'rect' as unknown as NoShapeService;
    selectorService.selectedShapes = [];
    console.log(NB.Forty);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSpaceComponent);
    component = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    renderer.createElement('element');
  });

  it('should call controlV upon registering control + v', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.v});
    inputService.controlPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(clipboardService.controlV).toHaveBeenCalled();
  });

  it('should call controlD upon registering control + d', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.d});
    inputService.controlPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(clipboardService.controlD).toHaveBeenCalled();
  });

  it('should call put controlPressed to false', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.control});
    inputService.controlPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(inputService.controlPressed).not.toBeTruthy();
  });

  it('should call put altPressed to false', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.alt});
    inputService.altPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(inputService.controlPressed).not.toBeTruthy();
  });

  it('should call put altPressed to false', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.alt});
    inputService.altPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(inputService.altPressed).not.toBeTruthy();
  });

  it('should call put backspace to false', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.backspace});
    component.selectedShape = rectangleService;
    inputService.altPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(inputService.backSpacePressed).toBeFalsy();
  });

  it('should call selectedShape onMouseMove', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.backspace});
    component.selectedShape = rectangleService;
    component.onKeyUp(keyboardEvent);
    expect(component.selectedShape.onMouseMove).toHaveBeenCalled();
  });

  it('should call selectedShape onMouseMove', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.backspace});
    component.selectedShape = rectangleService;
    component.onKeyUp(keyboardEvent);
    expect(component.selectedShape.onMouseMove).toHaveBeenCalled();
  });

  it('should call selectedShape onMouseMove', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.escape});
    inputService.escapePressed = true;
    component.onKeyUp(keyboardEvent);
    expect(inputService.escapePressed).not.toBeTruthy();
  });

  it('should call onMouseUp when onMouseMove', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.escape});
    component.selectedShape = rectangleService;
    component.onKeyUp(keyboardEvent);
    expect(rectangleService.onMouseUp).toHaveBeenCalled();
  });

  it('should put shifPressed to false', () => {
    const keyboardEvent = new KeyboardEvent('keyup', {key: KEY.shift});
    inputService.shiftPressed = true;
    component.onKeyUp(keyboardEvent);
    expect(inputService.shiftPressed).not.toBeTruthy();
  });

  it('should remove the element the cursor is on from the canvas', () => {
    const mouseEvent = new MouseEvent('eraser');
    const spy = spyOn(renderer, 'removeChild');
    component.selectedTool = TOOL.eraser;
    component.onMouseLeave(mouseEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should not call prevent default', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.d});
    inputService.controlPressed = false;
    component.onKeyDown(keyboardEvent);
    expect(keyboardEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should call prevent default', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.d});
    const spy = spyOn(keyboardEvent, 'preventDefault');
    inputService.controlPressed = true;
    component.onKeyDown(keyboardEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should delete canvas selection', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.delete});
    component.onKeyDown(keyboardEvent);
    expect(clipboardService.delete).toHaveBeenCalled();
  });

  it('should update including selection', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.delete});
    component.onKeyDown(keyboardEvent);
    expect(clipboardService.delete).toHaveBeenCalled();
  });

  it('should reset eraser services', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.shift});
    const spy = spyOn(eraserService.cursor, 'remove');
    component.selectedTool = TOOL.line;
    component.selectedShape = rectangleService;
    component.onKeyDown(keyboardEvent);
    expect(spy).toHaveBeenCalled();
    expect(eraserService.reset).toHaveBeenCalled();
    expect(eraserService.updatePosition).not.toHaveBeenCalled();
  });

  it('should update eraser position', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.shift});
    const spy = spyOn(eraserService.cursor, 'remove');
    component.selectedTool = TOOL.eraser;
    component.onKeyDown(keyboardEvent);
    expect(spy).not.toHaveBeenCalled();
    expect(eraserService.reset).not.toHaveBeenCalled();
    expect(eraserService.updatePosition).toHaveBeenCalled();
  });

  it('should put shiftpressed to true when keyboard pressing it', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.shift});
    inputService.shiftPressed = false;
    component.onKeyDown(keyboardEvent);
    expect(inputService.shiftPressed).toBeTruthy();
  });

  it('should call mouse up and move if tool is line', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.shift});
    inputService.shiftPressed = false;
    component.selectedTool = TOOL.line;
    component.onKeyDown(keyboardEvent);
    expect(component.selectedShape.onMouseMove).toHaveBeenCalled();
    expect(component.selectedShape.onMouseUp).toHaveBeenCalled();
  });

  it('should put altPressed to true', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.alt});
    inputService.altPressed = false;
    component.onKeyDown(keyboardEvent);
    expect(inputService.altPressed).toBeTruthy();
  });

  it('should call removeChild', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.escape});
    const removeChildSpy = spyOn(renderer, 'removeChild');
    component.canvas = new ElementRef(renderer.createElement('canvas'));
    component.shape = renderer.createElement('shape');
    inputService.escapePressed = false;
    component.selectedTool = TOOL.line;
    component.onKeyDown(keyboardEvent);
    expect(inputService.escapePressed).toBeTruthy();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('should not call removeChild', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.escape});
    const removeChildSpy = spyOn(renderer, 'removeChild');
    component.canvas = new ElementRef(renderer.createElement('canvas'));
    component.shape = renderer.createElement('shape');
    inputService.escapePressed = false;
    component.selectedTool = TOOL.eraser;
    component.onKeyDown(keyboardEvent);
    expect(inputService.escapePressed).toBeTruthy();
    expect(removeChildSpy).not.toHaveBeenCalled();
  });

  it('should call linejump function if keydown is enter', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.enter});
    inputService.escapePressed = false;
    component.selectedTool = TOOL.text;
    textService.isWriting = true;
    component.onKeyDown(keyboardEvent);
    expect(textService.lineJump).toHaveBeenCalled();
  });

  it('should call text service update', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.backspace});
    textService.textContent = '';
    inputService.escapePressed = false;
    component.selectedTool = TOOL.text;
    textService.isWriting = true;
    textService.text = renderer.createElement('text') as HTMLElement;
    renderer.appendChild(textService.text, renderer.createElement('child1'));
    renderer.appendChild(textService.text, renderer.createElement('child2'));
    component.onKeyDown(keyboardEvent);
    expect(textService.lineJumpBack).toHaveBeenCalled();
  });

  it('should update text content with user input', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.c});
    textService.textContent = '';
    component.selectedTool = TOOL.text;
    textService.isWriting = true;
    component.onKeyDown(keyboardEvent);
    expect(textService.textContent).toEqual('c');
    expect(textService.update).toHaveBeenCalled();
    expect(textService.enterLineMultiplier).toEqual(1);
  });

  // it('should return if not shape is provided', () => {
  //   const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.escape});
  //   const removeChildSpy = spyOn(renderer, 'removeChild');
  //   component.canvas = new ElementRef(renderer.createElement('canvas'));
  //   //component.shape = renderer.createElement('shape');
  //   inputService.escapePressed = false;
  //   component.selectedTool = TOOL.line;
  //   component.onKeyDown(keyboardEvent);
  //   expect().toHaveBeenCalled();
  //   expect(removeChildSpy).not.toHaveBeenCalled();
  // });

  it('should put backspacePressed to true and mousemove to have been called', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.backspace});
    inputService.backSpacePressed = false;
    component.onKeyDown(keyboardEvent);
    expect(inputService.backSpacePressed).toBeTruthy();
    expect(component.selectedShape.onMouseMove).toHaveBeenCalled();
  });

  it('should put controlPressed to true', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.control});
    inputService.controlPressed = false;
    component.onKeyDown(keyboardEvent);
    expect(inputService.controlPressed).toBeTruthy();
  });

  it('should not call controlC when pressing c down', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.c});
    inputService.controlPressed = false;
    component.onKeyDown(keyboardEvent);
    expect(clipboardService.controlC).not.toHaveBeenCalled();
  });

  it('should call controlC when pressing c down', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.c});
    const mockSVGElement = renderer.createElement('svgElement') as SVGGraphicsElement;
    inputService.controlPressed = true;
    selectorService.selectedShapes.push(mockSVGElement);
    component.onKeyDown(keyboardEvent);
    expect(clipboardService.controlC).toHaveBeenCalled();
  });

  it('should call controlX and update when pressing x down', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.x});
    const mockSVGElement = renderer.createElement('svgElement') as SVGGraphicsElement;
    inputService.controlPressed = true;
    selectorService.selectedShapes.push(mockSVGElement);
    component.onKeyDown(keyboardEvent);
    expect(includingBoxService.update).toHaveBeenCalled();
    expect(clipboardService.controlX).toHaveBeenCalled();
  });

  it('should call controlA, update and assignTool when pressing a down', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.a});
    inputService.controlPressed = true;
    component.onKeyDown(keyboardEvent);
    eventEmitterService.clearCanvas(); // removefate
    expect(includingBoxService.update).toHaveBeenCalled();
    expect(clipboardService.controlA).toHaveBeenCalled();
   // expect(eventEmitterService.assignSelectedTool).toHaveBeenCalled();
  });

  it('should delete clipboard and update includingbox', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.delete});
    component.onKeyDown(keyboardEvent);
    expect(clipboardService.delete).toHaveBeenCalled();
    expect(includingBoxService.update).toHaveBeenCalled();
  });

  it('should call preventDefault for the submited event', () => {
    const keyboardEvent = new KeyboardEvent('keydown', {key: KEY.d});
    const spy = spyOn(keyboardEvent, 'preventDefault');
    inputService.controlPressed = true;
    component.onKeyDown(keyboardEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should change stamp angle', () => {
    const wheelEvent = new WheelEvent('keydown');
    component.selectedTool = TOOL.stamp;
    component.onwheel(wheelEvent);
    expect(inputService.changeStampAngle).toHaveBeenCalled();
  });

  it('should not change stamp angle', () => {
    const wheelEvent = new WheelEvent('keydown');
    component.selectedTool = TOOL.line;
    component.onwheel(wheelEvent);
    expect(inputService.changeStampAngle).not.toHaveBeenCalled();
  });

  it('should call penService mouse up', () => {
    const mouseEvent = new MouseEvent('click');
    component.selectedTool = TOOL.pen;
    component.onMouseUp(mouseEvent);
    expect(penService.onMouseUp).toHaveBeenCalled();
  });

  it('should not call selected shape mouseup', () => {
    const mouseEvent = new MouseEvent('click');
    component.selectedTool = TOOL.colorApplicator;
    component.onMouseUp(mouseEvent);
    expect(component.selectedShape.onMouseUp).not.toHaveBeenCalled();
  });

  it('should call selected shape mouseup', () => {
    const mouseEvent = new MouseEvent('click');
    component.selectedTool = TOOL.line;
    component.onMouseUp(mouseEvent);
    expect(component.selectedShape.onMouseUp).toHaveBeenCalled();
  });

  it('should call getSpeed', () => {
    const mouseEvent = new MouseEvent('move');
    component.onMouseMove(mouseEvent);
    expect(penService.getSpeed).toHaveBeenCalled();
  });

  it('should call set mouseOffset and call mousemove', () => {
    const mouseEvent = new MouseEvent('mousemove');
    component.selectedTool = TOOL.line;
    component.selectedShape = renderer.createElement('shape') as Shape;
    component.onMouseMove(mouseEvent);
    expect(inputService.setMouseOffset).toHaveBeenCalled();
    expect(component.selectedShape.onMouseMove).toHaveBeenCalled();
  });

  it('should call intersection and update', () => {
    const mouseEvent = new MouseEvent('mousemove');
    component.selectedTool = TOOL.selector;
    component.selectedShape = renderer.createElement('shape') as Shape;
    component.selectorAreaActive = true;
    component.onMouseMove(mouseEvent);
    expect(includingBoxService.update).toHaveBeenCalled();
    expect(selectorService.intersection).toHaveBeenCalled();
  });

  it('should call eraseShapes and updatePosition', () => {
    const mouseEvent = new MouseEvent('mousemove');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.eraser;
    eraserService.eraseMouseDown = true;
    component.onMouseMove(mouseEvent);
    expect(eraserService.updatePosition).toHaveBeenCalled();
    expect(eraserService.eraseShapes).toHaveBeenCalled();
  });

  it('should set areaactive to true and isnotempty to true', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.line;
    inputService.isNotEmpty = false;
    component.selectorAreaActive = false;
    component.onMouseDown(mouseEvent);
    expect(inputService.mouseButton).toEqual(mouseEvent.button);
    expect(inputService.isNotEmpty).toBeTruthy();
    expect(component.selectorAreaActive).toBeTruthy();
  });

  it('should empty selected shapes array', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.line;
    component.onMouseDown(mouseEvent);
    expect(selectorService.selectedShapes).toEqual(ɵEMPTY_ARRAY);
  });

  it('should get colors', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.pipette;
    component.onMouseDown(mouseEvent);
    expect(pipetteService.getColors).toHaveBeenCalled();
  });

  it('should assign eraseMouseDown to true', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.eraser;
    component.onMouseDown(mouseEvent);
    expect(eraserService.eraseMouseDown).toBeTruthy();
  });

  it('should call textservice mousedown', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.text;
    component.onMouseDown(mouseEvent);
    expect(textService.onMouseDown).toHaveBeenCalled();
  });

  it('should assign isblank to false and cal setmakingcolorchanges', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.line;
    inputService.isBlank = true;
    component.onMouseDown(mouseEvent);
    expect(colorService.setMakingColorChanges).toHaveBeenCalled();
    expect(inputService.isBlank).not.toBeTruthy();
  });

  it('should call includingBox update', () => {
    const mouseEvent = new MouseEvent('mousedown');
    component.selectedShape = renderer.createElement('shape') as unknown as Shape;
    component.selectedTool = TOOL.selector;
    component.selectorAreaActive = true;
    component.onMouseDown(mouseEvent);
    expect(includingBoxService.update).toHaveBeenCalled();
  });

  it('should set new selection to true', () => {
    const mouseEvent = new MouseEvent('click');
    component.selectedTool = TOOL.selector;
    component.onMouseUp(mouseEvent);
    expect(clipboardService.newSelection).toBeTruthy();
  });

  it('should eraseShapes and set erasedown to true', () => {
    const mouseEvent = new MouseEvent('click');
    component.selectedTool = TOOL.selector;
    component.selectedShape = rectangleService;
    component.onMouseUp(mouseEvent);
    expect(eraserService.eraseMouseDown).not.toBeTruthy();
    expect(eraserService.eraseShapes).toHaveBeenCalled();
  });

  it('should assign undoIsStarted to false and clearinterval', () => {
    const mouseEvent = new MouseEvent('click');
    undoRedoService.undoIsStarted = true;
    component.selectedTool = TOOL.line;
    component.onMouseUp(mouseEvent);
    expect(undoRedoService.undoIsStarted).not.toBeTruthy();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should confirm that shape is null', () => {
    const mouseEvent = new MouseEvent('click');
    undoRedoService.undoIsStarted = true;
    component.selectedTool = TOOL.colorApplicator;
    component.shape = renderer.createElement('shape');
    component.onMouseUp(mouseEvent);
    expect(undoRedoService.addAction).not.toHaveBeenCalled();
  });

  it('should put isDrawed, areaActive to true and undoisstarted to false', () => {
    const mouseEvent = new MouseEvent('click');
    component.onMouseUp(mouseEvent);
    expect(inputService.isDrawed).toBeTruthy();
    expect(component.selectorAreaActive).toBeTruthy();
    expect(undoRedoService.undoIsStarted).not.toBeTruthy();
  });

  it('should return true as it is a complex shape', () => {
      const tag = 'rect';
      expect(component.isComplexShape(tag)).toBeTruthy();
  });

  it('should return false to as it is not a complex shape', () => {
    const tag = 'shape';
    expect(component.isComplexShape(tag)).not.toBeTruthy();
  });

  it('should return false to as it is not a complex shape', () => {
    const event = new Event('value');
    expect(component.notCanvasAndColorApplicator(event)).not.toBeTruthy();
  });

  it('should put isBlank to true', () => {
    const shape = renderer.createElement('testShape') as SVGSVGElement;
    component.selectedTool = TOOL.line;
    component.draw(shape);
    expect(inputService.isBlank).not.toBeTruthy();
    expect(colorService.setMakingColorChanges).toHaveBeenCalled();
  });

  it('should set renderer attributes', () => {
    component.click();
    expect(component.canvas.nativeElement.insertAdjacentHTML).toHaveBeenCalled();
    expect(renderer.setAttribute).toHaveBeenCalled();
    expect(renderer.setStyle).toHaveBeenCalled();
    expect(uploadService.backgroundColor).toEqual(EMPTY_STRING);
    expect(uploadService.height).toEqual(EMPTY_STRING);
    expect(uploadService.width).toEqual(EMPTY_STRING);
  });

});
