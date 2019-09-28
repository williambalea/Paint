import { ShapesService } from './shapes.service';

describe('ShapesService', () => {
  const shapeService: ShapesService = new ShapesService();
  let count = 0;

  it('Should draw Rectangle', () => {
    count++;
    shapeService.drawRectangle();
    expect(shapeService.getShapes().length).toEqual(count);
  });

  it('Should draw brush', () => {
    count++;
    shapeService.drawBrush();
    expect(shapeService.getShapes().length).toEqual(count);
  });

  it('Should draw Pen', () => {
    count++;
    shapeService.drawPen();
    expect(shapeService.getShapes().length).toEqual(count);
  });
});
