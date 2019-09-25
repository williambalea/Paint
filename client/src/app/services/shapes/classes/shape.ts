import { TOOL } from '../../../../../../common/constants';

export abstract class Shape {
    type: TOOL;

    constructor(type: TOOL) {
        this.type = type;
    }

    abstract changePrimaryColor(color: string): void;

    abstract changeSecondaryColor(color: string): void;

}
