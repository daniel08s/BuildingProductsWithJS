// npm packages
import request from 'supertest';
import moment from 'moment';
// import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';

export default (test) => {
  test('POST /api/question - Should create a new question ', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send({text: 'What is the question?', expirationDate: moment().add(1, 'days').toDate()})
      .expect(200)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });

  test('POST /api/question - Should create another new question ', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send({text: 'What should this be?', expirationDate: moment().add(2, 'days')})
      .expect(200)
      .end((err) => {
        t.error(err, 'No error');
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
          t.equal(actualBody.owner, app.get('user').id, 'Question owner matches user');
          t.ok(moment(actualBody))
        });

        t.end();
      });
  });
};
