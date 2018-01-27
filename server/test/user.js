// npm packages
import request from 'supertest';
// import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';
// import {auth as authConfig} from '../config';

export default (test) => {
  test('GET /api/user/:id', (t) => {
    request(app)
      .get(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('user');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('GET /api/user/me', (t) => {
    request(app)
      .get('/api/user/me')
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('user');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('GET /api/user/:id with non-existent id', (t) => {
    request(app)
      .get('/api/user/1234')
      .set('x-access-token', app.get('token'))
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'User does not exist'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Get correct error');
        t.end();
      });
  });
  
  test('POST /api/user/:id - should only allow changes on own profile', (t) => {
    request(app)
      .post('/api/user/1234')
      .set('x-access-token', app.get('token'))
      .send({login: 'test123'})
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Not enough permissions to change other user profile!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Get correct error');
        t.end();
      });
  });
  
  test('POST /api/user/:id - update with new login', (t) => {
    request(app)
      .post(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .send({login: 'test123'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('user'),
          login: 'test123',
        };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve new user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

};
