/*import { ColorService } from 'src/app/services/color/color.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

describe('ColorPickerComponent', () => {
  const colorService: ColorService = new ColorService();
  const colorPickerComponent: ColorPickerComponent = new ColorPickerComponent(colorService);

  it('It should set primary correctly', () => {
    colorPickerComponent.setPrimary();
    expect(colorService.getMakingColorChanges()).toBeTruthy();
  });

  it('It should set secondary correctly', () => {
    colorPickerComponent.setSecondary();
    expect(colorService.getMakingColorChanges()).toBeTruthy();
  });

  it('Should send color correctly', () => {
    colorPickerComponent.setPrimary();
    colorPickerComponent.setColor('rgba(240, 240, 240, 1)');
    colorPickerComponent.sendColor();
    expect(colorService.getFillColor()).toEqual('rgba(240, 240, 240, 1)');
  });

  it('Should process Hex input correctly', () => {
    colorPickerComponent.onEnterHex('F385A5');
    expect(colorPickerComponent.getColor().indexOf('rgba(243,133,165,') !== -1).toBeTruthy();
  });

  it('Should swap colors correctly', () => {
    const primary: string = colorService.getFillColor();
    const secondary: string = colorService.getStrokeColor();
    colorPickerComponent.swapColors();
    expect(colorService.getFillColor()).toEqual(secondary);
    expect(colorService.getStrokeColor()).toEqual(primary);
  });

  it('Should process transparency correctly', () => {
    colorPickerComponent.onEnterSlider(255);
    expect(colorPickerComponent.getTransparency()).toEqual(255);
    expect(colorPickerComponent.getTransparencyString()).toEqual('1.00');
  });

  it('Should call sendColor from sendColorWrapper (ie change oldPointedColor)', () => {
    colorPickerComponent.sendColorWrapper();
    expect(colorPickerComponent.getOldPointedColor()).toEqual('rgba(255,255,255,1)');
  });

  it('Should update Hex value correctly', () => {
    colorPickerComponent.setColor('rbga(137, 158, 142, 1)');
    colorPickerComponent.updateHexValue();
    expect(colorPickerComponent.getHexValue()).toEqual('899E8E');
  });

});*/
