const superTest = require('supertest');

const { MongoClient } = require('mongodb');
const createApp = require('../src/app');
const { config } = require('../src/config');

// El spy es si no usamos el fake mas
// Son pruebas de comportamientos
// Prueba de caja blanca
// Crear una suplantacion

describe('Test for books endpoint', () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(config.dbName);
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return "Hello World!"', async () => {
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book1',
          year: 1998,
          author: 'jean',
        },
      ]);
      superTest(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });

  afterAll(async () => {
    await server.close();
  });
});
