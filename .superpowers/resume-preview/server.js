const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 58041;

http.createServer((req, res) => {
  const file = path.join(root, 'index.html');

  fs.readFile(file, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(String(err));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(data);
  });
}).listen(port, '127.0.0.1');
