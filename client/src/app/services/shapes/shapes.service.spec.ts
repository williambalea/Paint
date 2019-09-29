import { TestBed } from '@angular/core/testing';
import { Pen } from 'src/Classes/Shapes/pen';
import { Rectangle } from 'src/Classes/Shapes/rectangle';
import { COLORS } from 'src/constants';
import { Brush } from './../../../Classes/Shapes/brush';
import { ShapesService } from './shapes.service';

describe('ShapesService', () => {
  let service: ShapesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShapesService,
      ],
    }).compileComponents();
    service = TestBed.get(ShapesService);
  });

  it('Should remove filling color if fillEnable is false', () => {
    service.fillEnable = false;
    service.strokeEnable = true;
    service.fillColor = COLORS.blueRGBA;
    const spy = spyOn(service, 'removeColor').and.callThrough();
    service.setRectangleType();
    expect(service.fillColor).toEqual('rgba(0, 0, 255,0)');
    expect(spy).toHaveBeenCalled();
  });

  it('Should remove stoke color if strokeEnable is false', () => {
    service.fillEnable = true;
    service.strokeEnable = false;
    service.strokeColor = COLORS.blueRGBA;
    const spy = spyOn(service, 'removeColor').and.callThrough();
    service.setRectangleType();
    expect(service.strokeColor).toEqual('rgba(0, 0, 255,0)');
    expect(spy).toHaveBeenCalled();
  });

  it('Should draw Rectangle', () => {
    service.drawRectangle();
    expect(service.shapes.length).toEqual(1);
    expect(service.shapes[0]).toEqual(jasmine.any(Rectangle));
  });

  it('Should draw brush', () => {
    service.drawBrush();
    expect(service.shapes.length).toEqual(1);
    expect(service.shapes[0]).toEqual(jasmine.any(Brush));
  });

  it('Should draw Pen', () => {
    service.drawPen();
    expect(service.shapes.length).toEqual(1);
    expect(service.shapes[0]).toEqual(jasmine.any(Pen));
  });

  it('Should clear all shapes', () => {
    service.clearShapes();
    expect(service.shapes.length).toEqual(0);
    service.drawPen();
    expect(service.shapes.length).toEqual(1);
    service.drawRectangle();
    expect(service.shapes.length).toEqual(2);
    service.clearShapes();
    expect(service.shapes.length).toEqual(0);
  });

});
