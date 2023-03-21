const url = require('url');
const http = require('http');
const path = require('path');
const LimitSizeStream = require('./LimitSizeStream');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      if (fs.existsSync(filepath)) {
        res.statusCode = 409;
        res.end('Such file already exists');
        break;
      }

      const limitedStream = new LimitSizeStream({limit: 1048576});
      const outStream = fs.createWriteStream(filepath);
      limitedStream.pipe(outStream);

      req.pipe(limitedStream);

      outStream.on('finish', () => {
        res.statusCode = 201;
        res.end('Ok');
      });

      req.on('error', () => {
        limitedStream.destroy();
        outStream.destroy();
        fs.unlinkSync(filepath);
      });

      outStream.on('error', (error) => {
        if (error.code === 'ENOENT') {
          res.statusCode = 400;
          res.end('Вложенные пути не поддерживаются');
        }
      });

      limitedStream.on('error', (error) => {
        if (error.code === 'LIMIT_EXCEEDED') {
          outStream.destroy();
          fs.unlinkSync(filepath);
          res.statusCode = 413;
          res.end('Тяжело');
        } else {
          res.statusCode = 500;
          res.end();
        }
      });

      break;
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
