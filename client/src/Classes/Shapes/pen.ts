import { TOOL } from '../../constants';
import { Shape } from './shape';

export class Pen extends Shape {
    path: string;
    stroke: string;
    strokeWidth: number;

    constructor(type: TOOL, path: string, stroke: string, strokeWidth: number) {
        super(type);
        this.path = path;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }

    changePrimaryColor(color: string): void {
        this.stroke = color;
    }
}
