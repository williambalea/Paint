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

    addToTable(value: SVGJSON) : boolean[] {
        let response : boolean[] = [true,false]; 
        if(value.name === "" ) {
            response[0] = false;
        }
        value.tags.forEach((tag ) => {
            if(tag === "" || value.name === "") {
                response[0] = false;
            }
       })
       if (response[0]){ // for disabling button if en cours de sending
            this.svgTable.push(value);
            response[1] = true;
       }
        return (response);
    }
}
