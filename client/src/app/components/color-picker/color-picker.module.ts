import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorPickerComponent } from './color-picker.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [ColorPickerComponent, ColorPaletteComponent, ColorSliderComponent],
  exports: [ColorPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerModule {}
