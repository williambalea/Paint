import { Injectable } from '@angular/core';
import { ColorQueue } from '../../../Classes/ColorQueue';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  private fill: string;
  private stroke: string;
  private makingColorChanges: boolean;
  private showInAttributeBar: boolean;
  private usingPrimary: boolean;
  private lastTenColors: ColorQueue<string>;
  private showBackgroundButton: boolean;
  private backgroundColor: string;

  constructor() {
    this.fill = 'rgba(0, 0, 0, 1)';
    this.stroke = 'rgba(255, 255, 255, 1)';
    this.makingColorChanges = false;
    this.showInAttributeBar = true;
    this.usingPrimary = true;
    this.lastTenColors = new ColorQueue('rgba(255, 255, 255, 1)');
    this.showBackgroundButton = true;
    this.backgroundColor = 'rgba(255, 255, 255, 1)';
  }

  getBackgroundColor(): string {
    return this.backgroundColor;
  }

  setBackgroundColor(newColor: string): void {
    this.backgroundColor = newColor;
  }

  getShowBackgroundButton(): boolean {
    return this.showBackgroundButton;
  }

  setShowBackgroundButton(val: boolean): void {
    this.showBackgroundButton = val;
  }

  addColorsToLastUsed(primaryColor: string, secondaryColor ?: string): void {
    this.lastTenColors.push(primaryColor);
    if (secondaryColor) {
      this.lastTenColors.push(secondaryColor);
    }
  }

  getUsingPrimary(): boolean {
    return this.usingPrimary;
  }

  setUsingPrimary(val: boolean): void {
    this.usingPrimary = val;
  }

  verifyIfColorExistsInLastTen(color: string): boolean {
    return this.lastTenColors.store.indexOf(color) !== undefined;
  }

  getMakingColorChanges(): boolean {
    return this.makingColorChanges;
  }

  setMakingColorChanges(value: boolean): void {
    this.makingColorChanges = value;
  }

  getItemFromLastTenColors(index: number): string {
    return this.lastTenColors.get(index) as string;
  }

  getFillColor(): string {
    return this.fill;
  }

  setFillColor(fill: string): void {
    this.fill = fill;
  }

  getStrokeColor(): string {
    return this.stroke;
  }

  setStrokeColor(stroke: string): void {
    this.stroke = stroke;
  }

  swapColors(): void {
    const temp: string = this.fill;
    this.fill = this.stroke;
    this.stroke = temp;
  }

  setShowInAttributeBar(show: boolean): void {
    this.showInAttributeBar = show;
  }

  getShowInAttributeBar(): boolean {
    return this.showInAttributeBar;
  }

  changeBackgroundColor(): void {
    // const elem: HTMLElement = document.getElementById('canvas') as HTMLElement;
    this.backgroundColor = (this.usingPrimary) ? this.getFillColor() : this.getStrokeColor();
  }
}
