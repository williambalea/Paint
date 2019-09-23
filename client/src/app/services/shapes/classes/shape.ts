import { tool } from '../../../../../../common/constants';

export abstract class Shape {
    type: tool;

    constructor(type: tool) {
        this.type = type;
    }

    abstract changePrimaryColor(color: string): void;

    abstract changeSecondaryColor(color: string): void;

}
