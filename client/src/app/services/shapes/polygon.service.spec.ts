import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NB, OUTLINE_TYPE } from 'src/constants';
import { ColorService } from '../color/color.service';
import { InputService } from '../input.service';
import { PolygonService } from './polygon.service';

describe('PolygonService', () => {
  let service: PolygonService;
  let colorService: ColorService;
  let inputService: InputService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PolygonService,
        ColorService,
        InputService,
        Renderer2,
      ],
    }).compileComponents();
    service = TestBed.get(PolygonService);
    colorService = TestBed.get(ColorService);
    inputService = TestBed.get(InputService);
    renderer = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should allow for multitude types of polygon drawing', () => {
    const borderedSpy = spyOn(service, 'assignBorderedPolygon').and.callThrough();
    const filledSpy = spyOn(service, 'assignFilledPolygon').and.callThrough();
    const borderedFilledSpy = spyOn(service, 'assignBorderedAndFilledPolygon').and.callThrough();

    service.polygonType = OUTLINE_TYPE.bordered;
    service.assignPolygonType();
    expect(borderedSpy).toHaveBeenCalled();

    service.polygonType = OUTLINE_TYPE.filled;
    service.assignPolygonType();
    expect(filledSpy).toHaveBeenCalled();

    service.polygonType = OUTLINE_TYPE.borderedAndFilled;
    service.assignPolygonType();
    expect(borderedFilledSpy).toHaveBeenCalled();
  });
  it('should change primary color', () => {
    service.fill = 'fillColor';
    service.changePrimaryColor(service.fill);
    expect(service.fill).toEqual('fillColor');
  });
  it('should change secondary color', () => {
    service.stroke = 'strokeColor';
    service.changeSecondaryColor(service.stroke);
    expect(service.stroke).toEqual('strokeColor');
  });
  it('should set polygon type', () => {
    const removeColorSpy = spyOn(service, 'removeColor').and.callThrough();
    service.fillEnable = false;
    service.strokeEnable = false;
    service.setPolygonType();
    expect(removeColorSpy).toHaveBeenCalled();
    expect(removeColorSpy).toHaveBeenCalled();
    // test for vars assignments
  });
  it('should remove color', () => {
    // add test
  });
  it('should assign accordingly to bordered and filled polygon', () => {
    service.assignBorderedAndFilledPolygon();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(true);
  });
  it('should assign accordingly to filled polygon', () => {
    service.assignFilledPolygon();
    expect(service.strokeEnable).toEqual(false);
    expect(service.fillEnable).toEqual(true);
  });
  it('should assign accordingly to bordered polygon', () => {
    service.assignBorderedPolygon();
    expect(service.strokeEnable).toEqual(true);
    expect(service.fillEnable).toEqual(false);
  });
  it('should set origin', () => {
    const getMouseSpy = spyOn(inputService, 'getMouse').and.callThrough();
    service.setOrigin();
    expect(getMouseSpy).toHaveBeenCalled();
    expect(service.origin.x).toEqual(inputService.getMouse().x);
    expect(service.origin.y).toEqual(inputService.getMouse().y);
  });
  it('should draw and call child functions', () => {
    const setAttributeSpy = spyOn(renderer, 'setAttribute').and.callThrough();
    const setStyleSpy = spyOn(renderer, 'setStyle').and.callThrough();
    service.draw();
    expect(setAttributeSpy).toHaveBeenCalled();
    expect(setStyleSpy).toHaveBeenCalled();
    expect(service.initialPoint).toEqual({x: NB.Zero, y: NB.Zero});
  });
  it('should call child functions upon clicking mouse', () => {
    const getFillColorSpy = spyOn(colorService, 'getFillColor').and.callThrough();
    const getStrokeColorSpy = spyOn(colorService, 'getStrokeColor').and.callThrough();
    const setOriginSpy = spyOn(service, 'setOrigin').and.callThrough();
    const setPolygonTypeSpy = spyOn(service, 'setPolygonType').and.callThrough();
    const createElementSpy = spyOn(renderer, 'createElement').and.callThrough();

    service.onMouseDown();
    expect(getFillColorSpy).toHaveBeenCalled();
    expect(getStrokeColorSpy).toHaveBeenCalled();
    expect(setOriginSpy).toHaveBeenCalled();
    expect(setPolygonTypeSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalled();
    // test pour valeur de service.polygon

  });
  // it('should call child functions upon moving mouse', () => {
  //   const generateVerticesSpy = spyOn(service, 'generateVertices').and.callThrough();

  // });
});
