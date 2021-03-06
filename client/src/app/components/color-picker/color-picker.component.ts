import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { ColorInputControl } from '../../../Classes/ColorInputControl';
import { COLORS, EMPTY_STRING, NB, STRING_NB } from '../../../constants';

@Component({
  selector: 'app-color-picker',
  styleUrls: ['./color-picker.component.scss'],
  templateUrl: './color-picker.component.html',
})

export class ColorPickerComponent implements OnInit {

  hue: string;
  color: string;
  transparency: number;
  colorHex: string;
  private oldPointedColor: string;
  private transparencyString: string;
  private colorInputControl: ColorInputControl;

  constructor(public colorService: ColorService) {
    this.hue = EMPTY_STRING;
    this.color = COLORS.blackRGBA;
    this.oldPointedColor = COLORS.whiteRGBA;
    this.transparency = NB.TwoHundredFiftyFive;
    this.colorHex = COLORS.whiteHEX;
    this.transparencyString = STRING_NB.One;
    this.colorInputControl = new ColorInputControl();
  }

  ngOnInit(): void {
    this.sendColorWrapper();
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
    let currentColor: string = this.color;
    currentColor = currentColor.substring(NB.Five, currentColor.length);
    currentColor = currentColor.substring(NB.Zero, currentColor.length - NB.One);
    const currentRgbValues: string[] = currentColor.split(',');
    this.colorHex = Number(currentRgbValues[NB.Zero]).toString(NB.Sixteen).toUpperCase() +
      Number(currentRgbValues[NB.One]).toString(NB.Sixteen).toUpperCase() +
      Number(currentRgbValues[NB.Two]).toString(NB.Sixteen).toUpperCase();
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

  setTransparency(value: number): void {
    this.transparency = value;
  }

  onEnterSlider(): void {
    this.transparencyString = (this.transparency / NB.TwoHundredFiftyFive).toFixed(NB.Two).toString();
    this.color = this.color.substr(NB.Five, this.color.length);
    this.color = this.color.substr(NB.Zero, this.color.length - NB.One);
    const rgb: string[] = this.color.split(',');
    this.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.transparencyString})`;
  }

  syncValue(): void {
    const colorArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorHex) as RegExpExecArray;
    const r: number = parseInt(colorArray[NB.One], NB.Sixteen);
    const g: number = parseInt(colorArray[NB.Two], NB.Sixteen);
    const b: number = parseInt(colorArray[NB.Three], NB.Sixteen);
    this.color = `rgba(${r.toString()}, ${g.toString()}, ${b.toString()}, ${this.transparencyString})`;
  }

  swapColors(): void {
    this.colorService.swapColors();
  }
}
