import {NextFunction, Request, Response, Router} from 'express';
import {inject, injectable} from 'inversify';
import { SVGJSON } from '../../../common/communication/SVGJSON';
import { DatabaseService } from '../services/database.service';
import Types from '../types';

@injectable()
export class DatabaseController {
    router: Router;

    constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) {
        this.configureRouter();

    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/svgTable',
            async (req: Request, res: Response, next: NextFunction) => {
                res.json(this.databaseService.getTable());

            });

        this.router.post('/postToTable',
            (req: Request, res: Response) => {
                const json: SVGJSON = req.body;
                res.json(this.databaseService.addToTable(json));
                
            },

        );
    }

}
