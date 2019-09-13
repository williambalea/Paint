import { Shape } from './shape'

export class Rectangle extends Shape {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public fill: string;
    public stroke: string;
    public strokeWidth: number;

    public constructor() {
        super();
    };
}