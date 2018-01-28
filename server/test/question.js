// npm packages
import request from 'supertest';
import moment from 'moment';
import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';

export default (test) => {
  test('POST /api/question - Should create a new question ', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send({text: 'What is the question?', expirationDate: moment().add(1, 'days')})
      .expect(200)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });
};
