describe('Set', () => {

  beforeAll(() => {
    console.log('beforeALl');
  }); // up db

  afterAll(() => {
    console.log('afterAll');
  });

  beforeEach(() => {
    console.log('beforeEach');
  });

  afterEach(() => {
    console.log('afterEach 2');
  });

  test('Case 1', () => {
    console.log('case 1');
    expect(1 + 1).toBe(2);
  });

  test('Case 2', () => {
    console.log('case 2');
    expect(1 + 3).toBe(4);
  });

  describe('other group', () => {

    beforeAll(() => {
      console.log('beforeALl other group');
    }); // up db

    test('Case 3', () => {
      console.log('case 3');
      expect(1 + 1).toBe(2);
    });

    test('Case 4', () => {
      console.log('case 4');
      expect(1 + 3).toBe(4);
    });
  });
});
