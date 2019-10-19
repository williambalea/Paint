import { injectable } from 'inversify';
import { SVGJSON } from '../../../common/communication/SVGJSON';
@injectable()
export class DatabaseService {
    svgTable: SVGJSON[];
    nameCheck: boolean;
    tagCheck: boolean;

    constructor() {
        this.svgTable = [];
        this.nameCheck = true;
        this.tagCheck = true;

    }

    getTable(): SVGJSON[] {
        return this.svgTable;
    }

    addToTable(value: SVGJSON): void {

        if (value.name === '') {
            this.nameCheck = false;
        }

        value.tags.forEach((tag) => {
            if (tag === '') {
                this.tagCheck = false;
            }
        });
        if (this.nameCheck && this.tagCheck) {
            this.svgTable.push(value);
        }

    }
}
