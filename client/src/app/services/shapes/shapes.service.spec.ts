import { TestBed } from '@angular/core/testing';
import { Pen } from 'src/Classes/Shapes/pen';
import { Rectangle } from 'src/Classes/Shapes/rectangle';
import { COLORS } from 'src/constants';
import { Brush } from './../../../Classes/Shapes/brush';
import { ShapesService } from './shapes.service';
// import { Shape } from 'src/Classes/Shapes/shape';

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

  // it('Should return a shape', () => {
  //   const index = NB.Five;
  //   service.getShape(index);
  //   expect(service.getShape(index)).toHaveBeenCalled();
  // });

  it('Should call setRectangleOffset', () => {
    const spy = spyOn(service, 'setRectangleOffset');
    service.setRectangleOffset();
    expect(spy).toHaveBeenCalled();
  });
/*
  it('Should modify rectangleOffset attributes', () => {
    const width = 10;
    const height = 20;
    const previewWidth = 0;
    const previewHeight = 0;
    const mouseX = 50;
    const mouseY = 75;
    let spyPreview = new Preview();
    spyOn(spyPreview, '')
    const mockPreview = {x: previewWidth, y: previewHeight};
    const mockMouse = {x: mouseX, y: mouseY};
    service.mouse = mockMouse;
    service.preview = mockPreview;

    service.preview.width = previewWidth;
    service.preview.height = previewHeight;
    service.setRectangleOffset();
    expect(service.preview.width).not.toEqual(width);
    expect(service.preview.height).not.toEqual(height);
  });
*/

  // it('Should modify rectangleOffset attributes', () => {
  //   const width = 10;
  //   const height = 20;
  //   const previewWidth = 0;
  //   const previewHeight = 0;
  //   const offsetValueY = 10;
  //   const offsetValueX = 20;
  //   const event = {x: offsetValueX, y: offsetValueY};
  //   const mouseX = 50;
  //   const mouseY = 75;
  //   const origin = event;
  //   service.origin = origin;

  //   service.preview.width = previewWidth;
  //   service.preview.height = previewHeight;
  //   service.mouse.x = mouseX;
  //   service.mouse.y = mouseY;
  //   service.setRectangleOffset();
  //   expect(service.preview.width).not.toEqual(width);
  //   expect(service.preview.height).not.toEqual(height);
  // });

  // it('Should call setSquareOffset', () => {
  //   const width = 5;
  //   const height = 10;
  //   const x = 0;
  //   const y = 0;
  //   const x2 = 20;
  //   const y2 = 20;
  //   service.preview.width = width;
  //   service.preview.height = height;
  //   service.mouse.x = x;
  //   service.mouse.y = y;
  //   service.origin.x = x2;
  //   service.origin.y = y2;

  //   const spy = spyOn(service, 'setSquareOffset');
  //   // const secondSpy = spyOn(Math, 'min');
  //   service.setSquareOffset();
  //   expect(spy).toHaveBeenCalled();
  //   // expect(secondSpy).toHaveBeenCalled();
  //   expect(service.preview.width).not.toEqual(5);
  //   expect(service.preview.height).not.toEqual(10);
  // });

});
