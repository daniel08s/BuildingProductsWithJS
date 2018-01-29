// npm packages
import request from 'supertest';
import moment from 'moment';
// import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';

export default (test) => {
  const sharedInput = {text: 'What is the question?', expirationDate: moment().add(1, 'days').toDate()};
  const sharedInputOther = {text: 'Are you reading this?', expirationDate: moment().add(2, 'days').toDate()};
  const updatedInput = {text: 'Do you like my new question?', expirationDate: moment().add(4, 'days').toDate()};

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


  test('POST /api/question - Should create a new question', (t) => {
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
        t.ok(
          moment(actualBody.expirationDate).isSame(sharedInput.expirationDate),
          'Retrieve same question expiration date'
        );
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.equal(actualBody.owner, app.get('user').id, 'Question owner matches user');

        app.set('question', actualBody);

        t.end();
      });
  });

  test('GET /api/question/:id - Should get created question ', (t) => {
    request(app)
      .get(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, app.get('question'), 'Retrieve same question');
        t.equal(actualBody.text, sharedInput.text, 'Retrieve same question text');
        t.ok(
          moment(actualBody.expirationDate).isSame(sharedInput.expirationDate),
          'Retrieve same question expiration date'
        );

        t.end();
      });
  });

  test('POST /api/question/:id - Should not update question without text', (t) => {
    request(app)
      .post('/api/question/{app.get(\'question\').id}')
      .set('x-access-token', app.get('token'))
      .send({text: ''})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;
        const expectedBody = {error: 'Text is mandatory!'};

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - Should not update with invalid date', (t) => {
    request(app)
      .post('/api/question/{app.get(\'question\').id}')
      .set('x-access-token', app.get('token'))
      .send({expirationDate: 'not a date'})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;
        const expectedBody = {error: 'Date should have a valid ISO format'};

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - Should not update non-existent question', (t) => {
    request(app)
      .post('/api/question/0123')
      .set('x-access-token', app.get('token'))
      .send({text: 'eheh', expirationDate: moment().toDate()})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.ok(actualBody.error.indexOf('DocumentNotFoundError') !== -1, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question - Should create another new question', (t) => {
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
        t.ok(
          moment(actualBody.expirationDate).isSame(input.expirationDate),
          'Retrieve same question expiration date'
        );
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.equal(actualBody.owner, app.get('user').id, 'Question owner must match user');

        t.end();
      });
  });

  test('GET /api/question/me/:owner', (t) => {
    request(app)
      .get(`/api/question/me/${app.get('user').id}`)
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

  test('POST /api/question - Should create new question with different user', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('other-token'))
      .send(sharedInputOther)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.text, sharedInputOther.text, 'Retrieve same question text');
        t.ok(
          moment(actualBody.expirationDate).isSame(sharedInputOther.expirationDate),
          'Retrieve same question expiration date'
        );
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.equal(actualBody.owner, app.get('other-user').id, 'Question owner must match user');

        app.set('other-question', actualBody);

        t.end();
      });
  });

  test('POST /api/question/:id - Should not update question from another user', (t) => {
    request(app)
      .post(`/api/question/${app.get('other-question').id}`)
      .set('x-access-token', app.get('token'))
      .send({text: 'Is this the question?', expirationDate: moment(Date.now())})
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;
        const expectedBody = {error: 'Not enough permissions to change other user profile!'};

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - Should get question back if no changes are made', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send(sharedInput)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('question');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve same question');
        t.end();
      });
  });

  test('POST /api/question/:id - Should update question with new text', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send({text: updatedInput.text})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('question'),
          text: updatedInput.text,
        };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve updated question');

        app.set('question', {...app.get('question'), text: updatedInput.text});

        t.end();
      });
  });
  test('POST /api/question/:id - Should update question with new expirationDate', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send({expirationDate: updatedInput.expirationDate})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('question'),
          ...updatedInput,
        };
        const actualBody = res.body;

        // get dates
        const actualDate = actualBody.expirationDate;
        const expectedDate = expectedBody.expirationDate;

        // delete from objects
        delete actualBody.expirationDate;
        delete expectedBody.expirationDate;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve updated question');
        t.ok(moment(actualDate).isSame(expectedDate), 'Retrieve same dates');

        app.set('question', {...app.get('question'), expirationDate: updatedInput.expirationDate});

        t.end();
      });
  });
};
