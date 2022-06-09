
const mockGetAll = jest.fn();
const superTest = require('supertest');

const createApp = require('../src/app');
const { generateManyBook } = require('../src/fakes/book.fake');

// El spy es si no usamos el fake mas
// Son pruebas de comportamientos
// Prueba de caja blanca


// Crear una suplantacion
jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for books endpoint', () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return "Hello World!"', () => {
      // Arrange
      const fakeBooks = generateManyBook(3);
      mockGetAll.mockResolvedValue(fakeBooks);

      return superTest(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(3);
        });
    });
  });

  afterAll(async () => {
    await server.close();
  });
});
