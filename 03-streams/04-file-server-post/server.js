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

      req.on('data', (chunk) => {
        limitedStream.write(chunk);
      });

      limitedStream.on('end', () => {
        res.statusCode = 201;
      });

      req.on('aborted', () => {
        limitedStream.destroy();
        fs.unlinkSync(filepath);
      });

      outStream.on('error', (error) => {
        const reg = /\w+.?\w+\//gi;
        if (error.code === 'ENOENT') {
          if (reg.test(pathname)) {
            res.statusCode = 400;
            res.end('Вложенные пути не поддерживаются');
          }
        }
      });

      limitedStream.on('error', (error) => {
        if (error.code === 'LIMIT_EXCEEDED') {
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
