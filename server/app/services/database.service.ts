import { injectable } from 'inversify';
import { SVGJSON } from '../../../common/communication/SVGJSON';
@injectable()
export class DatabaseService {
   svgTable: SVGJSON[];

    constructor() {
        this.svgTable = [];
    }

     HelloWorld(): string {
        return 'Hello World';
    }

    getTable(): SVGJSON[] {
        return this.svgTable;
    }

    addToTable(value: SVGJSON) {
        this.svgTable.push(value);
    }
}
