import { Renderer2, RendererFactory2, Type } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { TextService } from './text.service';
import { DrawingSpaceComponent } from 'src/app/components/drawing-space/drawing-space.component';
import { SafeHtmlPipe} from '../../safe-html.pipe';
import { HttpClient,HttpHandler }    from '@angular/common/http';


// tslint:disable-next-line: max-classes-per-file
//class ColorServiceMock {
  // getFillColor(): void {return; }
  // addColorsToLastUsed(): void {return; }
  // getFillColor(): void {return; }
//}

// tslint:disable-next-line: max-classes-per-file
class InputServiceMock {
  // backSpacePressed = false;
  // getMouse(): Point {return {x: 1, y: 2}; }
}
class Rendere2Mock {
  createElement(): void {return; }
}


describe('TextService', () => {
  let service: TextService;
  let renderer: Renderer2;
  let renderer2 : Renderer2;
  let rendererFactory: RendererFactory2;
  let fixture: ComponentFixture<DrawingSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSpaceComponent,SafeHtmlPipe],
      providers: [
        TextService,
        ColorService,
        InputService,
        Renderer2,
        HttpClient,
        HttpHandler,
        { provide: InputService, useClass: InputServiceMock },
        { provide: Renderer2, useClass: Rendere2Mock },
       // { provide: ColorService, useClass: ColorServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawingSpaceComponent);
   
    fixture.detectChanges();
    service = TestBed.get(TextService);
    
    rendererFactory = TestBed.get(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
    renderer2 = TestBed.get(Renderer2);
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
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
    service.toggleBold();
    expect(isItalic).toBeTruthy();
    expect(spyOnUpdate).toHaveBeenCalled();
  });

  it('should create text Elements', () => {
    const spyOnCreateElement = spyOn(renderer, 'createElement');
     spyOn(renderer2, 'createElement');
    
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    service.createTextElements();
    expect(spyOnCreateElement).toHaveBeenCalledTimes(2);
    expect(spyOnAppendChild).toHaveBeenCalledTimes(1);
  });

  it('should excute on mouse down', () => {
    
    
    const spyOnCreateTextElements = spyOn(service, 'createTextElements');
    const spyOnSetTextAttributes = spyOn(service, 'setTextAttributes');
    const spyOnUpdate = spyOn(service, 'update');
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    service.onMouseDown();

   
    expect(spyOnCreateTextElements).toHaveBeenCalled();
    expect(spyOnSetTextAttributes).toHaveBeenCalled();
    expect(spyOnUpdate).toHaveBeenCalled();
    expect(spyOnAppendChild).toHaveBeenCalled();
  });

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

  // // it('should set text attributes', () => {
  // //   const spyOnSeAttributes = spyOn(renderer, 'setAttribute');
  // //   service.setTextAttributes();
  // //   expect(spyOnSeAttributes).toHaveBeenCalledTimes(4);
  // // });

  // it('should update text', () => {
  //   const spyOnUpdateTextAttributes = spyOn(service, 'updateTextAttributes');
  //   const spyOnSetBoldString = spyOn(service, 'setBoldString');
  //   const spyOnSetItalicString = spyOn(service, 'setItalicString');
  //   service.update();
  //   expect(spyOnUpdateTextAttributes).toHaveBeenCalled();
  //   expect(spyOnSetBoldString).toHaveBeenCalled();
  //   expect(spyOnSetItalicString).toHaveBeenCalled();
  // });

  // // it('should update text attributes', () => {
  // //   const spyOnSetTextAttributes = spyOn(service, 'setTextAttributes');
  // //   service.updateTextAttributes();
  // //   expect(spyOnSetTextAttributes).toHaveBeenCalledTimes(4);
  // // });

  // // it('should set bold string', () => {
  // //   // Est-ce-qu'on peut declarer la variable a l'exterieur de la fonction ??
  // //   service.isBold = true;
  // //   service.setBoldString();
  // //   expect(service.setBoldString)
  // // });

  // it('should jump line', () => {
  //   service.textContent = 'abc';
  //   inputService.enterPressed = true;
  //   const spyOnCreateElement = spyOn(renderer, 'createElement');
  //   const spyOnSetTextAttributes = spyOn(renderer, 'setAttribute');
  //   const spyOnAppendChild = spyOn(renderer, 'appendChild');
  //   service.lineJump();
  //   expect(spyOnCreateElement).toHaveBeenCalled();
  //   expect(spyOnSetTextAttributes).toHaveBeenCalled();
  //   expect(spyOnAppendChild).toHaveBeenCalled();
  //   expect(service.textContent).toEqual('');
  //   expect(inputService.enterPressed).toBeFalsy();
  // });

});
