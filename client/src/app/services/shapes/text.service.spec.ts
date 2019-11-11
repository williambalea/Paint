import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { UndoRedoService } from '../undo-redo.service';
import { ViewChildService } from '../view-child.service';
import { TextService } from './text.service';

// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  // getFillColor(): void {return; }
  // addColorsToLastUsed(): void {return; }
  getFillColor(): string {return 'color'; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  getMouse(): Point {return {x: 1, y: 2}; }
}

describe('TextService', () => {
  let service: TextService;
  let colorService: ColorService;
  // let inputService: InputService;
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
        // { provide: RendererFactory2, useClass: RendererFactoryMock },
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

  // LES TESTS QUI NE MARCHENT PAS :

  // it('should update text attributes', () => {
  //   const spyOnSetTextAttributes = spyOn(renderer, 'setAttribute');
  //   service.updateTextAttributes();
  //   expect(spyOnSetTextAttributes).toHaveBeenCalled();
  // });

  // it('should excute on mouse down', () => {
  //   const spyOnCreateTextElements = spyOn(service, 'createTextElements');
  //   const spyOnSetTextAttributes = spyOn(service, 'setTextAttributes');
  //   const spyOnUpdate = spyOn(service, 'update');
  //   const spyOnAppendChild = spyOn(renderer, 'appendChild');
  //   service.onMouseDown();
  //   expect(spyOnCreateTextElements).toHaveBeenCalled();
  //   expect(spyOnSetTextAttributes).toHaveBeenCalled();
  //   expect(spyOnUpdate).toHaveBeenCalled();
  //   expect(spyOnAppendChild).toHaveBeenCalled();
  // });

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

  // it ('should line jumpBack', () => {
  //   service.textContent = '';
  //   service.lineJumpBack();
  //   expect(service.textContent).not.toEqual('');
  // });

  it ('should reassign text content', () => {
    // const child = renderer.createElement('svg') as ChildNode;
    // service.tspan = child.lastChild as HTMLElement;
    // service.text = document.createElement('text');
    // service.tspan = document.createElement('tspan');
    // service.tspan.setAttribute('innerHTML', '<p>test</p>');
    service.text.appendChild(renderer.createElement('text', 'svg') as ChildNode);
    const spyOnRemove = spyOn(renderer, 'removeChild');
    service.lineJumpBack();
    expect(spyOnRemove).toHaveBeenCalled();
    // expect(service.tspan).toEqual(service.text.lastChild as HTMLElement);
    // expect(service.textContent).toEqual(service.tspan.innerHTML);
  });

  // it('should line jump back', () => {
  //   // service.tspan = '' as unknown as HTMLElement;
  //   viewChildService.canvas = new ElementRef({ action: ACTIONS.append, shape: SVGGraphicsElement = renderer.createElement('text', 'svg')});
  //   const spyOnremoveChild = spyOn(renderer, 'removeChild');
  //   service.lineJumpBack();
  //   // expect(service.tspan).not.toEqual('');
  //   expect(service.textContent).not.toEqual('');
  //   // const spyOnRemoveChild = spyOn(renderer, 'removeChild');
  //   // service.lineJumpBack();
  //   expect(spyOnremoveChild).toHaveBeenCalled();
  // });

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

});
