import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { TextService } from './text.service';

class RendererMock {
  // createElement(): void {return; }
  // setStyle(): void {return; }
  // setAttribute(): void {return; }
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
  // let renderer: Renderer2;

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
    // renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
