const { sum } = require('./math');

const result = sum(3, 4);
console.log(`The sum of 3 and 4 is: ${result}`);

const sum = (a, b) => a + b;

module.exports = { sum };