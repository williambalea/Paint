import { injectable } from 'inversify';
import { SVGJSON } from "../../../common/communication/SVGJSON";
import { svgTable } from "./data";
@injectable()
export class DatabaseService {
   svgTable: SVGJSON[];

    constructor() {
        this.svgTable = [];

       
        console.log('databaseService');
    }

     HelloWorld(): string {
        return 'Hello World';
    }

    getTable(): SVGJSON[] {
        console.log('databaseService');
        return this.svgTable;
    }

    addToTable(value: SVGJSON) {
        console.log('databaseService', value);
        this.svgTable.push(value);
        
    }
}
