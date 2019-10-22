import * as Chai from 'chai';
import 'mocha';
import 'reflect-metadata';
import { SVGJSON } from '../../../common/communication/SVGJSON';
import { DatabaseService } from '../services/database.service';

describe('databaseService tests', () => {
    let service: DatabaseService;
    let dataTable: SVGJSON[];
    let mockData: SVGJSON;
    const expect = Chai.expect;

    beforeEach(() => {
        service = new DatabaseService();
    });

    it('should be an object', () => {
        expect(service).to.be.an('object');
    });

    it('should return an array of type SVGJSON', () => {
        dataTable = service.getTable();
        expect(dataTable).exist;
    });

    it('should add SVGJSON data to data array', () => {
        mockData = {
            name : 'nameMock',
            tags : ['tagMock'],
            thumbnail : 'thumbnailMock',
            html : 'htmlMock',
            color : 'colorMock',
        };
        service.addToTable(mockData);
        expect(service.svgTable[0]).to.equal(mockData);
    });

});
