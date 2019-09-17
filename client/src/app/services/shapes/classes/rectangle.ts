import { Shape } from './shape';

export class Rectangle extends Shape {

    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;

    constructor(x: number,
                y: number,
                width: number,
                height: number,
                fill: string,
                stroke: string,
                strokeWidth: number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }
}
