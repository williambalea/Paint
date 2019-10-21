import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PipetteService } from 'src/app/services/color/pipette.service';
import { ScreenshotService } from 'src/app/services/shapes/screenshot.service';
import { ColorService } from './color.service';
// import { ElementRef } from '@angular/core';

class ScreenshotServiceMock {
  screenshotBase64(): void {return; }
}

// tslint:disable-next-line: max-classes-per-file
class ColorServiceMock {
  setFillColor(): void {return; }
  setStrokeColor(): void {return; }
}

describe('PipetteService', () => {
  let service: PipetteService;
  let screenshotService: ScreenshotService;
  let colorService: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PipetteService,
        { provide: ScreenshotService, useClass: ScreenshotServiceMock },
        { provide: ColorService, useClass: ColorServiceMock },
      ],

    }).compileComponents();
    service = TestBed.get(PipetteService);
    screenshotService = TestBed.get(ScreenshotService);
    colorService = TestBed.get(ColorService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setFillColor on left click', () => {
    const fillSpy = spyOn(colorService, 'setFillColor');
    const strokeSpy = spyOn(colorService, 'setStrokeColor');

    const data = new Uint8ClampedArray();
    const mouseEvent = new MouseEvent('mousedown', {button: 0});
    // tslint:disable-next-line: no-string-literal
    service['setUserColors'](mouseEvent, data );
    expect(fillSpy).toHaveBeenCalled();
    expect(strokeSpy).not.toHaveBeenCalled();
  });

  it('should setFillColor on right click', () => {
    const fillSpy = spyOn(colorService, 'setFillColor');
    const strokeSpy = spyOn(colorService, 'setStrokeColor');

    const data = new Uint8ClampedArray();
    const mouseEvent = new MouseEvent('mousedown', {button: 2});
    // tslint:disable-next-line: no-string-literal
    service['setUserColors'](mouseEvent, data );
    expect(fillSpy).not.toHaveBeenCalled();
    expect(strokeSpy).toHaveBeenCalled();
  });

  it('should not set any color', () => {
    const fillSpy = spyOn(colorService, 'setFillColor');
    const strokeSpy = spyOn(colorService, 'setStrokeColor');

    const data = new Uint8ClampedArray();
    const mouseEvent = new MouseEvent('mousedown', {button: 1});
    // tslint:disable-next-line: no-string-literal
    service['setUserColors'](mouseEvent, data );
    expect(fillSpy).not.toHaveBeenCalled();
    expect(strokeSpy).not.toHaveBeenCalled();
  });

  it('should get colors', () => {
    const screenSpy = spyOn(screenshotService, 'screenshotBase64');

    const width = 10;
    const height = 10;
    const event = new MouseEvent('mousemove');
    const htmlel1 = new ElementRef({nativeElement: {height: 10, width: 10 }});
    const htmlel2 = new ElementRef({nativeElement: {height: 20, width: 20 }});

    service.getColors(event,  htmlel1, htmlel2, height, width);
    expect(screenSpy).toHaveBeenCalled();
  });
});
