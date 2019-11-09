import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSliderModule } from '@angular/material';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorPickerComponent } from './color-picker.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';

@NgModule({
  declarations: [ColorPickerComponent, ColorPaletteComponent, ColorSliderComponent],
  exports: [ColorPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerModule { }
