import { Pen } from 'src/Classes/Shapes/pen';
import { Rectangle } from 'src/Classes/Shapes/rectangle';
import { Brush } from './../../../Classes/Shapes/brush';
import { ShapesService } from './shapes.service';

describe('ShapesService', () => {
  let service: ShapesService;
  beforeEach(() => {
    service = new ShapesService();
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
