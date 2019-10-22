import { Injectable } from '@angular/core';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class NoShapeService implements Shape {

  onMouseDown(): any {
    return;
  }

  onMouseMove(): void {
    return;
  }
  onMouseUp(): void {
    return;
  }

}
