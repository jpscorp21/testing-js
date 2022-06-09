const superTest = require('supertest');

const createApp = require('../src/app');

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  describe('test for [GET] /', () => {
    test('should return "Hello World!"', () => superTest(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('Hello World!');
      }));
  });

  afterAll(async () => {
    await server.close();
  });
});
