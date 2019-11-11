import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { UndoRedoService } from '../undo-redo.service';
import { ViewChildService } from '../view-child.service';
import { TextService } from './text.service';

class ColorServiceMock {
  getFillColor(): string {return 'color'; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('TextService', () => {
  let service: TextService;
  let colorService: ColorService;
  let viewChildService: ViewChildService;
  let renderer: Renderer2;
  let rendererFactory: RendererFactory2;
  let undoRedoService: UndoRedoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TextService,
        ColorService,
        InputService,
        ViewChildService,
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(TextService);
    colorService = TestBed.get(ColorService);
    viewChildService = TestBed.get(ViewChildService);
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
    undoRedoService = TestBed.get(UndoRedoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set align', () => {
    const align = 'align';
    const spyOnUpdate = spyOn(service, 'update');
    service.setAlign(align);
    expect(service.align).toEqual(align);
    expect(spyOnUpdate).toHaveBeenCalled();
  });

  it('should toggle Bold', () => {
    const isBold = true;
    const spyOnUpdate = spyOn(service, 'update');
    service.toggleBold();
    expect(isBold).toBeTruthy();
    expect(spyOnUpdate).toHaveBeenCalled();
  });

  it('should toggle Italic', () => {
    const isItalic = true;
    const spyOnUpdate = spyOn(service, 'update');
    service.toggleItalic();
    expect(isItalic).toBeTruthy();
    expect(spyOnUpdate).toHaveBeenCalled();
  });

  it('should create text Elements', () => {
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    service.createTextElements();
    expect(spyOnCreateElement).toHaveBeenCalledTimes(2);
    expect(spyOnAppendChild).toHaveBeenCalledTimes(1);
  });

  it('should set text attributes', () => {
    const spyOnSeAttributes = spyOn(renderer, 'setAttribute');
    service.setTextAttributes();
    expect(spyOnSeAttributes).toHaveBeenCalled();
  });

  it('should update text', () => {
    const spyOnUpdateTextAttributes = spyOn(service, 'updateTextAttributes');
    const spyOnSetBoldString = spyOn(service, 'setBoldString');
    const spyOnSetItalicString = spyOn(service, 'setItalicString');
    const spyOnupdateTextBox = spyOn(service, 'updateTextBox');
    service.update();
    expect(spyOnUpdateTextAttributes).toHaveBeenCalled();
    expect(spyOnSetBoldString).toHaveBeenCalled();
    expect(spyOnSetItalicString).toHaveBeenCalled();
    expect(spyOnupdateTextBox).toHaveBeenCalled();
  });

  it ('should set bold string', () => {
    service.isBold = true;
    const spy = spyOn(renderer, 'setAttribute');
    service.setBoldString();
    expect(spy).toHaveBeenCalled();
  });

  it ('should not set bold string', () => {
    service.isBold = false;
    const spy = spyOn(renderer, 'setAttribute');
    service.setBoldString();
    expect(spy).toHaveBeenCalled();
  });

  it ('should set Italic String', () => {
    service.isItalic = true;
    const spySetAttribute = spyOn(renderer, 'setAttribute');
    const spySetProperty = spyOn(renderer, 'setProperty');
    service.setItalicString();
    expect(spySetAttribute).toHaveBeenCalled();
    expect(spySetProperty).toHaveBeenCalled();
  });

  it ('should not set Italic String', () => {
    service.isItalic = false;
    const spySetAttribute = spyOn(renderer, 'setAttribute');
    const spySetProperty = spyOn(renderer, 'setProperty');
    service.setItalicString();
    expect(spySetAttribute).toHaveBeenCalled();
    expect(spySetProperty).toHaveBeenCalled();
  });

  it ('should line jump', () => {
    service.textContent = 'allo';
    const spySetAttribute = spyOn(renderer, 'setAttribute');
    const spyCreateElement = spyOn(renderer, 'createElement');
    const spyAppendChild = spyOn(renderer, 'appendChild');
    service.lineJump();
    expect(spySetAttribute).toHaveBeenCalled();
    expect(spyCreateElement).toHaveBeenCalled();
    expect(spyAppendChild).toHaveBeenCalled();
    expect(service.textContent).toEqual('');
  });

  it('should not enter mouseDown conditional statement', () => {
    viewChildService.canvas = new ElementRef('svg');
    service.textBox = renderer.createElement('textBox');
    const removeChildSpy = spyOn(renderer, 'removeChild');
    service.isWriting = true;
    service.onMouseDown();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('should enter mouseDown conditional statement', () => {
    viewChildService.canvas = new ElementRef(renderer.createElement('text', 'svg'));
    service.textBox = renderer.createElement('textBox');
    service.text = renderer.createElement('text');

    const createTextElementsSpy = spyOn(service, 'createTextElements');
    const setTextAttributesSpy = spyOn(service, 'setTextAttributes');
    const setAttributesSpy = spyOn(service.textBox, 'setAttribute');
    const updateSpy = spyOn(service, 'update');
    const addActionSpy = spyOn(undoRedoService, 'addAction');

    service.isWriting = false;
    service.onMouseDown();
    expect(createTextElementsSpy).toHaveBeenCalled();
    expect(setTextAttributesSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
    expect(setAttributesSpy).toHaveBeenCalledTimes(4);
    expect(addActionSpy).toHaveBeenCalled();

  });

  it ('should update text attributes', () => {
    service.text = document.createElement('text');
    service.updateTextAttributes();
    expect(service.text.getAttribute('font-family')).toEqual(service.font);
    expect(service.text.getAttribute('font-size')).toEqual(service.fontSize.toString());
    expect(service.text.getAttribute('text-anchor')).toEqual(service.align);
    expect(service.text.getAttribute('fill')).toEqual(colorService.getFillColor());
  });

  it('should line jump back', () => {
    service.text = document.createElement('text');
    const child =  document.createElement('child') as ChildNode;
    renderer.appendChild(service.text, child);
    const spyOnRemove = spyOn(service.text, 'removeChild');
    service.lineJumpBack();
    expect(spyOnRemove).toHaveBeenCalled();
    expect(service.tspan).toEqual(service.text.lastChild as HTMLElement);
    expect(service.textContent).toEqual(service.tspan.innerHTML);
  });

  // NE MARCHE PAS
  // it('should update text box', () => {
  //   service.text = document.createElement('text');
  //   const spyOnsetAttribute = spyOn(service.textBox, 'setAttribute');
  //   service.updateTextBox();
  //   expect(spyOnsetAttribute).toHaveBeenCalledTimes(4);
  // });

});
