const { faker } = require('@faker-js/faker');

const generateOneBook = () => ({
  _id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
});

const generateManyBook = (length = 10) => Array.from({ length }, () => generateOneBook());

module.exports = { generateOneBook, generateManyBook };

