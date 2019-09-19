import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  private fill: string;
  private stroke: string;
  lastTenColors: string[10];

  constructor() {
    this.stroke = 'rgba(255, 255, 255, 1)';
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
}
