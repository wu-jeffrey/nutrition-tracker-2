process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('/api/foods/', function() {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after(function (done) {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('GET /', () => {
    it('should get nothing', (done) => {
      request(app).get('/api/foods')
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(0);
          console.log('bang')
          done();
        })
        .catch((err) => done(err));
    });

    it('should get one food', (done) => {
      request(app).post('/api/foods')
        .send({ name: 'chicken' })
        .then((res) => {
          request(app).get('/api/foods')
            .then((res) => {
              const body = res.body;
              expect(body.length).to.equal(1);
              done();
            })
        })
        .catch((err) => done(err));
    });
  });

  describe('POST /', () => {
    it('should post one food', (done) => {
      request(app).post('/api/foods')
        .send({ name: 'chicken2' })
        .then((res) => {
          request(app).get('/api/foods')
            .then((res) => {
              const body = res.body;
              expect(body.length).to.equal(2);
              done();
            })
        })
        .catch((err) => done(err));
    });
  });




});
 