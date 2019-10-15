import { injectable } from 'inversify';

@injectable()
export class DatabaseService {
    svgTable: string[];

    constructor() {
        this.svgTable = [];

        this.svgTable.push('allo');
        console.log('databaseService');
    }

     HelloWorld(): string {
        return 'Hello World';
    }

    getTable(): string[] {
        console.log('databaseService');
        return this.svgTable;
    }

    addToTable(value: string) {
        console.log('databaseService', value);
        this.svgTable.push(value);
        
    }
}
