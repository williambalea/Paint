import { ColorService } from './color.service';

const colorService: ColorService = new ColorService();

describe('ColorService', () => {
  it('Should initialise attributes correctly', () => {
    expect(colorService.getFillColor()).toEqual('rgba(255, 255, 255, 1)');
    expect(colorService.getStrokeColor()).toEqual('rgba(0, 0, 0, 1)');
    expect(colorService.getMakingColorChanges()).toBeFalsy();
  });

  it('Should add 2 colors to last ten used colors correctly', () => {
    colorService.addColorsToLastUsed('rgba(220, 220, 220, 1)', 'rgba(140, 140, 140, 1)');
    expect(colorService.getItemFromLastTenColors(0)).toEqual('rgba(220, 220, 220, 1)');
    expect(colorService.getItemFromLastTenColors(1)).toEqual('rgba(140, 140, 140, 1)');
  });

  it('Should swap colors correctly', () => {
    colorService.swapColors();
    expect(colorService.getFillColor()).toBe('rgba(0, 0, 0, 1)');
    expect(colorService.getStrokeColor()).toBe('rgba(255, 255, 255, 1)');
  });

  it('Should use setters correctly', () => {
    colorService.setFillColor('rgba(60, 60, 60, 1)');
    colorService.setStrokeColor('rgba(80, 80, 80, 1)');
    colorService.setMakingColorChanges(true);
    expect(colorService.getFillColor()).toBe('rgba(60, 60, 60, 1)');
    expect(colorService.getStrokeColor()).toBe('rgba(80, 80, 80, 1)');
    expect(colorService.getMakingColorChanges).toBeFalsy();
  });

});
