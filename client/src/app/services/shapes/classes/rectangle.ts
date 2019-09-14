import { Shape } from './shape';

export class Rectangle extends Shape {

    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    constructor() {
        super();
    }
}
