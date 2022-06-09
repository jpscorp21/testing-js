const BooksService = require('./books.service');
const { generateManyBook } = require('../fakes/book.fake');

// El spy es si no usamos el fake mas
// Son pruebas de comportamientos
// Prueba de caja blanca
const mockGetAll = jest.fn();

// Crear una suplantacion
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe('Test for getBooks', () => {
    test('Should return a list book', async () => {
      // Arrange
      const fakeBooks = generateManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
    });
    test('Should return a name', async () => {
      // Arrange
      const fakeBooks = generateManyBook(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      // Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      // expect(mockGetAll).toHaveBeenCalledWith('books');
    });
  });
});
