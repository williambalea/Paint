import { ColorService } from 'src/app/services/color/color.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

const colorService: ColorService = new ColorService();
const colorPickerComponent: ColorPickerComponent = new ColorPickerComponent(colorService);
describe('ColorPickerComponent', () => {
  it('Should initialise attributes correctly', () => {
    expect(colorPickerComponent).toBeDefined();
    expect(colorPickerComponent.getColor()).toEqual('rgba(255,255,255,1)');
    expect(colorPickerComponent.getOldPointedColor()).toEqual('rgba(0,0,0,1)');
    expect(colorPickerComponent.getTransparency()).toEqual(255);
    expect(colorPickerComponent.getColorHex()).toEqual('FFFFFF');
    expect(colorPickerComponent.getTransparencyString()).toEqual('1');
    expect(colorPickerComponent.getUsingPrimary()).toEqual(true);
    expect(colorPickerComponent.getInputControl()).toBeDefined();
  });

  it('It should set primary correctly', () => {
    colorPickerComponent.setPrimary();
    expect(colorPickerComponent.getUsingPrimary()).toBeTruthy();
    expect(colorService.getMakingColorChanges()).toBeTruthy();
  });

  it('It should set secondary correctly', () => {
    colorPickerComponent.setSecondary();
    expect(colorPickerComponent.getUsingPrimary()).toBeFalsy();
    expect(colorService.getMakingColorChanges()).toBeTruthy();
  });

  it('Should send color correctly', () => {
    colorPickerComponent.setColor('rgba(240, 240, 240, 1)');
    colorPickerComponent.sendColor(true);
    expect(colorService.getFillColor()).toEqual('rgba(240, 240, 240, 1)');
    colorPickerComponent.sendColor(false);
    expect(colorService.getStrokeColor()).toEqual('rgba(240, 240, 240, 1)');
  });

  it('Should process Hex input correctly', () => {
    colorPickerComponent.onEnterHex('F385A5');
    expect(colorPickerComponent.getColor()).toEqual('rgba(243,133,165,1)');
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

  it('Should call sendColor from sendColorWrapper', () => {
    spyOn(colorPickerComponent, 'sendColor');
    colorPickerComponent.sendColorWrapper();
    expect(colorPickerComponent.sendColor).toHaveBeenCalled();
  });

});
