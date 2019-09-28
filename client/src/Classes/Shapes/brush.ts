import { TOOL } from '../../constants';
import { Pen } from './pen';

export class Brush extends Pen {
    filter: string;

    constructor(type: TOOL, path: string, stroke: string, strokeWidth: number, filter: string ) {
        super(type, path, stroke, strokeWidth);
        this.filter = filter;
    }

    changePrimaryColor(color: string) {
        this.stroke = color;
    }
}
