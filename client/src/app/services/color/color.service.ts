import { Injectable } from '@angular/core';
import { Queue } from '../../../Classes/Queue';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  private fill: string;
  private stroke: string;
  private makingColorChanges: boolean;
  private lastTenColors: Queue<string> = new Queue();

  constructor() {
    this.stroke = 'rgba(255, 255, 255, 1)';
    this.makingColorChanges = false;
  }

  addColorsToLastUsed(primaryColor: string, secondaryColor: string): void {
    this.lastTenColors.push(primaryColor);
    this.lastTenColors.push(secondaryColor);
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
}
