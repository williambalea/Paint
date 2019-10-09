import { Injectable } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ShapesService } from '../shapes/shapes.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  constructor(shapesService: ShapesService) {
    
  }
}
