import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { ColorInputControl } from '../../../Classes/ColorInputControl';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent implements OnInit {

  hue: string;
  test: HTMLElement;
  color: string;
  oldPointedColor: string;
  colorHex: string;
  usingPrimary: boolean;
  transparencyString: string;
  transparency: number;
  showBar: boolean;
  colorInputControl: ColorInputControl = new ColorInputControl();

  ngOnInit(): void {
    this.sendColorWrapper();
  }

  constructor(private colorService: ColorService) {
    this.color = 'rgba(255,255,255,1)';
    this.oldPointedColor = 'rgba(0,0,0,1)';
    this.transparency = 255;
    this.colorHex = 'FFFFFF';
    this.transparencyString = '1';
    this.usingPrimary = true;
    this.showBar = false;
    this.test = document.getElementById('colorParams') as HTMLElement;
  }

  setPrimary(): void {
    this.colorService.setMakingColorChanges(true);
    this.usingPrimary = true;
  }

  setSecondary(): void {
    this.colorService.setMakingColorChanges(true);
    this.usingPrimary = false;
  }

  sendColor(usingPrimary: boolean): void {
    if (usingPrimary) {
      this.colorService.setFillColor(this.color);
    } else {
      this.colorService.setStrokeColor(this.color);
    }
  }

  sendColorWrapper(): void {
    setInterval(() => {
      if (this.oldPointedColor !== this.color) {
        this.sendColor(this.usingPrimary);
        this.oldPointedColor = this.color;
      }
    }, 250);
  }

  onEnterHex(value: string): void {
    if (this.colorInputControl.colorAccepted(value)) {
      this.colorHex = value;
      this.syncValue();
      this.sendColor(this.usingPrimary);
    }
  }

  setColorFromLastTen(index: number): void {
    this.color = this.colorService.getItemFromLastTenColors(index);
  }

  changeBackgroundColor(): void {
    const elem: HTMLElement = document.getElementById('canvas') as HTMLElement;
    if (this.usingPrimary) {
      elem.style.background = this.colorService.getFillColor();
    } else {
      elem.style.background = this.colorService.getStrokeColor();
    }
  }

  onEnterSlider(value: number): void {
    this.transparency = value;
    this.transparencyString = (this.transparency / 255).toFixed(2).toString();
    this.color = this.color.substr(5 , this.color.length);
    this.color = this.color.substr(0 , this.color.length - 1);
    const rgb: string[] = this.color.split(',');
    this.color = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.transparencyString + ')';
  }

  syncValue(): void  {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorHex);
    const value: { r: number, g: number , b: number } | null = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
    if ( value != null ) {
      this.color = 'rgba(' + value.r.toString() +
                       ',' + value.g.toString() +
                       ',' + value.b.toString() +
                       ',' + this.transparencyString + ')';
    }
  }

  swapColors(): void {
    this.colorService.swapColors();
  }
}
