import { injectable } from 'inversify';

@injectable()
export class DatabaseService {
    svgTable: string[];

    constructor() {
        this.svgTable = [];

        this.svgTable.push('allo');
    }

     HelloWorld(): string {
        return 'Hello World';
    }

    getMongoDB(): string[] {
        return this.svgTable;
    }

    addMongoDB(value: string): void {
        this.svgTable.push(value);
    }
}
