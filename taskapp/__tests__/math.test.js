const {
  calcTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require('../src/math');

test('Should calculate total with tip', () => {
  const total = calcTip(10, 30);
  expect(total).toBe(13);
  /*   if (total !== 13) {
    throw new Error('Total should be 13. Total was: ' + total);
  } */
});

test('Should calculate total with default tip', () => {
  const total = calcTip(10);
  expect(total).toBe(12);
});

test('Should convert from F to C', () => {
  const cels = fahrenheitToCelsius(32);
  expect(cels).toBe(0);
});

test('Should convert from C to F', () => {
  const fahr = celsiusToFahrenheit(0);
  expect(fahr).toBe(32);
});

/* test('Async test demo', done => {
  setTimeout(() => {
    expect(1).toBe(2);
    done();
  });
});
 */

test('Async promise demo', done => {
  add(4, 6).then(sum => {
    expect(sum).toBe(10);
    done();
  });
});

test('Async/await demo', async () => {
  const sum = await add(4, 6);
  expect(sum).toBe(10);
});
