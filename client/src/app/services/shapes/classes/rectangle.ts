import { TOOL } from '../../../../../../common/constants';
import { Shape } from './shape';

export class Rectangle extends Shape {

    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;

    constructor(type: TOOL,
                x: number,
                y: number,
                width: number,
                height: number,
                fill: string,
                stroke: string,
                strokeWidth: number) {
        super(type);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }

    changePrimaryColor(color: string): void {
        this.fill = color;
    }

    changeSecondaryColor(color: string): void {
        this.stroke = color;
    }
}
