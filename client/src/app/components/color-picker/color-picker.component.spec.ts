import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorService } from 'src/app/services/color/color.service';
import { ColorPickerComponent } from './color-picker.component';

const colorService: ColorService = new ColorService();
const colorPickerComponent: ColorPickerComponent = new ColorPickerComponent(colorService);

describe('ColorPickerComponent', () => {
  it('Should initialise attributes correctly', () => {
    expect(colorPickerComponent).toBe();
    expect(colorPickerComponent).toBe();
    expect(colorPickerComponent).toBe();
    expect(colorPickerComponent).toBe();
    expect(colorPickerComponent).toBe();
    expect(colorPickerComponent).toBe();
  });
});
