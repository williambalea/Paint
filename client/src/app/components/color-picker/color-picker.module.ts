import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorPickerComponent } from './color-picker.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ColorPickerComponent, ColorPaletteComponent, ColorSliderComponent],
  exports: [ColorPickerComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerModule {}
