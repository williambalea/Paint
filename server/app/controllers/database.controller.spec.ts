import 'reflect-metadata';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { SVGJSON } from '../../../common/communication/SVGJSON';
import { expect } from 'chai';

describe('databaseController tests', () => () => {
  let assert = require('assert'),
  http = require('http');
  chai.use(chaiHttp);

  it('should be able te retrieve data', () => (done: any) => {
      http.get('http://localhost:3000/database/svgTable',
      () => (res: { on: { (arg0: string, arg1: (chunk: any) => void): void; (arg0: string, arg1: () => void): void; }; }) => {
        let data: any;
        res.on('data', () => (dataFromDatabase: string) => {
          data = dataFromDatabase;
        });
        res.on('end',  () => () => {
          assert.equal('[]', data);
          done();
        });
      });
    });

  it('it should POST data in SVGJSON format', (done: any) => {
    let data: SVGJSON = {name : 'test', tags : ['test'], thumbnail : 'test', html : 'test', color : 'test'};
    chai.request('http://localhost:3000/database')
    .post('/postToTable')
    .send(data)
    .end(() => (err: any, res: any) => {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    done();

  });
});

});
