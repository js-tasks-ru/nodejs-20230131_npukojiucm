const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);


  switch (req.method) {
    case 'GET':

      const stream = fs.createReadStream(filepath);
      stream.pipe(res);

      stream.on('error', (error) => {
        const reg = /\w+\//gi;

        if (error.code === 'ENOENT') {
          if (reg.test(pathname)) {
            res.statusCode = 400;
            res.end('Вложенные пути не поддерживаются');
          } else {
            res.statusCode = 404;
            res.end(`Файл не найден ${filepath}`);
          }
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
