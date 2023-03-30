const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const http2 = require('http2');
const https = require('https');
const spdy = require('spdy');

const app = express();
app.use(morgan('combined'));

const oauthProxy = createProxyMiddleware('/oauth', { target: 'http://localhost:3001' });
app.use(oauthProxy);

const graphProxy = createProxyMiddleware('/graph', { target: 'http://localhost:3002' });
app.use(graphProxy);

const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:3003' });
app.use(apiProxy);

const eventEmitterProxy = createProxyMiddleware('/events', { target: 'http://localhost:3004' });
app.use(eventEmitterProxy);

const spaProxy = createProxyMiddleware('/', { target: 'http://localhost:3005' });
app.use(spaProxy);




const http2Server = http2.createSecureServer({
  key: fs.readFileSync('ssl/localhost.key'),
  cert: fs.readFileSync('ssl/localhost.crt')
}, app);

http2Server.listen(443, () => {
  console.log('HTTP/2 server listening on port 443');
});




const http3Server = spdy.createServer({
  key: fs.readFileSync('ssl/localhost.key'),
  cert: fs.readFileSync('ssl/localhost.crt')
}, app);

http3Server.listen(443, () => {
  console.log('HTTP/3 server listening on port 443');
});