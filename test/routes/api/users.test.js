process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const app = require('../../../app.js');
const conn = require('../../../db/index.js');
const User = require('../../../db/models/User.js');


// TODO Fix/Finish writing this test when you fix the test suite
describe('/api/users/', function () {
  before((done) => {
    conn.connect()
      .then(() => {
        // Create Mock User Model



        return done()
      }).catch((err) => done(err));
  });

  after(function (done) {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  // describe('GET /', () => {
  //   describe('Empty DB', () => {
  //     it('should get nothing', (done) => {
  //       request(app).get('/api/foods')
  //         .then((res) => {
  //           const body = res.body;
  //           expect(body.length).to.equal(0);
  //           done();
  //         })
  //         .catch((err) => done(err));
  //     });
  //   });

  //   describe('One item in DB', () => {
  //     it('One item in DB, should get one food', (done) => {
  //       request(app).post('/api/foods')
  //         .send({ name: 'chicken' })
  //         .then((res) => {
  //           request(app).get('/api/foods')
  //             .then((res) => {
  //               const body = res.body;
  //               expect(body.length).to.equal(1);
  //               done();
  //             })
  //             .catch((err) => done(err));
  //         })
  //         .catch((err) => done(err));
  //     });
  //   });
  // });

  describe('PUT /', () => {
    describe('Valid Macronutrient and Calories', () => {
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
              .catch((err) => done(err));
          })
          .catch((err) => done(err));
      });
    })
  });

});
