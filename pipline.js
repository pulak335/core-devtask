const autocannon = require('autocannon');

const benchmark = autocannon({
  url: `https://localhost:${process.env.port}/`,
  connections: 100,
  pipelining: 10,
  duration: 10
}, (err, result) => {
  console.log(autocannon.pretty(result));
});