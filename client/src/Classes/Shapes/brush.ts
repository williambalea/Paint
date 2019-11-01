import { TOOL } from '../../constants';
import { Pencil } from './pencil';

export class Brush extends Pencil {
    filter: string;

    constructor(type: TOOL, path: string, stroke: string, strokeWidth: number, filter: string ) {
        super(type, path, stroke, strokeWidth);
        this.filter = filter;
    }

    changePrimaryColor(color: string): void {
        this.stroke = color;
    }
}
