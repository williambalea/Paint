import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  private fill: string;
  stroke: string;
  lastTenColors: string[10];
  primaryColor: string;
  secondaryColor: string;

  getFillColor(): string {
    return this.fill;
  }

  setFillColor(fill: string): void {
    this.fill = fill;
  }

  changeBackgroundColor(color: string): void {  
  }

}
