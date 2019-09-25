import { BRUSH, TOOL } from '../../../../../../common/constants';
import { Pen } from './pen';

export class Brush extends Pen {
    brushType: BRUSH;

    constructor(type: TOOL, path: string, stroke: string, strokeWidth: number, brushType: BRUSH) {
        super(type, path, stroke, strokeWidth);
        this.brushType = brushType;
    }

    changePrimaryColor(color: string) {
        this.stroke = color;
    }
    changeSecondaryColor(color: string) {
        return;
    }
}
