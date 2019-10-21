import 'reflect-metadata';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { SVGJSON } from '../../../common/communication/SVGJSON';
import { expect } from 'chai';
   

describe('databaseController tests', function () {
  let assert = require('assert'),
  http = require('http');
  chai.use(chaiHttp);

    it('should be able te retrieve data', function (done) {
        http.get('http://localhost:3000/database/svgTable', function (res: { on: { (arg0: string, arg1: (chunk: any) => void): void; (arg0: string, arg1: () => void): void; }; }) {
          let data : any;
          res.on('data', function (dataFromDatabase: string) {
            data = dataFromDatabase;
          });
          res.on('end',  function () {
            assert.equal('[]', data);
            done();
          });
        });
      });  

      it('it should POST data in SVGJSON format', (done) => {
        let data : SVGJSON = {name : 'test', tags : ['test'], thumbnail : 'test', html : 'test', color : 'test'}
        chai.request('http://localhost:3000/database')
        .post('/postToTable')
        .send(data)
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();

  });
});

});