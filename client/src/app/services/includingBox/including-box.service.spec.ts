import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectorService } from '../selector/selector.service';
import { IncludingBoxService } from './including-box.service';

class RendererMock {
  createElement(): void {return; }
  setStyle(): void {return; }
  setAttribute(): void {return; }
  appendChild(): void {return; }
}
// tslint:disable-next-line: max-classes-per-file
class SelectorServiceServiceMock {
  selectedShapes: SVGGraphicsElement[] = [];
}

describe('IncludingBoxService', () => {
  let service: IncludingBoxService;
  let renderer: Renderer2;
  // let selectorService: SelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Renderer2,
        SelectorService,
        IncludingBoxService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: SelectorService, useClass: SelectorServiceServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(IncludingBoxService);
    renderer = TestBed.get(Renderer2);
    // selectorService = TestBed.get(SelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shout reset attributes', () => {
    service.boxUpperLeft = { x: 1, y: 1 };
    service.width = 1;
    service.height = 1;
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    service.clear();
    expect(service.boxUpperLeft.x).toEqual(0);
    expect(service.boxUpperLeft.y).toEqual(0);
    expect(service.width).toEqual(0);
    expect(service.height).toEqual(0);
    expect(spyOnCreateElement).toHaveBeenCalled();
  });

  it('should calculate size', () => {
    service.boxUpperLeft.x = 1;
    service.boxUpperLeft.y = 1;
    const finalPoint: Point = {x: 3, y: 2};
    service.calculateSize(finalPoint);
    expect(service.width).toEqual(2);
    expect(service.height).toEqual(1);
  });

  it('should calculate final point if bottomRight.x > finalPoint.x', () => {
    const bottomRight: Point = {x: 5, y: 6};
    const finalPoint: Point = {x: 3, y: 2};
    service.calculateFinalPoint(bottomRight, finalPoint);
    expect(bottomRight.x).toEqual(5);
    expect(finalPoint.y).toEqual(6);
  });

  it('should calculate', () => {
    const bottomRight: Point = {x: 0, y: 0};
    const shapeBoundary = {x: 1, y: 1, width: 1, height: 1} as SVGRect;
    service.calculateBottomRight(bottomRight, shapeBoundary);
    expect(bottomRight.x).toEqual(2);
    expect(bottomRight.y).toEqual(2);
  });

  // it('should calculate box', () => {
  //   const rectangle = renderer.createElement('rect', 'svg');
  //   renderer.setAttribute(rectangle, 'x', '1');
  //   renderer.setAttribute(rectangle, 'y', '1');
  //   renderer.setAttribute(rectangle, 'width', '1');
  //   renderer.setAttribute(rectangle, 'height', '1');
  //   selectorService.selectedShapes.push(rectangle);
  //   const spyOnValidateNoStroke = spyOn(service, 'validateNoStroke');
  //   const spyOnCalculateInitialPoint = spyOn(service, 'calculateInitialPoint');
  //   const spyOnalculateBottomRight = spyOn(service, 'calculateBottomRight');
  //   const spyOnCalculateFinalPoint = spyOn(service, 'calculateFinalPoint');
  //   const spyOnCalculateSize = spyOn(service, 'calculateSize');
  //   const spyOnDraw = spyOn(service, 'draw');
  //   // const shapeBaoundary = spyOn(selectorService.selectedShapes[0], 'getBBox')
  //   //   .and.returnValue({x: 1, y: 1, width: 1, height: 1} as SVGRect);
  //   service.update();
  //   // expect(shapeBaoundary).toHaveBeenCalled();
  //   expect(spyOnValidateNoStroke).toHaveBeenCalled();
  //   expect(spyOnCalculateInitialPoint).toHaveBeenCalled();
  //   expect(spyOnalculateBottomRight).toHaveBeenCalled();
  //   expect(spyOnCalculateFinalPoint).toHaveBeenCalled();
  //   expect(spyOnCalculateSize).toHaveBeenCalled();
  //   expect(spyOnDraw).toHaveBeenCalled();
  // });

  it('should set style points', () => {
    const point: SVGGraphicsElement = renderer.createElement('circle', 'svg');
    const positions: Point[] = service.setControlPoints();
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    for (let i = 0; i < 8; i++) {
    service.setStylePoints(point, positions[i]); }
    expect(spyOnSetStyle).toHaveBeenCalledTimes(24);
  });

  it('should set attribute control points', () => {
    const point: SVGGraphicsElement = renderer.createElement('circle', 'svg');
    const positions: Point[] = service.setControlPoints();
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    for (let i = 0; i < 8; i++) {
    service.setAttributeControlPoints(point, positions[i]); }
    expect(spyOnSetAttribute).toHaveBeenCalledTimes(24);
  });

  it('it should append controlPoints', () => {
    const spyOnSetAttributeControlPoints = spyOn(service, 'setAttributeControlPoints');
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    const spyOnSetStylePoints = spyOn(service, 'setStylePoints');
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    service.appendControlPoints();
    expect(spyOnSetAttributeControlPoints).toHaveBeenCalledTimes(8);
    expect(spyOnSetAttribute).toHaveBeenCalledTimes(8);
    expect(spyOnSetStylePoints).toHaveBeenCalledTimes(8);
    expect(spyOnAppendChild).toHaveBeenCalledTimes(8);
  });

  it('should set style rectangle Box', () => {
    const rectangle: SVGGraphicsElement = renderer.createElement('rectangle', 'svg');
    const spyOnSetStyle = spyOn(renderer, 'setStyle');
    service.setStyleRectangleBox(rectangle);
    expect(spyOnSetStyle).toHaveBeenCalledTimes(3);
  });

  it('should set attribute rectangle Box', () => {
    const rectangle: SVGGraphicsElement = renderer.createElement('rectangle', 'svg');
    const spyOnSetAttribute = spyOn(renderer, 'setAttribute');
    service.setAttributeRectangleBox(rectangle);
    expect(spyOnSetAttribute).toHaveBeenCalledTimes(4);
  });

  it('it should append rectangle box', () => {
    service.width = 2;
    service.height = 2;
    const spyOnSetSetAttributeRectangleBox = spyOn(service, 'setAttributeRectangleBox');
    const spyOnSetStyleRectangleBox = spyOn(service, 'setStyleRectangleBox');
    const spyOnAppendChild = spyOn(renderer, 'appendChild');
    service.appendRectangleBox();
    expect(spyOnSetSetAttributeRectangleBox).toHaveBeenCalledTimes(1);
    expect(spyOnSetStyleRectangleBox).toHaveBeenCalledTimes(1);
    expect(spyOnAppendChild).toHaveBeenCalledTimes(1);
  });

  it('should draw', () => {
    const spyOnCreateElement = spyOn(renderer, 'createElement');
    const spyOnAppendRectangleBox = spyOn(service, 'appendRectangleBox');
    const spyOnAppendControlPoint = spyOn(service, 'appendControlPoints');
    service.draw();
    expect(spyOnCreateElement).toHaveBeenCalled();
    expect(spyOnAppendRectangleBox).toHaveBeenCalled();
    expect(spyOnAppendControlPoint).toHaveBeenCalled();
  });

  it('should calculate initial point', () => {
    service.boxUpperLeft.x = 2;
    service.boxUpperLeft.y = 2;
    const shapeBoundary = {x: 1, y: 1, width: 1, height: 1} as SVGRect;
    service.calculateInitialPoint(shapeBoundary);
    expect(service.boxUpperLeft.x).toEqual(1);
    expect(service.boxUpperLeft.y).toEqual(1);
  });

  it('should validate that there is no stroke', () => {
    const shapeBoundary = {x: 1, y: 1, width: 1, height: 1} as SVGRect;
    const value = {style: {strokeOpacity: 1, strokeWidth: 1}, tagName: 'rect'} ;
    service.validateNoStroke(value as unknown as SVGGraphicsElement, shapeBoundary);
    expect(shapeBoundary.x).toEqual(0.5);
    expect(shapeBoundary.y).toEqual(0.5);
    expect(shapeBoundary.width).toEqual(2);
    expect(shapeBoundary.height).toEqual(2);
    // const rectangle: SVGGraphicsElement = renderer.createElement('rectangle', 'svg');
  });

  it('should set control Points ', () => {
    const result = service.setControlPoints();
    expect(result).toBeDefined();
  });

});
