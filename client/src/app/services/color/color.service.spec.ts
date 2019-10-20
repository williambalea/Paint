import { ColorService } from './color.service';

const colorService: ColorService = new ColorService();
describe('ColorService', () => {
  it('Should be created', () => {
    expect(colorService).toBeDefined();
  });

  it('should get backround color', () => {
    const result = colorService.getBackgroundColor();
    expect(result).toBeDefined();
  });

  it('should set backround color', () => {
    colorService.setBackgroundColor('red');
    const result = colorService.getBackgroundColor();
    expect(result).toEqual('red');
  });

  it('should get Background Button', () => {
    const result = colorService.getShowBackgroundButton();
    expect(result).toBeDefined();
  });

  it('should set Background Button', () => {
    colorService.setShowBackgroundButton(true);
    const result = colorService.getShowBackgroundButton();
    expect(result).toEqual(true);
  });

  it('Should manage last ten used colors correctly', () => {
    colorService.addColorsToLastUsed('rgba(240, 240, 240, 1)', 'rbga(80, 80, 80, 1)');
    expect(colorService.verifyIfColorExistsInLastTen('rgba(240, 240, 240, 1)')).toBeTruthy();
    expect(colorService.verifyIfColorExistsInLastTen('rbga(80, 80, 80, 1)')).toBeTruthy();
  });

  it('should get Used primary', () => {
    const result = colorService.getUsingPrimary();
    expect(result).toBeDefined();
  });

  it('should set Used primary', () => {
    colorService.setUsingPrimary(true);
    const result = colorService.getUsingPrimary();
    expect(result).toEqual(true);
  });

  it('should make the color changes', () => {
    const result = colorService.getMakingColorChanges();
    expect(result).toBeDefined();
  });

  it('should set the color changes', () => {
    colorService.setMakingColorChanges(true);
    const result = colorService.getMakingColorChanges();
    expect(result).toEqual(true);
  });

  it('should get the item from the last ten colors', () => {
    const result = colorService.getItemFromLastTenColors(1);
    expect(result).toBeDefined();
  });

  it('should get fill color', () => {
    const result = colorService.getFillColor();
    expect(result).toBeDefined();
  });

  it('should set fill color', () => {
    colorService.setFillColor('red');
    const result = colorService.getFillColor();
    expect(result).toEqual('red');
  });

  it('should get stroke color', () => {
    const result = colorService.getStrokeColor();
    expect(result).toBeDefined();
  });

  it('should set stroke color', () => {
    colorService.setStrokeColor('red');
    const result = colorService.getStrokeColor();
    expect(result).toEqual('red');
  });

  it('Should set and get ShowInAttribute bar correctlt', () => {
    colorService.setShowInAttributeBar(false);
    expect(colorService.getShowInAttributeBar()).toBeFalsy();
  });
});
