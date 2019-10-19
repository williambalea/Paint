import { TOOL } from '../../constants';

export abstract class Shape {
    type: TOOL;

    constructor(type: TOOL) {
        this.type = type;
    }

    abstract changePrimaryColor(color: string): void;

    changeSecondaryColor(color: string): void {
        return;
    }

}
