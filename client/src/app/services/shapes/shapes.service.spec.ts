import { TestBed } from '@angular/core/testing';
import { Pen } from 'src/Classes/Shapes/pen';
import { Rectangle } from 'src/Classes/Shapes/rectangle';
import { COLORS, TOOL } from 'src/constants';
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

  it('Should set color transparency to zero', () => {
    service.fillColor = COLORS.greenRBGA;
    expect(service.fillColor).toEqual('rgba(0, 255, 0, 1)');
    service.fillColor = service.removeColor(service.fillColor);
    expect(service.fillColor).toEqual('rgba(0, 255, 0,0)');
  });

  it('Should call setRectangleOffset', () => {
    const spy = spyOn(service, 'setRectangleOffset');
    service.setRectangleOffset();
    expect(spy).toHaveBeenCalled();
  });

  it('Should modify rectangleOffset attributes', () => {
    service.mouse = {x: 50, y: 50};
    service.origin = {x: 75, y: 100};
    service.preview = {
      active: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      path: '',
      filter: '',
    };
    service.setRectangleOffset();

    expect(service.preview.width).toEqual(Math.abs(service.mouse.x - service.origin.x));
    expect(service.preview.height).toEqual(Math.abs(service.mouse.y - service.origin.y));
    expect(service.preview.x).toEqual(Math.min(service.origin.x, service.mouse.x));
    expect(service.preview.y).toEqual(Math.min(service.origin.y, service.mouse.y));
  });

  it('Should modify squareOffset attributes', () => {
    service.mouse = {x: 50, y: 50};
    service.origin = {x: 75, y: 100};
    service.preview = {
      active: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      path: '',
      filter: '',
    };
    service.setSquareOffset();

    expect(service.preview.width).not.toEqual(0);
    expect(service.preview.height).not.toEqual(0);
    expect(service.preview.x).not.toEqual(0);
    expect(service.preview.y).not.toEqual(0);
  });

  it('Should return all shape objects', () => {
    service.shapes = [];
    const shape = new Rectangle(TOOL.rectangle, 0, 0, 50, 50, '', '', 1);
    service.shapes.push(shape);
    const shapesTable = service.getShapes();
    expect(shapesTable).toEqual(service.shapes);
  });

  it('Should initialise origin and preview', () => {
    service.origin = {x: 75, y: 100};
    service.preview = {
      active: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      path: '',
      filter: '',
    };
    const event = new MouseEvent('mouseDown');
    event.initMouseEvent('mouseDown', true, false, window, 0, 0, 0, 100, 100, false, false, false, false, 0, null);
    service.setMouseOrigin(event);
    expect(service.preview.x).not.toEqual(0);
    expect(service.preview.y).not.toEqual(0);
    expect(service.preview.width).toEqual(0);
    expect(service.preview.height).toEqual(0);
  });

});
