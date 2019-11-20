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
    describe('Empty DB', () => {
      it('should get nothing', (done) => {
        request(app).get('/api/foods')
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(0);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe('One item in DB', () => {
      it('One item in DB, should get one food', (done) => {
        request(app).post('/api/foods')
          .send({ name: 'chicken' })
          .then((res) => {
            request(app).get('/api/foods')
              .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(1);
                done();
              })
              .catch((err) => done(err));
          })
          .catch((err) => done(err));
      });
    });
  });

  describe('POST /', () => {
    describe('One item in database', () => {
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

    describe('Food with no name', () => {
      it('should return 500 and errors in body', (done) => {  
        request(app).post('/api/foods')
          .send({ })
          .then((res) => {
            expect(res.status).to.equal(500);
            expect(res.body.error).to.not.be.empty;
            done();
          }).catch((err) => done(err));
      });
    });

    describe('Food with invalid macronutrients', () => {
      it('should return 500 and errors in body', (done) => {  
        request(app).post('/api/foods')
          .send({ name: 'A valid name', protein: 'wat' })
          .then((res) => {
            expect(res.status).to.equal(500);
            expect(res.body.error).to.not.be.empty;
            done();
          }).catch((err) => done(err));
      });
    });

    describe('Food with invalid everything', () => {
      it('should return 500 and errors in body', (done) => {  
        request(app).post('/api/foods')
          .send({ name: '', calories: 'winter', protein: ['is'], carbohydrates: {'co':'min'}, fat: 'g' })
          .then((res) => {
            expect(res.status).to.equal(500);
            expect(res.body.error).to.not.be.empty;
            done();
          }).catch((err) => done(err));
      });
    });
  });

  describe('DELETE /:id', () => {
    describe('Delete valid id', () => {
      it('should delete the correct food item', (done) => {
        request(app).get('/api/foods')
          .then((res) => {
            global.to_be_deleted_id = res.body[0]._id;
            request(app).delete(`/api/foods/${global.to_be_deleted_id}`)
              .then((res) => {
                expect(res.body.success).to.be.true;

                request(app).get('/api/foods')
                  .then((res) => {
                    const body = res.body;
                    expect(body.length).to.equal(1);
                    expect(body[0].id).to.not.equal(global.to_be_deleted_id);
                    done();
                  }).catch((err) => done(err));
              }).catch((err) => done(err));
          }).catch((err) => done(err));
      });
    });

    describe('Delete invalid id', () => {
      it('should return 500 and errors in body', (done) => {  
        request(app).delete('/api/foods/anInvalidId')
          .then((res) => {
            expect(res.status).to.equal(500);
            expect(res.body.error).to.not.be.empty;
            done();
          }).catch((err) => done(err));
      });
    });
  });
  
});
 