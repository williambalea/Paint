import { HttpClient, HttpHandler } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { EMPTY, of } from 'rxjs';
import { ColorService } from 'src/app/services/color/color.service';
import { HIDE_DIALOG, KEY, TOOL } from 'src/constants';
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

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let dialog: MatDialog;
  let colorService: ColorService;

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

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
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
    expect(component.selectedTool).not.toBeDefined();
    component.selectTool(TOOL.rectangle);
    expect(component.selectedTool).toEqual(TOOL.rectangle);
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
    const pressingO = new KeyboardEvent('keydown', {key: KEY.o});
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

  it('should select brush tool when pressing \'w\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingW = new KeyboardEvent('keydown', {key: KEY.w});
    component.onKeyDown(pressingW);
    expect(component.selectedTool).toEqual(TOOL.brush);
  });

  it('should select pen tool when pressing \'c\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingC = new KeyboardEvent('keydown', {key: KEY.c});
    component.onKeyDown(pressingC);
    expect(component.selectedTool).toEqual(TOOL.pen);
  });

  it('should select colorApplicator tool when pressing \'r\' on keyboard', () => {
    component.enableKeyPress = true;
    const pressingR = new KeyboardEvent('keydown', {key: KEY.r});
    component.onKeyDown(pressingR);
    expect(component.selectedTool).toEqual(TOOL.colorApplicator);
  });

  it('should do nothing when pressing other keys', () => {
    component.enableKeyPress = true;
    const pressingOther = new KeyboardEvent('keydown', {key: 'i'});
    component.onKeyDown(pressingOther);
    expect(component.selectedTool).not.toBeDefined();
  });

});
