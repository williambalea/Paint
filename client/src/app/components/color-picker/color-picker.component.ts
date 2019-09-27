import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { ColorInputControl } from '../../../Classes/ColorInputControl';
import { NB } from '../../../constants';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  private hue: string;
  private color: string;
  private oldPointedColor: string;
  private transparency: number;
  private colorHex: string;
  private transparencyString: string;
  private colorInputControl: ColorInputControl;

  ngOnInit(): void {
    this.sendColorWrapper();
  }

  constructor(private colorService: ColorService) {
    this.hue = '';
    this.color = 'rgba(0,0,0,1)';
    this.oldPointedColor = 'rgba(255,255,255,1)';
    this.transparency = NB.TwoHundredFiftyFive;
    this.colorHex = 'FFFFFF';
    this.transparencyString = '1';
    this.colorInputControl = new ColorInputControl();
  }

  getHue(): string {
    return this.hue;
  }

  setOldPointedColor(color: string): void {
    this.oldPointedColor = color;
  }

  getOldPointedColor(): string {
    return this.oldPointedColor;
  }

  getTransparencyString(): string {
    return this.transparencyString;
  }

  getTransparency(): number {
    return this.transparency;
  }

  getColor(): string {
    return this.color;
  }

  setColor(newColor: string): void {
    this.color = newColor;
  }

  setPrimary(): void {
    this.colorService.setMakingColorChanges(true);
    this.colorService.setUsingPrimary(true);
  }

  setSecondary(): void {
    this.colorService.setMakingColorChanges(true);
    this.colorService.setUsingPrimary(false);
  }

  sendColor(): void {
    this.colorService.getUsingPrimary() ? this.colorService.setFillColor(this.color) : this.colorService.setStrokeColor(this.color);
  }

  sendColorWrapper(): void {
    setInterval(() => {
      if (this.oldPointedColor !== this.color) {
        this.sendColor();
        this.updateHexValue();
        this.oldPointedColor = this.color;
      }
    }, NB.TwoHundredFifty);
  }

  updateHexValue(): void {
    let temp: string = this.color;
    temp = temp.substring(5, temp.length);
    temp = temp.substring(0, temp.length - 1);
    const rgbValues: string[] = temp.split(',');
    const tempHex: string = Number(rgbValues[0]).toString(16).toUpperCase() +
                            Number(rgbValues[1]).toString(16).toUpperCase() +
                            Number(rgbValues[2]).toString(16).toUpperCase();
    this.colorHex = tempHex;
  }

  onEnterHex(value: string): void {
    if (this.colorInputControl.colorAccepted(value)) {
      this.colorHex = value;
      this.syncValue();
      this.sendColor();
    }
  }

  getHexValue(): string {
    return this.colorHex;
  }

  setColorFromLastTen(index: number): void {
    this.color = this.colorService.getItemFromLastTenColors(index);
  }

  changeBackgroundColor(): void {
    this.colorService.changeBackgroundColor();
  }

  onEnterSlider(value: number): void {
    this.transparency = value;
    this.transparencyString = (this.transparency / NB.TwoHundredFiftyFive).toFixed(NB.Two).toString();
    this.color = this.color.substr(NB.Five , this.color.length);
    this.color = this.color.substr(NB.Zero , this.color.length - NB.One);
    const rgb: string[] = this.color.split(',');
    this.color = 'rgba(' + rgb[NB.Zero] + ',' + rgb[NB.One] + ',' + rgb[NB.Two] + ',' + this.transparencyString + ')';
  }

  syncValue(): void  {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorHex);
    const value: { r: number, g: number , b: number } | null = result ? {
      r: parseInt(result[NB.One], NB.Sixteen),
      g: parseInt(result[NB.Two], NB.Sixteen),
      b: parseInt(result[NB.Three], NB.Sixteen),
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
