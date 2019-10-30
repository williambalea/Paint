import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { TextService } from './text.service';

class RendererMock {
  createElement(): void {return; }
  // setStyle(): void {return; }
  setAttribute(): void {return; }
  appendChild(): void {return;}
 }
// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  // getFillColor(): void {return; }
  // addColorsToLastUsed(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  // getMouse(): Point {return {x: 1, y: 2}; }
}

fdescribe('TextService', () => {
  let service: TextService;
  // let colorService: ColorService;
  // let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TextService,
        ColorService,
        InputService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: InputService, useClass: InputServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(TextService);
    // colorService = TestBed.get(ColorService);
    // inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
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

  // it('should toggle Bold', () => {
  //   const isBold = true;
  //   service.toggleBold();
  //   expect(isBold).toBeTruthy();
  // });

  it('should excute on mouse down', () => {
    const spyOnCreateTextElements = spyOn(service, 'createTextElements');
    const spyOnSetTextAttributes = spyOn(service, 'setTextAttributes');
    const spyOnUpdate = spyOn(service, 'update');
    service.onMouseDown();
    expect(spyOnCreateTextElements).toHaveBeenCalled();
    expect(spyOnSetTextAttributes).toHaveBeenCalled();
    expect(spyOnUpdate).toHaveBeenCalled();
  });

  it('should create text Elements', () => {
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    service.createTextElements();
    expect(spyOnCreateElement).toHaveBeenCalledTimes(2);
    expect(spyOnAppendChild).toHaveBeenCalledTimes(1);
  });

  // it('should set text attributes', () => {
  //   const spyOnSeAttributes = spyOn(renderer, 'setAttribute');
  //   service.setTextAttributes();
  //   expect(spyOnSeAttributes).toHaveBeenCalledTimes(4);
  // });

  it('should update text', () => {
    const spyOnUpdateTextAttributes = spyOn(service, 'updateTextAttributes');
    const spyOnSetBoldString = spyOn(service, 'setBoldString');
    const spyOnSetItalicString = spyOn(service, 'setItalicString');
    service.update();
    expect(spyOnUpdateTextAttributes).toHaveBeenCalled();
    expect(spyOnSetBoldString).toHaveBeenCalled();
    expect(spyOnSetItalicString).toHaveBeenCalled();
  });

});
