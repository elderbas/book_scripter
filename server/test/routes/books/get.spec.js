let expect = require('chai').expect;
let supertest = require('supertest');
// let mongoose = require('mongoose');

let baseUrl = `http://localhost:3000`
describe('/book', () => {
  describe('_get', () => {
    it('gets all book names', (done) => {
      supertest(baseUrl)
      .get('/api/book')
      .end((err, resp) => {
        console.log('yay');
      });
    });
  });
});