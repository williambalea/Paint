import { tool } from '../../../../../../common/constants';
import { Shape } from './shape';

export class Pencil extends Shape {
    path: string;
    stroke: string;
    strokeWidth: number;

    constructor(type: tool, path: string, stroke: string, strokeWidth: number) {
        super(type);
        this.path = path;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }

    changePrimaryColor(color: string) {}
    changeSecondaryColor(color: string) {}
}
