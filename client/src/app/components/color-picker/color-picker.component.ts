import { Component } from '@angular/core';
import { ColorInputControl } from '../../../Classes/ColorInputControl';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent {

  hue: string;
  color: string;
  colorHex: string;
  colorInputControl: ColorInputControl = new ColorInputControl();

  constructor() {
    this.color = 'rgba(255,255,255,255)';
    this.colorHex = 'FFFFFFFF';
  }

  onEnter(value: string): void {
    if (this.colorInputControl.colorAccepted(value)) {
      this.colorHex = value;
      this.syncValue();
    }
  }

  syncValue(): void  {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorHex);
    const value: {r: number, g: number , b: number, a: number} | null = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: parseInt(result[4], 16),
    } : null;
    if ( value != null ) {
      this.color = 'rgba(' + value.r.toString() + ',' + value.g.toString() + ',' + value.b.toString() + ',' + value.a.toString() + ')';
    }
    console.dir(this.color);
  }
}
