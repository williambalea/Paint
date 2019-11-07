import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2, RendererFactory2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { EMPTY, of } from 'rxjs';
import { ColorService } from 'src/app/services/color/color.service';
import { UndoRedoAction } from 'src/app/services/undoRedoAction';
import { ACTIONS, HIDE_DIALOG, KEY, TOOL } from 'src/constants';
import { UndoRedoService } from './../../services/undo-redo.service';
import { SideBarComponent } from './side-bar.component';

export class MatDialogMock {
  // on ne precise pas le type de retour car on n'est pas certain de ce dernier.
  open(): any {
    return { afterClosed: () => of({ name: 'some object' }) };
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ColorServiceMock {
  setMakingColorChanges(): void { return; }
  setShowInAttributeBar(): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
class UndoRedoServiceMock {
  actions: UndoRedoAction[];
  poppedActions: UndoRedoAction[];
  undo(): void { return; }
}

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let dialog: MatDialog;
  let colorService: ColorService;
  let undoRedoService: UndoRedoService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarComponent ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        SideBarComponent,
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: ColorService, useClass: ColorServiceMock },
        { provide: UndoRedoService, useClass: UndoRedoServiceMock },
        Renderer2,
        Overlay,
        HttpClient,
        HttpHandler,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    component = TestBed.get(SideBarComponent);
    dialog = TestBed.get(MatDialog);
    colorService = TestBed.get(ColorService);
    undoRedoService = TestBed.get(UndoRedoService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    undoRedoService = fixture.debugElement.injector.get(UndoRedoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call openEntryPoint if HIDE_DIALOG is in local stoarge', () => {
    const spy = spyOn(component, 'openEntryPoint').and.callThrough();
    localStorage.clear();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnInit should set enableKeyPress to true if HIDE_DIALOG exists in local storage', () => {
    localStorage.setItem(HIDE_DIALOG, JSON.stringify(true));
    component.ngOnInit();
    expect(component.enableKeyPress).toBeTruthy();
  });

  it('should open EntryPoint modal window', () => {
    const spy = spyOn(dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any);
    component.openEntryPoint();
    expect(spy).toHaveBeenCalled();
  });

  it('should create a new item in localStorage if hideDialog is true', () => {
    localStorage.clear();

    let hideDialog = false;
    component.setLocalStorageTrace(hideDialog);
    expect(localStorage.getItem(HIDE_DIALOG)).toBeNull();

    hideDialog = true;
    component.setLocalStorageTrace(hideDialog);
    expect(localStorage.getItem(HIDE_DIALOG)).toBeDefined();
  });

  it('should always enable key presses after setting trace', () => {
    component.setLocalStorageTrace(true);
    expect(component.enableKeyPress).toBeTruthy();

    component.setLocalStorageTrace(false);
    expect(component.enableKeyPress).toBeTruthy();
  });

  it('should set selectedTool when chosing tool', () => {
    component.selectTool(TOOL.rectangle);
    expect(component.selectedTool).toEqual(TOOL.rectangle);
  });

  it('should set selectedTool to grid when chosing tool', () => {
    component.selectTool(TOOL.grid);
    expect(component.selectedTool).toEqual(TOOL.grid);
  });

  it('should set selectedTool to stamp when chosing tool', () => {
    component.selectTool(TOOL.stamp);
    expect(component.selectedTool).toEqual(TOOL.stamp);
  });

  it('should access default case when selectTool', () => {
    component.selectTool('pipette');
    expect(component.selectedTool).toEqual(TOOL.pipette);
    component.selectTool('abc');
    expect(component.selectedTool).toEqual(TOOL.pipette);
  });

  it('should set selectedTool to colorApplicator when chosing tool', () => {
    component.selectTool(TOOL.colorApplicator);
    expect(component.selectedTool).toEqual(TOOL.colorApplicator);
  });

  it('should change canvas color and unlock the color palette', () => {
    const spyColorChange = spyOn(colorService, 'setMakingColorChanges');
    const spyShowPalette = spyOn(colorService, 'setShowInAttributeBar');
    component.setColorNewFile();
    expect(spyColorChange).toHaveBeenCalled();
    expect(spyShowPalette).toHaveBeenCalled();
  });

  it('should disable key presses then enable them after closing new-file modal window', () => {
    component.createNewFile();
    expect(component.enableKeyPress).toBeTruthy();
  });

  it('should have opened new-file modal window', () => {
    const spy = spyOn(dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any);
    component.createNewFile();
    expect(spy).toHaveBeenCalled();
  });

  it('should have set a new color to canvas', () => {
    const spy = spyOn(component, 'setColorNewFile');
    component.createNewFile();
    expect(spy).toHaveBeenCalled();
  });

  it('should open new-file window when pressing \'o\' on keyboard', () => {
    const spy = spyOn(component, 'createNewFile');
    component.enableKeyPress = false;
    const pressingO = new KeyboardEvent('keydown', {key: KEY.o, ctrlKey: true});
    component.onKeyDown(pressingO);
    expect(spy).not.toHaveBeenCalled();

    component.enableKeyPress = true;
    component.onKeyDown(pressingO);
    expect(spy).toHaveBeenCalled();
  });

  it('should select rectangle tool when pressing \'1\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressing1 = new KeyboardEvent('keydown', {key: KEY.one});
    component.onKeyDown(pressing1);
    expect(component.selectedTool).toEqual(TOOL.rectangle);
  });

  it('should not enable keypress when accessing server', () => {
    component.enableKeyPress = true;
    component.accessServer();
    expect(component.enableKeyPress).toBeTruthy();
  });

  it('should not enable keypress when saving on server', () => {
    component.enableKeyPress = true;
    component.saveOnServer();
    expect(component.enableKeyPress).toBeTruthy();
  });

  it('should select brush tool when pressing \'w\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingW = new KeyboardEvent('keydown', {key: KEY.w});
    component.onKeyDown(pressingW);
    expect(component.selectedTool).toEqual(TOOL.brush);
  });

  it('should select pencil tool when pressing \'c\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingC = new KeyboardEvent('keydown', {key: KEY.c});
    component.onKeyDown(pressingC);
    expect(component.selectedTool).toEqual(TOOL.pencil);
  });

  it('should select colorApplicator tool when pressing \'r\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingR = new KeyboardEvent('keydown', {key: KEY.r});
    component.onKeyDown(pressingR);
    expect(component.selectedTool).toEqual(TOOL.colorApplicator);
  });

  it('should select polygon tool when pressing \'3\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressing = new KeyboardEvent('keydown', {key: KEY.three});
    component.onKeyDown(pressing);
    expect(component.selectedTool).toEqual(TOOL.polygon);
  });

  it('should select ellipse tool when pressing \'2\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressing = new KeyboardEvent('keydown', {key: KEY.two});
    component.onKeyDown(pressing);
    expect(component.selectedTool).toEqual(TOOL.ellipse);
  });

  it('should select pipette tool when pressing \'i\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressing = new KeyboardEvent('keydown', {key: KEY.i});
    component.onKeyDown(pressing);
    expect(component.selectedTool).toEqual(TOOL.pipette);
  });

  it('should select line tool when pressing \'l\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressing = new KeyboardEvent('keydown', {key: KEY.l});
    component.onKeyDown(pressing);
    expect(component.selectedTool).toEqual(TOOL.line);
  });

  it('should select selector tool when pressing \'s\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingS = new KeyboardEvent('keydown', {key: KEY.s});
    component.onKeyDown(pressingS);
    expect(component.selectedTool).toEqual(TOOL.selector);
  });

  it('should select text tool when pressing \'t\' on keyboard', () => {
    component.enableKeyPress = true;
    const action = new KeyboardEvent('keydown', {key: KEY.t});
    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.text);
  });

  it('should select pen tool when pressing \'y\' on keyboard', () => {
    component.enableKeyPress = true;
    const action = new KeyboardEvent('keydown', {key: KEY.y});
    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.pen);
  });

  it('should select eraser tool when pressing \'e\' without ctrl on keyboard', () => {
    component.enableKeyPress = true;
    const spy = spyOn(component, 'export');
    const action = new KeyboardEvent('keydown', {key: KEY.e, ctrlKey: false});

    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.eraser);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should export when pressing \'e\' and ctrl on keyboard', () => {
    component.enableKeyPress = true;
    const spy = spyOn(component, 'export');
    const action = new KeyboardEvent('keydown', {key: KEY.e, ctrlKey: true});

    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.noTool);
    expect(spy).toHaveBeenCalled();
  });

  it('should access server when pressing \'g\' and ctrl on keyboard', () => {
    component.enableKeyPress = true;
    const spy = spyOn(component, 'accessServer');
    const action = new KeyboardEvent('keydown', {key: KEY.g, ctrlKey: true});

    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.noTool);
    expect(spy).toHaveBeenCalled();
  });

  it('should not access server when pressing \'g\' wihtout ctrl on keyboard', () => {
    component.enableKeyPress = true;
    const spy = spyOn(component, 'accessServer');
    const action = new KeyboardEvent('keydown', {key: KEY.g, ctrlKey: false});

    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.noTool);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should save on server when pressing \'s\' and ctrl on keyboard', () => {
    component.enableKeyPress = true;
    const spy = spyOn(component, 'saveOnServer');
    const action = new KeyboardEvent('keydown', {key: KEY.s, ctrlKey: true});

    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.noTool);
    expect(spy).toHaveBeenCalled();
  });

  it('should select selector tool when pressing \'s\' without ctrl on keyboard', () => {
    component.enableKeyPress = true;
    const spy = spyOn(component, 'saveOnServer');
    const action = new KeyboardEvent('keydown', {key: KEY.s, ctrlKey: false});

    component.onKeyDown(action);
    expect(component.selectedTool).toEqual(TOOL.selector);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should do nothing when pressing other keys', () => {
    component.enableKeyPress = true;
    const press1 = new KeyboardEvent('keydown', {key: '1'});
    component.onKeyDown(press1);
    expect(component.selectedTool).toEqual(TOOL.rectangle);
    const press2 = new KeyboardEvent('keydown', {key: 'p'});
    component.onKeyDown(press2);
    expect(component.selectedTool).toEqual(TOOL.rectangle);
  });

  it('should trigger undo action', () => {
    component.enableKeyPress = true;
    const spy = spyOn(undoRedoService, 'undo');
    const event = new KeyboardEvent('keydown', {key: KEY.z, ctrlKey: true});
    let element: SVGGraphicsElement;
    element = renderer.createElement('rect', 'svg');
    const test: UndoRedoAction = {
      action: ACTIONS.append,
      shape: element,
    };
    undoRedoService.actions.push(test);

    component.onKeyDown(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger redo action', () => {
    component.enableKeyPress = true;
    const spy = spyOn(undoRedoService, 'redo');
    const event = new KeyboardEvent('keydown', {key: KEY.Z, ctrlKey: true});
    let element: SVGGraphicsElement;
    element = renderer.createElement('rect', 'svg');
    const test: UndoRedoAction = {
      action: ACTIONS.append,
      shape: element,
    };
    undoRedoService.poppedActions.push(test);

    component.onKeyDown(event);
    expect(spy).toHaveBeenCalled();
  });

});
