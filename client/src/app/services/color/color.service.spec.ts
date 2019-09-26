import { ColorService } from './color.service';

const colorService: ColorService = new ColorService();
describe('ColorService', () => {
  it('Should be created', () => {
    expect(colorService).toBeDefined();
  });

  it('Should manage last ten used colors correctly', () => {
    colorService.addColorsToLastUsed('rgba(240, 240, 240, 1)', 'rbga(80, 80, 80, 1)');
    expect(colorService.verifyIfColorExistsInLastTen('rgba(240, 240, 240, 1)')).toBeTruthy();
    expect(colorService.verifyIfColorExistsInLastTen('rbga(80, 80, 80, 1)')).toBeTruthy();
  });

  it('Should set and get ShowInAttribute bar correctlt', () => {
    colorService.setShowInAttributeBar(false);
    expect(colorService.getShowInAttributeBar()).toBeFalsy();
  });

  it('Should get correctly items from last 10 used colors array', () => {
    expect(colorService.getItemFromLastTenColors(0)).toBeDefined();
  });
});
