const request = require('supertest');
const { expect } = require('chai');
const yup = require('yup');
const app = require('./../app');

const TOKEN_VALIDATION_SCHEMA = yup.object({
  token: yup
    .string()
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_-]+\.[A-Za-z0-9!@#$%^&*()_-]+\.[A-Za-z0-9!@#$%^&*()_-]+$/
      // /^\w+\.\w+\.\w+$/
    )
    .required(),
});

const userCredentials = { email: 'creative@gmail.com', password: '123456' };

describe('Testing app', () => {
  describe('Testing public endpoints', () => {
    describe('GET /offers', () => {
      it('response should be [] when GET /offers', done => {
        request(app)
          .get('/offers')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            done();
          })
          .catch(err => done(err));
      });
    });

    describe('POST /login', () => {
      it('response should be 200 {token: "s5dfs.sfds5f.sdfs5df"} when credentials is correct', done => {
        request(app)
          .post('/login')
          .send(userCredentials)
          .expect(200)
          .then(res => {
            expect(TOKEN_VALIDATION_SCHEMA.isValidSync(res.body)).to.be.true;
            done();
          })
          .catch(err => done(err));
      });

      it('response should be 404 "user with this data didn`t exist" when user email isn`t correct', done => {
        request(app)
          .post('/login')
          .send({ email: 'ddfdsf@fddsf.com', password: '123456sdfdsf' })
          .expect(404)
          .expect('user with this data didn`t exist')
          .end(done);
      });

      it('response should be 404 "Wrong password" when password isn`t correct', done => {
        request(app)
          .post('/login')
          .send({ email: 'creative@gmail.com', password: '123456sfjsfsdf' })
          .expect(404)
          .expect('Wrong password')
          .end(done);
      });
    });
  });
});
