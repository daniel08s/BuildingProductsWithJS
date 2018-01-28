// npm packages
import request from 'supertest';
import moment from 'moment';
// import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';

export default (test) => {
  const sharedInput = {text: 'What is the question?', expirationDate: moment().add(1, 'days').toDate()};

  test('POST /api/question - Should not create a new question without text', (t) => {
    const input = {text: undefined, expirationDate: moment().add(1, 'days').toDate()};
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Text is mandatory!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question - Should not create a new question with malformed dates', (t) => {
    const input = {text: 'Am I a question?', expirationDate: 'not a date'};
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Date should have a valid ISO format'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });


  test('POST /api/question - Should create a new question ', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(sharedInput)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.text, sharedInput.text, 'Retrieve same question text');
        t.ok(moment(actualBody.expirationDate).isSame(sharedInput.expirationDate), 'Retrieve same question expiration date');
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.equal(actualBody.owner, app.get('user').id, 'Question owner matches user');
        t.end();
      });
  });

  test('POST /api/question - Should create another new question ', (t) => {
    const input = {text: 'What should this be?', expirationDate: moment().add(2, 'days')};
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.text, input.text, 'Retrieve same question text');
        t.ok(moment(actualBody.expirationDate).isSame(input.expirationDate), 'Retrieve same question expiration date');
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.equal(actualBody.owner, app.get('user').id, 'Question owner must match user');
        t.end();
      });
  });

  test('GET /api/question/:owner', (t) => {
    request(app)
      .get(`/api/question/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.error(err, 'No error');

        res.body.forEach((actualBody) => {
          t.equal(actualBody.owner, app.get('user').id, 'Question owner must match user');
          t.ok(moment(actualBody.expirationDate).isValid(), 'Expiration date must be valid');
          t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        });

        t.end();
      });
  });
};
